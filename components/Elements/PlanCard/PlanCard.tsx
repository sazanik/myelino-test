import { FC, useCallback } from 'react';
import {
  Image,
  ImageStyle,
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import { TOUCHABLE_OPACITY } from '@/constants';
import { useTheme } from '@/hooks';
import { CreateStylesFn, IEventPlan } from '@/types';

const createStyles: CreateStylesFn = ({ colors }) => ({
  container: {
    width: '100%',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    backgroundColor: colors.common.componentBackground,
    shadowColor: colors.common.shadow.secondary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.65,
    elevation: 3,
  },
  leftDivider: {
    width: 1,
    backgroundColor: colors.planCard.divider,
  },
  rightDivider: {
    marginVertical: -12,
    width: 1,
    backgroundColor: colors.planCard.divider,
  },
  counterSection: {
    paddingRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterTitle: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '400',
    fontFamily: 'RobotoRegular',
    color: colors.common.text.secondary,
  },
  counterBox: {
    marginTop: 8,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: colors.common.button.primary.background,
  },
  counterBoxTitle: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: '800',
    fontFamily: 'RobotoBold',
    color: colors.planCard.counter.text,
  },
  titleSection: {
    paddingHorizontal: 18,
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '700',
    color: colors.common.text.primary,
  },
  imagesSection: {
    paddingLeft: 12,
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBoxShadow: {
    backgroundColor: colors.common.componentBackground,
    shadowColor: colors.common.shadow.secondary,
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  image: {
    borderWidth: 1,
    borderColor: colors.planCard.imageBox.border,
    width: '100%',
    height: '100%',
    borderRadius: 4,
    backgroundColor: colors.common.componentBackground,
  },
});

interface Props {
  title: string;
  plan: IEventPlan;
  onItemPress: (plan: IEventPlan) => unknown;
  style?: StyleProp<ViewStyle>;
}

const PlanCard: FC<Props> = ({ title, plan, onItemPress, style }) => {
  const { styles } = useTheme(createStyles);

  const handlePress = useCallback(() => {
    onItemPress(plan);
  }, [onItemPress, plan]);

  const filteredEvents = plan.events
    .filter((event) => Date.now() < Number(event.dtEnd))
    .sort((event1, event2) => Number(event2.dtEnd) - Number(event1.dtEnd));

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      activeOpacity={TOUCHABLE_OPACITY}
      onPress={handlePress}
    >
      <View style={styles.counterSection}>
        <Text style={styles.counterTitle}>Events</Text>
        <View style={styles.counterBox}>
          <Text style={styles.counterBoxTitle}>{filteredEvents.length}</Text>
        </View>
      </View>
      <View style={styles.leftDivider} />
      <View style={styles.titleSection}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
      </View>
      <View style={styles.rightDivider} />
      <View style={styles.imagesSection}>
        {filteredEvents.slice(0, 3).map((event, idx) => (
          <View
            /* eslint-disable-next-line react/no-array-index-key */
            key={idx.toString()}
            style={[
              // eslint-disable-next-line react-native/no-inline-styles
              {
                zIndex: -idx,
                width: 56 - idx * 8,
                height: 56 - idx * 8,
                marginRight: idx ? -24 : 0,
              },
              idx !== 2 && styles.imageBoxShadow,
            ]}
          >
            <Image style={styles.image as StyleProp<ImageStyle>} source={{ uri: event.imageUrl }} />
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
};

export default PlanCard;
