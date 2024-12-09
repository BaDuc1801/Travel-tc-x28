import { useState } from "react";
import { Button, Input, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface ForgotPasswordForm {
  email: string;
}

const schema = yup.object({
  email: yup
    .string()
    .email("Địa chỉ email không hợp lệ")
    .required("Vui lòng nhập địa chỉ email của bạn"),
}).required();

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    
  } = useForm<ForgotPasswordForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  const handleForgotPassword = async (data: ForgotPasswordForm) => {
    const { email } = data;

    if (!email) {
      message.error("Please enter your email");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/user/auth/forgot-password",
        { email }
      );
      message.success("Password reset email sent!");
      console.log(response.data);
    } catch (err) {
      message.error("Error sending reset link. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-auto w-[480px] flex-col items-center justify-center rounded-2xl bg-white bg-opacity-60 p-5 shadow-2xl shadow-sm">
      <div className="mb-4 w-full">
        <h1 className="text-center text-2xl font-semibold">Quên mật khẩu</h1>
        <div className="w-full text-justify">
          <span className="text-black-600 text-base font-normal">
            Vui lòng nhập địa chỉ email bạn đã sử dụng để đăng ký và chúng tôi sẽ gửi bạn mã xác minh để đặt lại mật khẩu.
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit(handleForgotPassword)} className="w-full">
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
                className={`w-full hover:border-red-300 focus:border-red-300 ${errors.email ? "border-red-500" : ""}`}
              />
            )}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="mt-5 flex w-full justify-between gap-4">
          <Button
            onClick={() => navigate("/login")}
            className="w-1/2 px-8 text-sm hover:!border-red-300 hover:!text-red-500"
            size="large"
          >
            Quay lại
          </Button>
          <Button
            onClick={() => navigate("auth/sendcode")}
            className="w-1/2 !bg-red-500 !px-6 text-sm hover:!bg-red-600"
            type="primary"
            size="large"
            htmlType="submit"
            loading={loading}
          >
            Gửi mã
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
