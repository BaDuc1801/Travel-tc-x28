import { Button, Input, message } from "antd";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

const Register = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: IDataRegister) => {
    try {
      await axios.post("http://localhost:8080/api/auth/register", data);
      message.success("Registration successful");
      navigate("/auth/login");
    } catch (err) {
      console.error(err);
      if (axios.isAxiosError(err)) {
        message.error(err.response?.data?.message || "An error occurred");
      } else {
        message.error("An unexpected error occurred");
      }
    } finally {
      reset();
    }
  };
  return (
    <div className="p-5 py-10 bg-opacity-80 bg-white flex flex-col gap-5 items-center rounded-xl shadow-2xl">
      <h1 className="font-semibold text-4xl">Register</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-7">
        <div>
          <label className="font-semibold" htmlFor="name">
            Name<span className="text-red-500">*</span>:
          </label>
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <Input
                {...field}
                size="large"
                placeholder="Enter your name"
                className="w-full"
              />
            )}
          />
          {errors.name && (
            <p className="text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="font-semibold" htmlFor="email">
            Email<span className="text-red-500">*</span>:
          </label>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <Input
                type="email"
                {...field}
                size="large"
                placeholder="Enter your email"
                className="w-full"
              />
            )}
          />
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label className="font-semibold" htmlFor="password">
            Password<span className="text-red-500">*</span>:
          </label>
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <Input.Password
                {...field}
                size="large"
                placeholder="Enter your password"
                className="w-full"
              />
            )}
          />
          {errors.password && (
            <p className="text-xs text-red-500">{errors.password.message}</p>
          )}
        </div>
        <div>
          <label className="font-semibold" htmlFor="confirmPassword">
            Confirm Password<span className="text-red-500">*</span>:
          </label>
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field }) => (
              <Input.Password
                {...field}
                size="large"
                placeholder="Enter your confirm password"
                className="w-full"
              />
            )}
          />
          {errors.confirmPassword && (
            <p className="text-xs text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2 justify-around">
          <Button
            onClick={() => navigate("/auth/login")}
            className="px-8"
            size="large"
          >
            Back
          </Button>
          <Button
            htmlType="submit"
            className="px-6"
            type="primary"
            size="large"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Register;
