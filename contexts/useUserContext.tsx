import { createContext, PropsWithChildren, useContext, useMemo, useState } from 'react';

import { IUser } from '@/types';

interface IUserContext {
  user: IUser | null;
  setUser: (user: IUser | null) => unknown;
}

export const UserContext = createContext<IUserContext>({
  user: null,
  setUser: () => {},
});

export const UserContextProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<IUser | null>(null);

  const value = useMemo(
    () => ({
      user,
      setUser,
    }),
    [user]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext);

export default UserContextProvider;
