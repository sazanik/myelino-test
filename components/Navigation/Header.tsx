import { FC } from 'react';
import { StyleProp, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ArrowBackIcon } from '@/assets/icons';
import { ROUND_BORDER, TOUCHABLE_OPACITY } from '@/constants';
import { useThemeContext } from '@/contexts/useThemeContext';
import { useTheme } from '@/hooks';
import { CreateStylesFn } from '@/types';

interface Props {
  title: string;
  onBackPress?: () => unknown;
  onSwitchTheme?: () => unknown;
  onMenuPress?: () => unknown;
  style?: StyleProp<ViewStyle>;
}

const createStyles: CreateStylesFn = ({ colors }) => ({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftActions: {
    width: 84,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    columnGap: 4,
  },
  action: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.header.backButton.background,
    padding: 4,
    borderRadius: ROUND_BORDER,
  },
  title: {
    fontSize: 22,
    lineHeight: 26,
    fontWeight: '600',
    color: colors.common.text.primary,
  },
  rightActions: {
    width: 84,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    columnGap: 4,
  },
  actionMock: {
    width: 40,
    height: 40,
  },
});

const Header: FC<Props> = ({
  title,
  onBackPress = undefined,
  onSwitchTheme = undefined,
  onMenuPress = undefined,
  style = undefined,
}) => {
  const { styles, colors } = useTheme(createStyles);

  const { theme } = useThemeContext();

  return (
    <View style={[styles.container, style]}>
      <View style={styles.leftActions}>
        {!!onBackPress && (
          <TouchableOpacity
            style={styles.action}
            activeOpacity={TOUCHABLE_OPACITY}
            onPress={onBackPress}
          >
            <ArrowBackIcon />
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      <View style={styles.rightActions}>
        {onSwitchTheme && (
          <TouchableOpacity
            style={styles.action}
            activeOpacity={TOUCHABLE_OPACITY}
            onPress={onSwitchTheme}
          >
            <Ionicons
              name={theme === 'dark' ? 'sunny' : 'moon'}
              size={24}
              color={colors.common.icon.content}
            />
          </TouchableOpacity>
        )}
        {!!onMenuPress && (
          <TouchableOpacity
            style={styles.action}
            activeOpacity={TOUCHABLE_OPACITY}
            onPress={onMenuPress}
          >
            <Ionicons name="menu" size={24} color={colors.common.icon.content} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Header;
