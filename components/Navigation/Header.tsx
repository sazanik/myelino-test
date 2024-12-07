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
  onBackPress: () => unknown;
  onSwitchTheme?: () => unknown;
  style?: StyleProp<ViewStyle>;
}

const createStyles: CreateStylesFn = ({ colors }) => ({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  action: {
    width: 46,
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.header.backButton.background,
    padding: 8,
    borderRadius: ROUND_BORDER,
  },
  title: {
    fontSize: 22,
    lineHeight: 26,
    fontWeight: '600',
    color: colors.common.text.primary,
  },
  actionMock: {
    width: 46,
    height: 46,
  },
});

const Header: FC<Props> = ({ title, onBackPress, onSwitchTheme = undefined, style = {} }) => {
  const { styles, colors } = useTheme(createStyles);

  const { theme } = useThemeContext();

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={styles.action}
        activeOpacity={TOUCHABLE_OPACITY}
        onPress={onBackPress}
      >
        <ArrowBackIcon />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      {onSwitchTheme ? (
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
      ) : (
        <View style={styles.rightActionMock} />
      )}
    </View>
  );
};

export default Header;
