import { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Image,
  ImageStyle,
  StyleProp,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { CustomInput } from '@/components';
import { axiosClient } from '@/config';
import { ROUTE, TOUCHABLE_OPACITY } from '@/constants';
import { normalizeError } from '@/helpers';
import { useForm, useTheme, useTypedNavigation } from '@/hooks';
import { CreateStylesFn } from '@/types';

import Logo from '../assets/images/logo.png';

const createStyles: CreateStylesFn = ({ colors }) => ({
  container: {
    backgroundColor: colors.common.screenBackground,
    flex: 1,
    paddingHorizontal: 15,
  },
  logo: {
    alignSelf: 'center',
    aspectRatio: 0.8,
    height: 150,
    marginVertical: 40,
  },
  form: {
    marginTop: 20,
    rowGap: 20,
  },
  button: {
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: colors.common.button.primary.background,
    borderRadius: 50,
    paddingVertical: 12,
  },
  textButton: {
    color: colors.common.button.primary.content,
    fontFamily: 'RobotoBold',
    fontSize: 18,
  },
});

const AuthScreen = () => {
  const { styles } = useTheme(createStyles);

  const navigation = useTypedNavigation();

  const { top } = useSafeAreaInsets();
  const colorScheme = useColorScheme();

  const { identifier, password, onChange, reset } = useForm({
    identifier: '',
    password: '',
  });

  const [isLogged] = useState(true);

  const handleIdentifierChange = useCallback(
    (value: string) => {
      onChange(value, 'identifier');
    },
    [onChange]
  );

  const handlePasswordChange = useCallback(
    (value: string) => {
      onChange(value, 'password');
    },
    [onChange]
  );

  const handleLoginPress = async () => {
    if ([identifier, password].includes('')) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    try {
      await axiosClient.post('/auth/sign-in', { identifier, password });

      reset();
      navigation.reset({
        index: 0,
        routes: [{ name: ROUTE.plan.plans }],
      });
    } catch (error: unknown) {
      const errorMessage = normalizeError(error);

      Alert.alert('Error', errorMessage);
    }
  };

  useEffect(() => {
    if (isLogged) {
      setTimeout(() => navigation.navigate(ROUTE.plan.plans), 0);
    }
  }, [isLogged, navigation]);

  return (
    <>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <View style={{ ...styles.container, paddingTop: top }}>
        <Image source={Logo} style={styles.logo as StyleProp<ImageStyle>} />
        <View style={styles.form}>
          <CustomInput value={identifier} onChangeText={handleIdentifierChange} />
          <CustomInput type="password" value={password} onChangeText={handlePasswordChange} />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={handleLoginPress}
          activeOpacity={TOUCHABLE_OPACITY}
        >
          <Text style={styles.textButton}>Login</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default AuthScreen;
