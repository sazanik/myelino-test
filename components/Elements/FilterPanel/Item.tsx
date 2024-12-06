import { FC, useCallback } from 'react';
import { StyleProp, Text, TouchableOpacity, ViewStyle } from 'react-native';

import { useTheme } from '@/hooks';
import { IOption } from '@/types/components';
import { CreateStylesFn } from '@/types/styles';

const createStyles: CreateStylesFn = ({ colors }) => ({
  container: {
    padding: 14,
    borderRadius: 30,
    backgroundColor: colors.common.componentBackground,
    shadowColor: colors.common.shadow.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  title: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '700',
    color: colors.filterPanel.item.text,
  },
  selectedTitle: {
    color: colors.filterPanel.item.selectedText,
  },
});

interface Props {
  option: IOption;
  onPress: (option: IOption) => unknown;
  selected: boolean;
  style?: StyleProp<ViewStyle>;
}

const Item: FC<Props> = ({ option, onPress, selected, style = {} }) => {
  const { styles } = useTheme(createStyles);

  const handlePress = useCallback(() => {
    onPress(option);
  }, [onPress, option]);

  return (
    <TouchableOpacity onPress={handlePress} style={[styles.container, style]}>
      <Text style={[styles.title, selected && styles.selectedTitle]}>{option.label}</Text>
    </TouchableOpacity>
  );
};

export default Item;
