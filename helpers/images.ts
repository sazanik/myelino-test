import { BASE_URL } from '@/constants';

export const normalizeImageUrl = (imageUrl: string) => `${BASE_URL}/${imageUrl.split('/').at(-1)}`;
