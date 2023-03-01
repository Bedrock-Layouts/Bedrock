import { JSXElement, createContext, useContext } from "solid-js";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DefaultTheme {}

const ThemeContext = createContext<DefaultTheme>({});

export interface ThemeProviderProps {
  theme: DefaultTheme;
  children: JSXElement;
}

export function ThemeProvider(props: ThemeProviderProps): JSXElement {
  return (
    <ThemeContext.Provider value={props.theme}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): DefaultTheme {
  try {
    return useContext(ThemeContext);
  } catch (e) {
    return {};
  }
}
