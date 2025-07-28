import { FiCalendar, FiUsers, FiEdit, FiTrash } from "react-icons/fi";
import type { EventCardProps } from "../models/components/eventCard.model";
import placeholder from "../assets/image/place.jpg"

const EventCard = ({
  title,
  description,
  date,
  image,
  maxAttendees,
  attendeeCount,
  onEdit,
  onDelete,
}: EventCardProps) => {
  const formattedDate = new Date(date).toLocaleString();

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
