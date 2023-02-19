export interface IToken {
  accessToken: string;
  refreshToken: string;
}

export interface IUser {
  email: string;
  password: string;
  bio?: string;
}
