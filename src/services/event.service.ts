import type { User } from "../models/users/user.model";
import ApiCall from "../utils/ApiCall";

export default class EventService {
  // Get all users (admin view)
 static async getAdminUsers(page = 1, limit = 10) {
  return await ApiCall<{
    total: number;
    page: number;
    totalPages: number;
    data: User[];
  }>({
    Url: `/admin/users?page=${page}&limit=${limit}`,
    Method: "GET",
  });
}

  // Get all events (admin view)
  static async getAdminEvents(page = 1, limit = 10) {
    return await ApiCall<{
    total: number;
    page: number;
    totalPages: number;
    data: User[];
  }>({
    Url: `/admin/events?page=${page}&limit=${limit}`,
    Method: "GET",
  });
  }

  // Delete a user by ID
  static async deleteAdminUser(id: string): Promise<{ message: string } | null> {
    return await ApiCall<{ message: string }>({
      Url: `/admin/users/${id}`,
      Method: "DELETE",
    });
  }
}
