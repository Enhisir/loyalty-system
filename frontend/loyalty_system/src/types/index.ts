export type UserInfo = {
  name: string;
  role: Role;
};

export enum Role {
  User,
  Manager,
}

export type AuthInfo = {
  user: UserInfo;
  accessToken: string;
  refreshToken: string;
  accessTokenExpires: number;
};

export type UserPointsInfo = {
  code: string;
  name: string;
  points: number;
};

export type SendUserPoints = {
  points: number;
};

export type SignInForm = {
  phone: string;
  password: string;
}

export type SignUpForm = {
  phone: string;
  name: string;
  password: string;
}