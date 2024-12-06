import { Button, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: IDataLogin) => {
    try {
      const response = await axios.post(
        "https://be-travel-tc-x28-1end.vercel.app/user/auth/login",
        data,
      );
      message.success("Login successful");
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
      window.localStorage.setItem('user', JSON.stringify(response.data));
      window.localStorage.setItem('authenticated', 'true');
      navigate("/");
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
    <div className="flex flex-col items-center gap-5 rounded-xl bg-white bg-opacity-60 p-5 shadow-2xl">
      <h1 className="text-4xl font-semibold">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
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
                className="w-full hover:border-red-300 focus:border-red-300"
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
                className="w-full hover:border-red-300 [&_.ant-input-affix-wrapper-focused]:!border-red-500 mb-2"
              />
            )}
          />
          <p>
            <span
             
              onClick={() => navigate("/auth/forgotpassword")}
              className="cursor-pointer font-semibold hover:text-red-500"
            >
              Forgot Password?
            </span>
          </p>
          
          {errors.password && (
            <p className="text-xs text-red-500">{errors.password.message}</p>
          )}
        </div>
        
        <div className="flex flex-col items-center gap-2">
          <Button
            htmlType="submit"
            className="w-full bg-red-500 hover:!bg-red-600"
            type="primary"
            size="large"
          >
            Submit
          </Button>
          <p>
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/auth/register")}
              className="cursor-pointer font-semibold hover:text-red-500"
            >
              Register
            </span>
          </p>
          
        </div>
      </form>
    </div>
  );
};

export default Login;
