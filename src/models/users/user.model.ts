interface BaseModel {
  _id: string;
  __v: number;
}

export interface User extends BaseModel {
  name: string;
  email: string;
  role: "admin" | "user";
}
