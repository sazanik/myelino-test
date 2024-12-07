import { FC, ReactElement, useCallback } from 'react';
import { SectionList, SectionListData, StyleProp, View, ViewStyle } from 'react-native';

import TimelineCheckpoint from '@/components/Elements/TimelineCheckpoint';
import { SCREEN_PADDING } from '@/constants';
import { useTheme } from '@/hooks';
import { CreateStylesFn, IEvent } from '@/types';

import Item from '../Item';

const createStyles: CreateStylesFn = ({ colors, insets }) => ({
  container: {
    flex: 1,
    backgroundColor: colors.common.screenBackground,
  },
  contentContainer: {
    paddingBottom: (insets.top || SCREEN_PADDING.BOTTOM_M) + SCREEN_PADDING.BOTTOM_XL,
    paddingHorizontal: SCREEN_PADDING.HORIZONTAL,
    backgroundColor: colors.common.screenBackground,
  },
  sectionTitle: {
    marginTop: 20,
  },
  sectionEvents: {
    marginTop: 10,
    gap: 10,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item: {
    flexShrink: 0,
    maxWidth: '50%',
    minWidth: '45%',
  },
});

interface ISectionData {
  title: string;
  data: IEvent[];
  index: number;
}

interface Props {
  ListHeaderComponent?: ReactElement;
  sections: ISectionData[];
  onItemPress: (item: IEvent) => unknown;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  listHeaderComponentStyle?: StyleProp<ViewStyle>;
}

const Extended: FC<Props> = ({
  ListHeaderComponent,
  sections,
  onItemPress,
  style = null,
  contentStyle = null,
  listHeaderComponentStyle = null,
}) => {
  const { styles } = useTheme(createStyles);

  // because it is a required method
  const renderEmptyItem = useCallback(() => <></>, []);

  const renderSectionHeader = useCallback(
    // eslint-disable-next-line react/no-unused-prop-types
    ({ section }: { section: SectionListData<IEvent, ISectionData> }) => (
      <>
        <TimelineCheckpoint style={styles.sectionTitle} type="urgent" title={section.title} />
        <View style={styles.sectionEvents}>
          {section.data.map((event) => (
            <Item key={event.id} style={styles.item} event={event} onPress={onItemPress} />
          ))}
        </View>
      </>
    ),
    [onItemPress, styles.item, styles.sectionEvents, styles.sectionTitle]
  );

  return (
    <SectionList
      style={[styles.container, style]}
      contentContainerStyle={[styles.contentContainer, contentStyle]}
      ListHeaderComponentStyle={listHeaderComponentStyle}
      ListHeaderComponent={ListHeaderComponent}
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled
      renderItem={renderEmptyItem}
      sections={sections}
      keyExtractor={(_item, idx) => idx.toString()}
      renderSectionHeader={renderSectionHeader}
      stickySectionHeadersEnabled={false}
    />
  );
};

export default Extended;
