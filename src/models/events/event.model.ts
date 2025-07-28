interface BaseModel {
  _id: string;
  __v: number;
}


export interface Attendee extends BaseModel {
  name: string;
  email: string;
  timestamp: string; 
}

export interface EventProps extends BaseModel {
  title: string;
  description: string;
  date: string; 
  maxAttendees: number;
  attendees: Attendee[];
  image: string;
}


export interface CreateEventDTO {
  title: string;
  description: string;
  date: string;
  maxAttendees: number;
  image: File | string;
}