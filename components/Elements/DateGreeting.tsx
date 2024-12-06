import { FC, useCallback } from 'react';
import { StyleProp, Text, View, ViewStyle } from 'react-native';
import { getLocales } from 'expo-localization';

import { useTheme } from '@/hooks';
import { CreateStylesFn } from '@/types';

const createStyles: CreateStylesFn = ({ colors }) => ({
  container: {
    rowGap: 4,
  },
  date: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '700',
    fontFamily: 'Inter',
    color: colors.common.text.primary,
  },
  greeting: {
    fontSize: 26,
    lineHeight: 30,
    fontWeight: '700',
    fontFamily: 'Inter',
    color: colors.common.text.brand,
  },
});

interface Props {
  style?: StyleProp<ViewStyle>;
}

const DateGreeting: FC<Props> = ({ style = {} }) => {
  const { styles } = useTheme(createStyles);

  const getCurrentGreeting = useCallback(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      return 'Good Morning';
    }

    if (hour < 18) {
      return 'Good Afternoon';
    }

    if (hour < 21) {
      return 'Good Evening';
    }

    return 'Good Night';
  }, []);

  const formatDate = (): string => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: 'numeric',
      month: 'short',
    };

    return new Date().toLocaleDateString(getLocales()[0].languageTag, options);
  };

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.date}>{formatDate()}</Text>
      <Text style={styles.greeting}>{getCurrentGreeting()}</Text>
    </View>
  );
};

export default DateGreeting;
