import { useNavigation } from 'expo-router';

import { RouteParams } from '@/types/navigation';

type NavigationProp = {
  navigate<RouteName extends keyof RouteParams>(
    route: RouteName,
    params?: RouteParams[RouteName]
  ): void;
  reset(state: {
    index: number;
    routes: Array<{ name: keyof RouteParams; params?: unknown }>;
  }): void;
  goBack(): void;
};

export const useTypedNavigation = () => useNavigation<NavigationProp>();
