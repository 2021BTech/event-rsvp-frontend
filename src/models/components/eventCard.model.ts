export type EventCardProps = {
  title: string;
  description: string;
  date: string;
  image: string;
  maxAttendees: number;
  attendeeCount: number;
  eventId: string;
  location?: {
    address: string;
    lat: number;
    lng: number;
  };
  onEdit?: () => void;
  onDelete?: () => void;
  onView?(): void;
}
export interface EventAttendee extends Record<string, unknown> {
  _id: string;
  name: string;
  email: string;
  status: "Going" | "Maybe" | "Not Going";
  timestamp: string;
}