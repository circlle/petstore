export interface UserData {
  username: string;
  email: string;
  phone: string;
  avatar: string;
}

export interface JWTInfo {
  id: number;
  username: string;
  email: string;
  exp: number;
}
