export interface IOption {
  value: string;
  label: string;
}

export interface IEvent {
  id?: string;
  title: string;
  invitedPersonsCount: number;
  cost: number;
  imageUrl: string;
  // number because it might be a timestamp
  dtStart: Date | number;
  dtEnd: Date | number;
  location?: string;
}

export interface IEventPlan {
  id?: string;
  title: string;
  events: IEvent[];
}
