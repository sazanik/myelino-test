import { FC } from 'react';
import { StyleProp, Text, TouchableOpacity, View, ViewStyle } from 'react-native';

import { ArrowBackIcon } from '@/assets/icons';
import { ROUND_BORDER } from '@/constants/style';
import { useTheme } from '@/hooks';
import { CreateStylesFn } from '@/types/styles';

interface Props {
  title: string;
  onBackPress?: () => unknown;
  style?: StyleProp<ViewStyle>;
}

const createStyles: CreateStylesFn = ({ colors }) => ({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftAction: {
    width: 46,
    height: 46,
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
  rightActionMock: {
    width: 46,
    height: 46,
  },
});

const Header: FC<Props> = ({ title, onBackPress = () => {}, style = {} }) => {
  const { styles } = useTheme(createStyles);

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity style={styles.leftAction} onPress={onBackPress}>
        <ArrowBackIcon />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.rightActionMock} />
    </View>
  );
};

export default Header;
