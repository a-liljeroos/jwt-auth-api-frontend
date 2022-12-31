export type TRegisterUser = {
  username: string;
  password: string;
  repeatPw?: string;
  email: string;
};

export type TLoginUser = {
  username: string;
  password: string;
};
