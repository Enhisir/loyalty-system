export type UserInfo = {
  name: string;
  role: Role.User;
};

export enum Role {
  User,
  Admin,
}

export type UserPointsInfo = {
  id: string;
  name: string;
  points: number;
};

export type SendUserPoints = {
  points: number;
};