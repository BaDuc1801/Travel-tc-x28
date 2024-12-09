import { useState } from 'react';
import { Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>, setState: React.Dispatch<React.SetStateAction<string>>) => {
    setState(e.target.value);
  };

  const handleSubmit = () => {
    if (newPassword !== confirmPassword) {
      message.error('Mật khẩu và xác nhận mật khẩu không khớp!');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      message.success('Mật khẩu đã được thay đổi thành công!');
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center gap-5 rounded-xl bg-white bg-opacity-60 p-5 shadow-2xl w-[480px] h-auto">
      <h2 className="text-4xl font-semibold">Tạo mật khẩu mới</h2>
      <span className="text-base font-normal text-left text-gray-600">
        Nhập mật khẩu mới của bạn. Mật khẩu của bạn cần 1 kí tự đặc biệt.
      </span>
      
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="flex flex-col gap-5 w-full">
        <div>
          <label className="font-semibold" htmlFor="newPassword">
            Mật khẩu mới<span className="text-red-500">*</span>:
          </label>
          <Input.Password
            id="newPassword"
            placeholder="Nhập mật khẩu của bạn"
            value={newPassword}
            onChange={(e) => handlePasswordChange(e, setNewPassword)}
            size="large"
            className="w-full hover:border-red-300 focus:border-red-300"
          />
        </div>

        <div>
          <label className="font-semibold" htmlFor="confirmPassword">
            Xác nhận mật khẩu mới<span className="text-red-500">*</span>:
          </label>
          <Input.Password
            id="confirmPassword"
            placeholder="Nhập lại mật khẩu của bạn"
            value={confirmPassword}
            onChange={(e) => handlePasswordChange(e, setConfirmPassword)}
            size="large"
            className="w-full hover:border-red-300 focus:border-red-300"
          />
        </div>

        <div className="flex flex-col items-center gap-2 mt-4">
          <Button
            type="primary"
            htmlType="submit"
            className="w-full bg-red-500 hover:!bg-red-600"
            size="large"
            loading={loading}
          >
            Xác nhận
          </Button>
          <p className="text-sm mt-2">
            Quay lại{" "}
            <span
              onClick={() => navigate("/login")}
              className="cursor-pointer font-semibold text-red-500"
            >
              Đăng nhập
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
