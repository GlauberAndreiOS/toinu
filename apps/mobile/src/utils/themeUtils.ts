import { StyleSheet } from 'react-native';
import { Theme } from '@contexts/ThemeContext';

/**
 * Cria um stylesheet dinâmico baseado no tema
 * @param theme - Objeto de tema com cores
 * @param createStyles - Função que recebe o tema e retorna os estilos
 */
export const createThemedStyles = <T extends Record<string, any>>(
  theme: Theme,
  createStyles: (colors: Theme['colors']) => T
): T => {
  return createStyles(theme.colors);
};

/**
 * Exemplo de uso em componentes
 *
 * const { theme } = useTheme();
 * const styles = useMemo(
 *   () => createThemedStyles(theme, (colors) => ({
 *     container: { backgroundColor: colors.background },
 *     text: { color: colors.text },
 *   })),
 *   [theme]
 * );
 */

