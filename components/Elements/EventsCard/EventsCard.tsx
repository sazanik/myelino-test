import { FC } from 'react';
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
import { CreateStylesFn, IEvent } from '@/types';

const createStyles: CreateStylesFn = ({ colors }) => ({
  container: {
    width: '100%',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    backgroundColor: colors.common.componentBackground,
  },
  shadow: {
    shadowColor: colors.common.shadow.secondary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  leftDivider: {
    width: 1,
    backgroundColor: colors.eventsCard.divider,
  },
  rightDivider: {
    marginVertical: -12,
    width: 1,
    backgroundColor: colors.eventsCard.divider,
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
    color: colors.eventsCard.counter.text,
  },
  titleSection: {
    paddingLeft: 20,
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
  imageBox: {
    borderWidth: 1,
    borderColor: colors.eventsCard.imageBox.border,
    width: '100%',
    height: '100%',
    borderRadius: 4,
  },
});

interface Props {
  title: string;
  events: IEvent[];
  onItemPress: () => unknown;
  style?: StyleProp<ViewStyle>;
}

const EventsCard: FC<Props> = ({ title, events, onItemPress, style }) => {
  const { styles } = useTheme(createStyles);

  const filteredEvents = events
    .filter((event) => Date.now() < Number(event.dtEnd))
    .sort((e1, e2) => Number(e2.dtEnd) - Number(e1.dtEnd));

  return (
    <TouchableOpacity
      style={[styles.container, styles.shadow, style]}
      activeOpacity={TOUCHABLE_OPACITY}
      onPress={onItemPress}
    >
      <View style={styles.counterSection}>
        <Text style={styles.counterTitle}>Events</Text>
        <View style={styles.counterBox}>
          <Text style={styles.counterBoxTitle}>{filteredEvents.length}</Text>
        </View>
      </View>
      <View style={styles.leftDivider} />
      <View style={styles.titleSection}>
        <Text style={styles.title}>{title}</Text>
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
              idx !== 2 && styles.shadow,
            ]}
          >
            <Image
              style={styles.imageBox as StyleProp<ImageStyle>}
              source={{ uri: event.imageUrl }}
            />
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
};

export default EventsCard;
