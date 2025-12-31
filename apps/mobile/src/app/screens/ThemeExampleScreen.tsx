import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';
import { ThemeToggle } from '@app/components';

/**
 * Exemplo completo de como usar o sistema de temas com detecção automática
 * Este arquivo mostra todas as funcionalidades disponíveis
 */
export default function ThemeExampleScreen() {
  const { theme, toggleTheme, useDeviceTheme, useSystemTheme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: 20,
      justifyContent: 'center',
    },
    section: {
      marginBottom: 24,
      padding: 16,
      backgroundColor: theme.colors.surface,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: 12,
    },
    description: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      marginBottom: 12,
      lineHeight: 20,
    },
    badge: {
      alignSelf: 'flex-start',
      paddingHorizontal: 12,
      paddingVertical: 6,
      backgroundColor: theme.colors.primary,
      borderRadius: 20,
      marginBottom: 12,
    },
    badgeText: {
      color: theme.colors.background,
      fontWeight: '600',
      fontSize: 12,
    },
    button: {
      paddingHorizontal: 16,
      paddingVertical: 10,
      backgroundColor: theme.colors.primary,
      borderRadius: 8,
      marginTop: 12,
    },
    buttonText: {
      color: theme.colors.background,
      fontWeight: '600',
      textAlign: 'center',
    },
    systemIndicator: {
      fontSize: 12,
      color: theme.colors.success,
      fontWeight: '600',
      marginTop: 8,
    },
  });

  return (
    <View style={styles.container}>
      {/* Status Atual */}
      <View style={styles.section}>
        <Text style={styles.title}>Status do Tema</Text>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {theme.mode === 'light' ? '☀️ Tema Claro' : '🌙 Tema Escuro'}
          </Text>
        </View>

        <Text style={styles.description}>
          Tema atual: <Text style={{ fontWeight: 'bold' }}>{theme.mode.toUpperCase()}</Text>
        </Text>

        {useSystemTheme && (
          <Text style={styles.systemIndicator}>
            ✓ Sincronizando com o tema do sistema
          </Text>
        )}
      </View>

      {/* Alternador Manual */}
      <View style={styles.section}>
        <Text style={styles.title}>Alternar Tema</Text>

        <Text style={styles.description}>
          Clique no botão abaixo para alternar manualmente entre Light e Dark Mode.
          Isso desativará a sincronização com o sistema.
        </Text>

        <TouchableOpacity style={styles.button} onPress={toggleTheme}>
          <Text style={styles.buttonText}>
            {theme.mode === 'light' ? '🌙 Mudar para Escuro' : '☀️ Mudar para Claro'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Sincronização com Sistema */}
      {!useSystemTheme && (
        <View style={styles.section}>
          <Text style={styles.title}>Voltar para Tema do Sistema</Text>

          <Text style={styles.description}>
            Você está usando um tema manual. Clique abaixo para sincronizar novamente
            com a preferência do seu dispositivo.
          </Text>

          <TouchableOpacity style={styles.button} onPress={useDeviceTheme}>
            <Text style={styles.buttonText}>
              ⚙️ Usar Tema do Sistema
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Botão Flutuante */}
      <View style={styles.section}>
        <Text style={styles.title}>Botão de Tema</Text>

        <Text style={styles.description}>
          Este é o componente ThemeToggle que você pode adicionar em qualquer lugar:
        </Text>

        <View style={{ alignItems: 'center', marginTop: 16 }}>
          <ThemeToggle showLabel={true} />
        </View>
      </View>

      {/* Cores Disponíveis */}
      <View style={styles.section}>
        <Text style={styles.title}>Cores do Tema</Text>

        <View style={{ gap: 8 }}>
          <ColorSwatch label="Primary" color={theme.colors.primary} />
          <ColorSwatch label="Background" color={theme.colors.background} />
          <ColorSwatch label="Surface" color={theme.colors.surface} />
          <ColorSwatch label="Text" color={theme.colors.text} />
          <ColorSwatch label="Text Secondary" color={theme.colors.textSecondary} />
        </View>
      </View>
    </View>
  );
}

/**
 * Componente auxiliar para mostrar uma cor
 */
function ColorSwatch({ label, color }: { label: string; color: string }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
      <View
        style={{
          width: 32,
          height: 32,
          backgroundColor: color,
          borderRadius: 4,
          borderWidth: 1,
          borderColor: '#ccc',
        }}
      />
      <Text style={{ fontSize: 14, flex: 1 }}>
        {label}: <Text style={{ fontWeight: 'bold' }}>{color}</Text>
      </Text>
    </View>
  );
}

