import { ParamListBase } from '@react-navigation/native';

import { ROUTE } from '@/constants/routes';
import { IEventPlan } from '@/types/components';

export type RouteParams = {
  [ROUTE.root]: undefined;
  [ROUTE.plan.plans]: undefined;
  [ROUTE.plan.details]: { plan: IEventPlan };
} & ParamListBase;
