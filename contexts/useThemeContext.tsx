import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { useColorScheme } from 'react-native';

interface IThemeContext {
  theme: 'light' | 'dark';
  switchTheme: () => unknown;
}

export const ThemeContext = createContext<IThemeContext>({
  theme: 'light',
  switchTheme: () => {},
});

const ThemeContextProvider = ({ children }: PropsWithChildren) => {
  const systemTheme = useColorScheme() ?? 'light';

  const [theme, setTheme] = useState<IThemeContext['theme']>(systemTheme);

  const switchTheme = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }, [theme]);

  const value = useMemo(() => ({ theme, switchTheme }), [switchTheme, theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useThemeContext = () => useContext(ThemeContext);

export default ThemeContextProvider;
