export type User = {
  _id: string;
  username: string;
  email: string;
  password: string;
  role: string;
};

export type UserResponse = {
  total: number;
  page: number;
  limit: number;
  data: User[];
};

function isAdmin(user: User): boolean {
  return user.email === 'caosontr@gmail.com' && user.password === '123456' && user.role === 'admin';
}
