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

export const MOCK_EVENTS_PLANS: IEventPlan[] = [
  {
    id: '1',
    title: 'Plan 1',
    events: Array.from({ length: 5 }, (_, index) => ({
      ...MOCK_EVENT,
      dtStart: new Date(MOCK_EVENT.dtStart).setUTCMonth(11, 20 + index),
      dtEnd: new Date(MOCK_EVENT.dtEnd).setUTCMonth(11, 20 + index),
      id: (index + 1).toString(),
    })),
  },
  {
    id: '2',
    title: 'Plan 2',
    events: Array.from({ length: 5 }, (_, index) => ({
      ...MOCK_EVENT,
      dtStart: new Date(MOCK_EVENT.dtStart).setUTCFullYear(2025, 0),
      dtEnd: new Date(MOCK_EVENT.dtEnd).setUTCFullYear(2025, 0),
      id: (index + 6).toString(),
    })),
  },
  {
    id: '3',
    title: 'Plan 3',
    events: Array.from({ length: 5 }, (_, index) => ({
      ...MOCK_EVENT,
      dtStart: new Date(MOCK_EVENT.dtStart).setUTCFullYear(2025, 0),
      dtEnd: new Date(MOCK_EVENT.dtEnd).setUTCFullYear(2025, 0),
      id: (index + 11).toString(),
    })),
  },
  {
    id: '4',
    title: 'Plan 4',
    events: Array.from({ length: 5 }, (_, index) => ({
      ...MOCK_EVENT,
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
