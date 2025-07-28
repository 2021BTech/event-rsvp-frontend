import type { CreateEventDTO, EventProps } from "../models/events/event.model";
import type { User } from "../models/users/user.model";
import ApiCall from "../utils/ApiCall";

export default class EventService {
  // Create a new event
  static createEvent(data: CreateEventDTO | FormData) {
  return ApiCall<EventProps>({
    Url: "/events",
    Method: "POST",
    Data: data,
  });
}


  // Update an existing event
 static updateEvent(id: string, data: CreateEventDTO | FormData) {
  return ApiCall<EventProps>({
    Url: `/events/${id}`,
    Method: "PUT",
    Data: data,
  });
}


  // Get an event by ID
  static async getEventById(id: string): Promise<EventProps | null> {
    return await ApiCall<EventProps>({
      Url: `/events/${id}`,
      Method: "GET",
    });
  }
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
      data: EventProps[];
    }>({
      Url: `/admin/events?page=${page}&limit=${limit}`,
      Method: "GET",
    });
  }

  // Delete a user by ID
  static async deleteAdminUser(
    id: string
  ): Promise<{ message: string } | null> {
    return await ApiCall<{ message: string }>({
      Url: `/admin/users/${id}`,
      Method: "DELETE",
    });
  }

  // Delete an event by ID
  static async deleteAdminEvent(
    id: string
  ): Promise<{ message: string } | null> {
    return await ApiCall<{ message: string }>({
      Url: `/admin/events/${id}`,
      Method: "DELETE",
    });
  }
}
