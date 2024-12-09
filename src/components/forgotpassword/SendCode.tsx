import { useState, useEffect } from "react";
import { Button, message } from "antd";
import { useNavigate } from "react-router-dom";

const VerificationCode = () => {
  const [countdown, setCountdown] = useState(41);
  const [code, setCode] = useState<string[]>(new Array(6).fill(""));
  const [isResendEnabled, setIsResendEnabled] = useState(false); 
  const [showCountdown, setShowCountdown] = useState(true); 
  const navigate = useNavigate();

  useEffect(() => {
    if (countdown === 0) {
      setIsResendEnabled(true); 
      setShowCountdown(false); 
      return;
    }

    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown]);

  const handleCodeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const newCode = [...code];
    newCode[index] = e.target.value;

    if (e.target.value.length === 1 && index < 5) {
      const nextInput = document.getElementById(
        `verification-code-input-${index + 1}`,
      );
      nextInput?.focus();
    }

    setCode(newCode);
  };

  const handleSubmit = () => {
    message.success("Mã xác minh thành công!");
    navigate("/login");
  };

  const resendCode = () => {
    setCountdown(41); 
    setIsResendEnabled(false); 
    setShowCountdown(true); 
    message.success("Mã xác minh đã được gửi lại!");
  };

  return (
    <div className="flex h-auto w-[480px] flex-col items-center justify-center rounded-2xl bg-white p-4 shadow-lg bg-opacity-60 shadow-2xl">
      <div className="mb-4 w-full">
        <h2 className="text-center text-2xl font-semibold">Xác thực</h2>
        <p className="text-center text-base font-normal text-gray-600">
          Mã xác minh đã được gửi đến email của bạn, vui lòng nhập mã để xác minh tài khoản của bạn.
        </p>
      </div>

      <div className="otp-form mb-6 w-full">
        <div className="mb-3 flex w-full items-center justify-between text-sm relative">
          <span className="font-medium text-gray-700">Mã xác minh</span>
         
          {showCountdown && (
            <span>
              Gửi lại mã trong{" "}
              <b>{`00:${countdown.toString().padStart(2, "0")}`}</b>
            </span>
          )}

          {isResendEnabled && (
            <Button
              type="link"
              onClick={resendCode}
              className="absolute top-0 right-0 text-red-500 text-sm font-semibold"
            >
              Gửi lại mã
            </Button>
          )}
        </div>

        <form
          noValidate
          className="verification-form mb-3 flex w-full justify-between"
        >
          {code.map((digit, index) => (
            <input
              key={index}
              id={`verification-code-input-${index + 1}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleCodeChange(e, index)}
              placeholder="-"
              className="h-12 w-12 rounded-md border border-gray-300 text-center text-xl focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          ))}
        </form>

        <Button
          type="primary"
          onClick={handleSubmit}
          className="w-full bg-red-500 text-sm font-semibold hover:!bg-red-600"
          size="large"
          disabled={countdown > 0}
        >
          Xác nhận
        </Button>

        <div className="mt-4 flex items-center justify-center gap-1 text-sm font-normal">
          Quay lại{" "}
          <a
            href="/login"
            className="cursor-pointer font-semibold text-red-500 no-underline"
          >
            Đăng nhập
          </a>
        </div>
      </div>
    </div>
  );
};

export default VerificationCode;
