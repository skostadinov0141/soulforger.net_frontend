export default class User {
  _id: string;
  email: string;
  passwordHash: string;
  username: string;
  roles: string[];
  createdAt: Date;
  updatedAt: Date;
  profile: string;
}
