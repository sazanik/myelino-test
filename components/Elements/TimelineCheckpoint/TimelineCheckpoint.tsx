import { FC } from 'react';
import { StyleProp, Text, View, ViewStyle } from 'react-native';

import { ROUND_BORDER } from '@/constants';
import { useTheme } from '@/hooks';
import { CreateStylesFn } from '@/types';

const createStyles: CreateStylesFn = ({ colors }) => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
  },
  circle: {
    height: 14,
    width: 14,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: ROUND_BORDER,
  },
  innerCircle: {
    height: 8,
    width: 8,
    borderRadius: ROUND_BORDER,
  },
  horizontalDivider: {
    height: 1,
    width: 16,
    paddingHorizontal: 4,
    marginHorizontal: -6,
    backgroundColor: colors.timelineCheckpoint.divider.horizontal,
  },
  title: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: 'RobotoBold',
  },
});

interface Props {
  type: 'urgent' | 'month' | 'plan';
  title: string;
  style?: StyleProp<ViewStyle>;
}

const TimelineCheckpoint: FC<Props> = ({ type, title, style }) => {
  const { styles, colors } = useTheme(createStyles);

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.circle, { borderColor: colors.timelineCheckpoint[type].border }]}>
        <View
          style={[
            styles.innerCircle,
            { backgroundColor: colors.timelineCheckpoint[type].background },
          ]}
        />
      </View>
      {type === 'plan' && <View style={styles.horizontalDivider} />}
      <Text style={[styles.title, { color: colors.timelineCheckpoint[type].text }]}>{title}</Text>
    </View>
  );
};

export default TimelineCheckpoint;
