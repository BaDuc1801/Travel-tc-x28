/// <reference types="vite/client" />

interface IDataLogin {
  email: string;
  password: string;
}

interface IDataRegister extends IDataLogin {
  name: string;
  confirmPassword: string;
}

declare module '*.css';
declare module 'swiper/css';
declare module 'swiper/css/free-mode';
declare module 'swiper/css/navigation';
declare module 'swiper/css/bundle';