import { useEffect, useState } from "react";
import EventService from "../../services/event.service";
import PaginationControls from "../../components/PaginationControls";
import EventCard from "../../components/EventCard";
import type { EventProps } from "../../models/events/event.model";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { showToast } from "../../utils/Toast";
import ConfirmationModal from "../../components/ConfirmationModal";

const EventPage = () => {
  const [events, setEvents] = useState<EventProps[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const pageSize = 10;
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

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

  const confirmDelete = (eventId: string) => {
    setSelectedEventId(eventId);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!selectedEventId) return;
    setDeleting(true);
    try {
      const response = await EventService.deleteAdminEvent(selectedEventId);
      setEvents(events.filter((e) => e._id !== selectedEventId));
      setShowDeleteModal(false);
      showToast("success", response!.message);
      setTimeout(() => {
        fetchEvents(page); 
      }, 1000);
    } catch (error) {
      console.error("Delete failed", error);
    } finally {
      setDeleting(false);
      setSelectedEventId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Event Management</h1>
      </div>

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

      {/* Create Event Button */}
      <div className="mb-6 flex justify-end">
        <Button
          variant="primary"
          onClick={() => navigate("/create")}
          className="w-full sm:w-auto"
          icon={<FiPlus />}
          iconPosition="right"
        >
          Create New Event
        </Button>
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
              location={event.location}
              image={typeof event.image === "string" ? event.image : ""}
              onEdit={() => navigate(`/create/${event._id}`)}
              onDelete={() => confirmDelete(event._id)}
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

      {/* modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        title="Delete Event"
        message="Are you sure you want to delete this event? This action cannot be undone."
        onCancel={() => {
          setShowDeleteModal(false);
          setSelectedEventId(null);
        }}
        onConfirm={handleDelete}
        loading={deleting}
      />
    </div>
  );
};

export default EventPage;
