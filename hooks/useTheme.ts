import { useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { COLORS } from '@/constants/colors';
import { CreateStylesFn } from '@/types/styles';

export function useTheme(createStyles: CreateStylesFn) {
  const insets = useSafeAreaInsets();
  const theme = useColorScheme() ?? 'light';

  const colors = COLORS[theme];

  const styles = useMemo(() => createStyles({ colors, insets }), [createStyles, colors, insets]);

  return { styles, colors };
}
