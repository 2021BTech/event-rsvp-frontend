
export type EventCardProps = {
  title: string;
  description: string;
  date: string;
  image: string;
  maxAttendees: number;
  attendeeCount: number;
  location?: {
    address: string;
    lat: number;
    lng: number;
  };
  onEdit?: () => void;
  onDelete?: () => void;
};