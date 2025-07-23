import { FiCalendar, FiUsers } from "react-icons/fi";
import type { EventCardProps } from "../models/components/eventCard.model";

const EventCard = ({
  title,
  description,
  date,
  maxAttendees,
  attendeeCount,
}: EventCardProps) => {
  const formattedDate = new Date(date).toLocaleString();

  return (
    <div className="bg-white shadow-md rounded-lg p-5 hover:shadow-lg transition-all">
      <h3 className="text-xl font-semibold text-indigo-700">{title}</h3>
      <p className="text-gray-600 mt-2">{description}</p>

      <div className="flex items-center gap-2 text-sm text-gray-500 mt-4">
        <FiCalendar />
        <span>{formattedDate}</span>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
        <FiUsers />
        <span>{attendeeCount} / {maxAttendees} Attendees</span>
      </div>
    </div>
  );
};

export default EventCard;
