import { FC, PropsWithChildren } from 'react';
import { Modal, Pressable, View } from 'react-native';

import { useTheme } from '@/hooks';
import { CreateStylesFn } from '@/types';

const createStyles: CreateStylesFn = ({ colors }) => ({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.common.modal.overlay,
  },
  pressableArea: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  modal: {
    width: '90%',
    borderRadius: 20,
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.common.componentBackground,
  },
});

interface Props extends PropsWithChildren {
  visible: boolean;
  setVisibility: (visible: boolean) => unknown;
}

const Children: FC<Props> = ({ visible, setVisibility, children }) => {
  const { styles } = useTheme(createStyles);

  return (
    <Modal animationType="fade" transparent visible={visible}>
      <View style={styles.overlay}>
        <Pressable style={styles.pressableArea} onPress={() => setVisibility(false)} />
        <View style={styles.modal}>{children}</View>
      </View>
    </Modal>
  );
};

export default Children;
