export interface IOption {
  key: string;
  label: string;
}

export interface IUser {
  id?: string;
  username: string;
  email: string;
}

export interface IEvent {
  id?: string;
  planId: string;
  title: string;
  invitedPersonsCount: number;
  cost: number;
  imageUrl: string;
  // number because it might be a timestamp
  dtStart: Date | number;
  dtEnd: Date | number;
  location?: string;
}

export interface IPlan {
  id?: string;
  title: string;
  events: IEvent[];
}
