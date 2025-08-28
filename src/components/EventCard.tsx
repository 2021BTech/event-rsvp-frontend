import { FiCalendar, FiUsers, FiEdit, FiTrash, FiMapPin, FiEye, FiBarChart2 } from "react-icons/fi";
import type { EventCardProps } from "../models/components/eventCard.model";
import placeholder from "../assets/image/place.jpg"
import { useNavigate } from "react-router-dom";

const EventCard = ({
  title,
  description,
  date,
  image,
  maxAttendees,
  attendeeCount,
  location,
  eventId,
  onView,
  onEdit,
  onDelete,
}: EventCardProps) => {
  const formattedDate = new Date(date).toLocaleString();

  const navigate = useNavigate();
  

   const handleViewSummary = () => {
    navigate(`/events/summary/${eventId}`);
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-all">
      {/* Display image */}
      <img
        src={image || placeholder}
        alt={title}
        className="w-full h-48 object-cover"
      />

      <div className="p-5">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold text-indigo-700">{title}</h3>
          <div className="flex gap-2 text-gray-500">
             <button 
              onClick={handleViewSummary} 
              title="View Summary"
              className="p-1 hover:bg-gray-100 rounded"
            >
              <FiBarChart2 className="w-4 h-4 hover:text-purple-400 transition-colors" />
          </button>
              {onView && (
              <button onClick={onView} title="View">
                <FiEye className="hover:text-blue-400 transition-colors" />
              </button>
            )}
            {onEdit && (
              <button onClick={onEdit} title="Edit">
                <FiEdit className="hover:text-indigo-600 transition-colors" />
              </button>
            )}
            {onDelete && (
              <button onClick={onDelete} title="Delete">
                <FiTrash className="hover:text-red-600 transition-colors" />
              </button>
            )}
          </div>
        </div>

        <p className="text-gray-600 mt-2">{description}</p>

        <div className="flex items-center gap-2 text-sm text-gray-500 mt-4">
          <FiCalendar />
          <span>{formattedDate}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
          <FiMapPin />
          <span>{location?.address || "No location provided"}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
          <FiUsers />
          <span>
            {attendeeCount} / {maxAttendees} Attendees
          </span>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
