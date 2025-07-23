import { useEffect, useState } from "react";
import EventService from "../../services/event.service";
import PaginationControls from "../../components/PaginationControls";
import EventCard from "../../components/EventCard";
import type { EventProps } from "../../models/events/event.model";


const EventPage = () => {
  const [events, setEvents] = useState<EventProps[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const pageSize = 10;

  const fetchEvents = async (currentPage: number) => {
    setLoading(true);
    try {
      const response = await EventService.getAdminEvents(currentPage, pageSize);
      if (response) {
        setEvents(response.data);
        setTotal(response.total);
        setTotalPages(response.totalPages);
      }
    } catch (err) {
      console.error("Failed to fetch events", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents(page);
  }, [page]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Event Management</h1>

      {/* Summary Card */}
      <div className="mb-6">
        <div className="bg-white shadow-md rounded-lg p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Total Events</h2>
            <p className="text-gray-500">All Created Event</p>
          </div>
          <span className="text-4xl font-bold text-indigo-600">{total}</span>
        </div>
      </div>

      {loading ? (
        <div className="text-center text-gray-500 py-10">Loading events...</div>
      ) : events.length === 0 ? (
        <div className="text-center text-gray-500 py-10">No events found.</div>
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
            />
          ))}
        </div>
      )}

      <div className="mt-8">
        <PaginationControls
          page={page}
          totalPages={totalPages}
          onPageChange={(newPage) => setPage(newPage)}
        />
      </div>
    </div>
  );
};

export default EventPage;
