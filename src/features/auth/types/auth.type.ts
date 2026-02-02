export type ApiResponse<TData> = {
  status: number;
  success: boolean;
  message: string;
  data: TData;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  name: string;
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export type LoginResponseData = {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  address: string | null;
  image: string;
  token: string;
};

export type LoginResponse = ApiResponse<LoginResponseData>;

export type RegisterResponseData = {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string | null;
  address: string | null;
  image: string;
  token: string;
};

export type RegisterResponse = ApiResponse<RegisterResponseData>;
