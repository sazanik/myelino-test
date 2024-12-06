export interface IOption {
  value: string;
  label: string;
}

export interface IEvent {
  title: string;
  invitedPersonsCount: number;
  cost: number;
  image: string;
  // number because it might be a timestamp
  dtStart: Date | number;
  dtEnd: Date | number;
  description: string;
  location?: string;
}
