import { type StyleSheet } from 'react-native';
import { type EdgeInsets } from 'react-native-safe-area-context';

import { COLORS } from '@/constants/colors';

export interface ICreateStylesFnArgs {
  colors: (typeof COLORS)['dark' | 'light'];
  insets: EdgeInsets;
}

export type CreateStylesFn = (args: ICreateStylesFnArgs) => ReturnType<typeof StyleSheet.create>;
