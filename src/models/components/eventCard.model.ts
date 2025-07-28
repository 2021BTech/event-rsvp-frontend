export type EventCardProps = {
  title: string;
  description: string;
  date: string;
  image: string;
  maxAttendees: number;
  attendeeCount: number;
   onEdit?: () => void;
    onDelete?: () => void;
};