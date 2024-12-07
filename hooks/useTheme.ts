import { useMemo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { COLORS } from '@/constants';
import { useThemeContext } from '@/contexts/useThemeContext';
import { CreateStylesFn } from '@/types';

export function useTheme(createStyles: CreateStylesFn) {
  const insets = useSafeAreaInsets();
  const { theme } = useThemeContext();

  const colors = COLORS[theme];
  const styles = useMemo(() => createStyles({ colors, insets }), [createStyles, colors, insets]);

  return { styles, colors };
}
