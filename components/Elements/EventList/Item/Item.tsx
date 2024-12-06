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

import { LocationIcon, MoneyIcon, PeopleIcon } from '@/assets/icons';
import Label from '@/components/Elements/EventList/Item/Label';
import { useTheme } from '@/hooks';
import { CreateStylesFn, IEvent } from '@/types';

const createStyles: CreateStylesFn = ({ colors }) => ({
  container: {
    flex: 1,
    overflow: 'hidden',
    height: 170,
    width: 160,
    borderRadius: 10,
    backgroundColor: colors.common.componentBackground,
    shadowColor: colors.common.shadow.primary,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.)',
  },
  paddingBox: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  title: {
    marginTop: 'auto',
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '500',
    fontFamily: 'Inter',
    color: colors.eventList.item.text,
  },
  bottomRow: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftColumn: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 2,
  },
  locationIcon: {
    paddingHorizontal: 0,
    height: 20,
    width: 20,
  },
});

interface Props {
  event: IEvent;
  onPress: (item: IEvent) => unknown;
  style?: StyleProp<ViewStyle>;
}

const Item: FC<Props> = ({ event, onPress, style = null }) => {
  const { styles } = useTheme(createStyles);

  const handlePress = useCallback(() => {
    onPress(event);
  }, [onPress, event]);

  return (
    <TouchableOpacity onPress={handlePress} style={[styles.container, style]}>
      <Image
        style={styles.image as StyleProp<ImageStyle>}
        source={{ uri: event.imageUrl }}
        resizeMode="cover"
      />
      <View style={styles.imageOverlay} />
      <View style={styles.paddingBox}>
        <Text style={styles.title}>{event.title}</Text>
        <View style={styles.bottomRow}>
          <View style={styles.leftColumn}>
            <Label Icon={PeopleIcon} title={event.invitedPersonsCount.toString()} />
            <Label Icon={MoneyIcon} title={event.cost.toString()} />
          </View>
          <Label style={styles.locationIcon} Icon={LocationIcon} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Item;
