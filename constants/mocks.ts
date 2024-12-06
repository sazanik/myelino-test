import { IEvent, IOption } from '@/types/components';

export const MOCK_FILTER_PANEL_ITEMS: IOption[] = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
  { value: '4', label: 'Option 4' },
  { value: '5', label: 'Option 5' },
];

export const MOCK_EVENT: IEvent = {
  title: 'Coffee break',
  dtStart: new Date().setUTCDate(20),
  dtEnd: new Date().setUTCDate(21),
  cost: 50,
  invitedPersonsCount: 4,
  imageUrl:
    'https://plus.unsplash.com/premium_photo-1675435644687-562e8042b9db?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2FmZXxlbnwwfHwwfHx8MA%3D%3D',
};

export const MOCK_EVENTS = Array.from({ length: 8 }, (_, index) => ({
  ...MOCK_EVENT,
  id: (index + 1).toString(),
}));
