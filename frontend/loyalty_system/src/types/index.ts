export type UserInfo = {
  name: string;
  role: Role.User;
};

export enum Role {
  User,
  Admin,
}