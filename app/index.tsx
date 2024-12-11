import { useCallback, useEffect } from 'react';
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
import asyncStorage from '@react-native-async-storage/async-storage/src/AsyncStorage';

import { CustomInput } from '@/components';
import { http } from '@/config';
import { ROUTE, TOUCHABLE_OPACITY } from '@/constants';
import { useUserContext } from '@/contexts/useUserContext';
import { normalizeError } from '@/helpers';
import { useForm, useTheme, useTypedNavigation } from '@/hooks';
import { verifyToken } from '@/services';
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
  const { top } = useSafeAreaInsets();
  const colorScheme = useColorScheme();

  const navigation = useTypedNavigation();

  const { setUser } = useUserContext();

  const { identifier, password, onChange, reset } = useForm({
    identifier: 'username',
    password: 'password',
  });

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
      const {
        data: { token },
      } =
        (await http.post<{ token: string }>('/auth/login', {
          identifier,
          password,
        })) ?? [];

      asyncStorage.setItem('token', token);

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

  const checkToken = useCallback(async () => {
    const token = await asyncStorage.getItem('token');

    if (!token) {
      return;
    }

    const verifiedUser = await verifyToken(token);

    setUser(verifiedUser);

    if (verifiedUser) {
      navigation.reset({
        index: 0,
        routes: [{ name: ROUTE.plan.plans }],
      });
    }
  }, [navigation, setUser]);

  useEffect(() => {
    checkToken();
  }, [checkToken]);

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
