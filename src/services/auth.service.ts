import type { Role } from "../models/users/role.enum";
import type { User } from "../models/users/user.model";
import ApiCall from "../utils/ApiCall";

export default class AuthService {
  // User registration
  static async registerUser(data: { name: string; email: string; password: string; role: Role }) {
    return await ApiCall<{ message: string }>({
      Url: "/register",
      Method: "POST",
      Data: data,
    });
  }

  // User login
  static async loginUser(data: { email: string; password: string }) {
    return await ApiCall<{ token: string; user: User }>({
      Url: "/login",
      Method: "POST",
      Data: data,
    });
  }
}