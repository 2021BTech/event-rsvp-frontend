import { useEffect, useState } from "react";
import type { EventAttendeesModalProps } from "../../models/events/event.model";
import type { EventAttendee } from "../../models/components/eventCard.model";
import EventService from "../../services/event.service";
import { showToast } from "../../utils/Toast";
import { ReusableTable } from "../../components/ReusableTable";

const EventAttendeesModal = ({
  eventId,
  eventTitle,
  isOpen,
  onClose,
}: EventAttendeesModalProps) => {
  const [attendees, setAttendees] = useState<EventAttendee[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchAttendees = async () => {
    if (!eventId) return;

    setLoading(true);
    try {
      const response = await EventService.getEventAttendees(eventId);
      if (response) {
        setAttendees(response.attendees);
        setTotal(response.total);
      }
    } catch (error) {
      console.error("Failed to fetch attendees", error);
      showToast("error", "Failed to load attendees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && eventId) {
      fetchAttendees();
    }
  }, [isOpen, eventId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">
            Attendees for {eventTitle}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            &times;
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-auto flex-grow">
          {/* Summary Card */}
          <div className="mb-6">
            <div className="bg-indigo-50 shadow-md rounded-lg p-6 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-indigo-800">
                  Total Attendees
                </h2>
                <p className="text-indigo-600">Registered for this event</p>
              </div>
              <span className="text-3xl font-bold text-indigo-600">
                {total}
              </span>
            </div>
          </div>

          {/* Attendees Table */}
          {loading ? (
            <div className="text-center py-10 text-gray-500">
              Loading attendees...
            </div>
          ) : attendees.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              No attendees found for this event.
            </div>
          ) : (
            <ReusableTable<EventAttendee>
              data={attendees}
              columns={[
                {
                  label: "#",
                  key: "_id",
                  className: "pl-4 pr-3 sm:pl-6",
                  render: (_val, _row, index) => index + 1,
                },
                { label: "Name", key: "name" },
                { label: "Email", key: "email" },
                {
                  label: "Status",
                  key: "status",
                  render: (status) => {
                    const s = status as string;
                    return (
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          s === "Going"
                            ? "bg-green-100 text-green-700"
                            : s === "Maybe"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {s}
                      </span>
                    );
                  },
                },
                {
                  label: "Registration Date",
                  key: "timestamp",
                  render: (ts) => new Date(ts as string).toLocaleDateString(),
                },
              ]}
            />
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end p-6 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventAttendeesModal;