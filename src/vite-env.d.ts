/// <reference types="vite/client" />

interface IDataLogin {
  email: string;
  password: string;
}

interface IDataRegister extends IDataLogin {
  name: string;
  confirmPassword: string;
}
