import { IEvent, IEventPlan } from '@/types/components';

export const MOCK_EVENT: IEvent = {
  title: 'Coffee break',
  dtStart: new Date(),
  dtEnd: new Date(),
  cost: 50,
  invitedPersonsCount: 4,
  imageUrl:
    'https://plus.unsplash.com/premium_photo-1675435644687-562e8042b9db?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2FmZXxlbnwwfHwwfHx8MA%3D%3D',
};

export const MOCK_EVENT_2: IEvent = {
  title: 'Coworking',
  dtStart: new Date(),
  dtEnd: new Date(),
  cost: 150,
  invitedPersonsCount: 2,
  imageUrl:
    'https://images.unsplash.com/photo-1485872299829-c673f5194813?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJhcnxlbnwwfHwwfHx8MA%3D%3D',
};

export const MOCK_EVENT_3: IEvent = {
  title: 'Reggae cafe',
  dtStart: new Date(),
  dtEnd: new Date(),
  cost: 100,
  invitedPersonsCount: 3,
  imageUrl:
    'https://images.unsplash.com/photo-1483648969698-5e7dcaa3444f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNhZmV8ZW58MHx8MHx8fDA%3D',
};

export const MOCK_EVENT_4: IEvent = {
  title: 'Bar',
  dtStart: new Date(),
  dtEnd: new Date(),
  cost: 300,
  invitedPersonsCount: 6,
  imageUrl:
    'https://images.unsplash.com/photo-1500217052183-bc01eee1a74e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFyfGVufDB8fDB8fHww',
};

export const MOCK_EVENTS_PLANS: IEventPlan[] = [
  {
    id: '1',
    title: 'Weekend',
    events: Array.from({ length: 5 }, (_, index) => ({
      ...MOCK_EVENT,
      dtStart: new Date(MOCK_EVENT.dtStart).setUTCMonth(11, 20 + index),
      dtEnd: new Date(MOCK_EVENT.dtEnd).setUTCMonth(11, 20 + index),
      id: (index + 1).toString(),
    })),
  },
  {
    id: '2',
    title: 'Cafes and Restaurants',
    events: Array.from({ length: 5 }, (_, index) => ({
      ...MOCK_EVENT_2,
      dtStart: new Date(MOCK_EVENT.dtStart).setUTCFullYear(2025, 0),
      dtEnd: new Date(MOCK_EVENT.dtEnd).setUTCFullYear(2025, 0),
      id: (index + 6).toString(),
    })),
  },
  {
    id: '3',
    title: 'Go to the parks',
    events: Array.from({ length: 5 }, (_, index) => ({
      ...MOCK_EVENT_3,
      dtStart: new Date(MOCK_EVENT.dtStart).setUTCFullYear(2025, 0),
      dtEnd: new Date(MOCK_EVENT.dtEnd).setUTCFullYear(2025, 0),
      id: (index + 11).toString(),
    })),
  },
  {
    id: '4',
    title: 'Go to the bars',
    events: Array.from({ length: 5 }, (_, index) => ({
      ...MOCK_EVENT_4,
      dtStart: new Date(MOCK_EVENT.dtStart).setUTCFullYear(2025, 1),
      dtEnd: new Date(MOCK_EVENT.dtEnd).setUTCFullYear(2025, 1),
      id: (index + 16).toString(),
    })),
  },
];

export const MOCK_EVENTS = MOCK_EVENTS_PLANS.reduce(
  (acc, plan) => [...acc, ...plan.events],
  [] as IEvent[]
);
