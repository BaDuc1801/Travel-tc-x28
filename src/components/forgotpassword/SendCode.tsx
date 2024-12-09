import { useState, useEffect } from "react";
import { Button, message } from "antd";
import { useNavigate } from "react-router-dom";

const VerificationCode = () => {
  const [countdown, setCountdown] = useState(41); 
  const [code, setCode] = useState<string[]>(new Array(6).fill("")); 
  const navigate = useNavigate();

 
  useEffect(() => {
    if (countdown === 0) return; 
    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval); 
  }, [countdown]);

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newCode = [...code];
    newCode[index] = e.target.value;

    if (e.target.value.length === 1 && index < 5) {
      
      const nextInput = document.getElementById(`verification-code-input-${index + 1}`);
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
    message.success("Mã xác minh đã được gửi lại!");
  };

  return (
    <div className="w-[480px] h-auto flex flex-col p-6 rounded-2xl shadow-sm bg-white justify-center items-center">
      <div className="mb-3">
        <h2 className="text-2xl font-semibold mt-3 mb-2 gap-6">Xác thực</h2>
        <span className="text-base font-normal text-left text-gray-600">
          Mã xác minh đã được gửi đến email: <b>caimailxautinh@gmail.com</b>, vui lòng nhập mã để xác minh tài khoản của bạn.
        </span>
      </div>

      <div className="otp-form w-full">
        <div className="flex justify-between mb-3 text-sm w-full items-center">
          <span className="font-medium text-gray-700">Mã xác minh</span>
          <span>Gửi lại mã trong <b>{`00:${countdown.toString().padStart(2, "0")}`}</b></span>
        </div>

        <form
          noValidate
          className="verification-form flex justify-center mb-3"
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
              className="p-inputtext p-component p-element verification-input"
            />
          ))}
        </form>

        <div className="flex justify-center font-normal gap-1 text-sm items-center mt-6">
          Quay lại{" "}
          <a
            href="/login"
            className="no-underline font-semibold text-branding-primary-700 text-base cursor-pointer"
          >
            Đăng nhập
          </a>
        </div>

        <Button
          type="primary"
          onClick={handleSubmit}
          className="w-full mt-4"
          disabled={countdown > 0}
        >
          Xác nhận
        </Button>

        <Button
          type="link"
          onClick={resendCode}
          className="w-full mt-2"
          disabled={countdown > 0}
        >
          Gửi lại mã
        </Button>
      </div>
    </div>
  );
};

export default VerificationCode;
