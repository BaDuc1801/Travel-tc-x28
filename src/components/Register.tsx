import React from "react";
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
  password: yup
    .string()
    .required("Password is required")
    .test(
      "password-special-char",
      "Password must contain at least 1 special character",
      (value) => !!value && /[@#$%&*!]/.test(value),
    ),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

interface IDataRegister {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<IDataRegister>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const passwordValue = watch("password");

  const showErrorMessages = () => {
    Object.values(errors).forEach((error) => {
      if (error?.message) {
        message.error(error.message);
      }
    });
  };

  const onSubmit = async (data: IDataRegister) => {
    try {
      await axios.post(
        "https://be-travel-tc-x28-1end.vercel.app/user/auth/register",
        data,
      );
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
    <div className="flex flex-col items-center rounded-xl bg-white bg-opacity-60 p-5 py-10 shadow-2xl">
      <h1 className="mb-2 text-4xl font-semibold">Register</h1>
      <form
        onSubmit={handleSubmit(onSubmit, showErrorMessages)}
        className="flex flex-col gap-7"
      >
        <div>
          <label className="mb-2 font-semibold" htmlFor="name">
            Name<span className="mb-2 text-red-500">*</span>:
          </label>
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <Input
                {...field}
                size="large"
                placeholder="Enter your name"
                className="w-full hover:border-red-300 focus:border-red-300"
              />
            )}
          />
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
                className="w-full hover:border-red-300 focus:border-red-300"
              />
            )}
          />
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
                className="w-full hover:border-red-300"
              />
            )}
          />
          {passwordValue && !/[@#$%&*!]/.test(passwordValue) && (
            <p className="password-requirements">
              Password must contain at least 1 special character
            </p>
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
                className="w-full hover:border-red-300"
              />
            )}
          />
        </div>
        <div className="flex justify-around">
          <Button
            onClick={() => navigate("/auth/login")}
            className="px-8 hover:!border-red-300 hover:!text-red-500"
            size="large"
          >
            Back
          </Button>
          <Button
            htmlType="submit"
            className="!bg-red-500 !px-6 hover:!bg-red-600"
            type="primary"
            size="large"
          >
            Submit
          </Button>
        </div>
      </form>
      <style>
        {`
            .password-requirements {
            color: red;
            margin-top: 0.25rem;
            word-break: break-word;
            max-width: 500px;
            line-height: 1.25rem;
            font-size: 14px;
        `}
      </style>
    </div>
  );
};

export default Register;
