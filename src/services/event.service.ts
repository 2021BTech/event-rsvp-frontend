import type { EventProps } from "../models/events/event.model";
import type { User } from "../models/users/user.model";
import ApiCall from "../utils/ApiCall";

export default class EventService {
  // Get all users (admin view)
  static async getAdminUsers(): Promise<User[] | null> {
    return await ApiCall<User[]>({
      Url: "/admin/users",
      Method: "GET",
    });
  }

  // Get all events (admin view)
  static async getAdminEvents(): Promise<EventProps[] | null> {
    return await ApiCall<EventProps[]>({
      Url: "/admin/events",
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
