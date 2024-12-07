import { ActivityIndicator, View } from 'react-native';

import { useTheme } from '@/hooks';
import { CreateStylesFn } from '@/types';

const createStyles: CreateStylesFn = () => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Loader = () => {
  const { styles, colors } = useTheme(createStyles);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.loader} />
    </View>
  );
};

export default Loader;
