import { FC } from 'react';
import { StyleProp, Text, View, ViewStyle } from 'react-native';
import { SvgProps } from 'react-native-svg';

import { ROUND_BORDER } from '@/constants';
import { useTheme } from '@/hooks';
import { CreateStylesFn } from '@/types';

const createStyles: CreateStylesFn = ({ colors }) => ({
  container: {
    borderRadius: ROUND_BORDER,
    paddingHorizontal: 8,
    flexDirection: 'row',
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 4,
    backgroundColor: colors.eventList.item.label.background,
  },
  title: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: 'RobotoRegular',
    color: colors.eventList.item.label.content,
  },
  icon: {
    width: 12,
    height: 12,
    color: colors.eventList.item.label.content,
  },
});

interface Props {
  Icon: FC<SvgProps>;
  title?: string;
  style?: StyleProp<ViewStyle>;
}

const Label: FC<Props> = ({ Icon, title = null, style = {} }) => {
  const { styles } = useTheme(createStyles);

  return (
    <View style={[styles.container, style]}>
      <Icon style={styles.icon} />
      {!!title && <Text style={styles.title}>{title}</Text>}
    </View>
  );
};

export default Label;
