interface BaseModel {
  _id: string;
  __v: number;
}

export interface User extends BaseModel {
    _id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  [key: string]: string | number | undefined;
}
