import { useEffect, useState } from "react";
import EventService from "../../services/event.service";
import type { EventProps } from "../../models/events/event.model";
import type { User } from "../../models/users/user.model";
import EventCard from "../../components/EventCard";
import { FiUsers, FiCalendar } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const DashboardHome = () => {
  const [events, setEvents] = useState<EventProps[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [totalEventCount, setTotalEventCount] = useState(0);
  const [totalUserCount, setTotalUserCount] = useState(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const eventRes = await EventService.getAdminEvents(1, 4); // just show 4 recent
        const userRes = await EventService.getAdminUsers(1, 5); // top 5 users
        if (eventRes && userRes) {
          setEvents(eventRes.data);
          setTotalEventCount(eventRes.total);
          setUsers(userRes.data);
          setTotalUserCount(userRes.total);
        }
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Dashboard Overview
      </h1>

      {loading ? (
        <div className="text-center text-gray-500 py-10">
          Loading dashboard data...
        </div>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow p-6 flex items-center justify-between">
              <div>
                <p className="text-gray-500">Total Users</p>
                <h2 className="text-3xl font-bold text-indigo-600">
                  {totalUserCount}
                </h2>
              </div>
              <FiUsers className="text-indigo-500 text-4xl" />
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex items-center justify-between">
              <div>
                <p className="text-gray-500">Total Events</p>
                <h2 className="text-3xl font-bold text-green-600">
                  {totalEventCount}
                </h2>
              </div>
              <FiCalendar className="text-green-500 text-4xl" />
            </div>
          </div>

          {/* Recent Events */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Recent Events
            </h3>
            {events.length === 0 ? (
              <p className="text-gray-500">No events found.</p>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                  <EventCard
                    key={event._id}
                    title={event.title}
                    description={event.description}
                    date={event.date}
                    maxAttendees={event.maxAttendees}
                    attendeeCount={event.attendees?.length || 0}
                    image={event.image}
                    onEdit={() => navigate(`/create/${event._id}`)}
                    onDelete={() => EventService.deleteAdminEvent(event._id)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Recent Users */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Recent Users
            </h3>
            {users.length === 0 ? (
              <p className="text-gray-500">No users found.</p>
            ) : (
              <div className="bg-white rounded-xl shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {user.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              user.role === "admin"
                                ? "bg-green-100 text-green-700"
                                : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardHome;
