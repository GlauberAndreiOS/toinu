import React from 'react';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';

interface ThemeToggleProps {
  showLabel?: boolean;
}

/**
 * Componente botão para alternar entre light e dark mode
 * Pode ser adicionado em qualquer lugar da aplicação
 *
 * Props:
 * - showLabel: Mostrar texto indicando o tema atual (padrão: false)
 */
export const ThemeToggle: React.FC<ThemeToggleProps> = ({ showLabel = false }) => {
  const { theme, toggleTheme, useSystemTheme } = useTheme();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.border,
          }
        ]}
        onPress={toggleTheme}
      >
        <Text style={styles.icon}>
          {theme.mode === 'light' ? '🌙' : '☀️'}
        </Text>
      </TouchableOpacity>

      {showLabel && (
        <Text style={[styles.label, { color: theme.colors.textSecondary }]}>
          {useSystemTheme ? 'Sistema' : theme.mode === 'light' ? 'Claro' : 'Escuro'}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 8,
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    borderWidth: 1,
  },
  icon: {
    fontSize: 24,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
  },
});

