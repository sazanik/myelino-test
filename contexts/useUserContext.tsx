import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import asyncStorage from '@react-native-async-storage/async-storage/src/AsyncStorage';

import { ROUTE } from '@/constants';
import { useTypedNavigation } from '@/hooks';
import { IUser } from '@/types';

interface IUserContext {
  user: IUser | null;
  setUser: (user: IUser | null) => unknown;
  logout: () => unknown;
}

export const UserContext = createContext<IUserContext>({
  user: null,
  setUser: () => {},
  logout: () => {},
});

export const UserContextProvider = ({ children }: PropsWithChildren) => {
  const { reset } = useTypedNavigation();
  const [user, setUser] = useState<IUser | null>(null);

  const logout = useCallback(async () => {
    try {
      // crash on ios after it
      reset({
        index: 0,
        routes: [{ name: ROUTE.root }],
      });

      setUser(null);

      asyncStorage.removeItem('token');
    } catch (error) {
      console.error(error);
    }
  }, [reset]);

  const value = useMemo(
    () => ({
      user,
      setUser,
      logout,
    }),
    [logout, user]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext);

export default UserContextProvider;
