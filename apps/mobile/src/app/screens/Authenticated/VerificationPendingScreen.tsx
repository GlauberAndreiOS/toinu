import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../contexts/ThemeContext';
import { useAuth } from '../../../contexts/AuthContext';

export const VerificationPendingScreen: React.FC = () => {
  const { theme } = useTheme();
  const { logout, user } = useAuth();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      edges={['top', 'bottom']}
    >
      <View style={styles.content}>
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: theme.colors.primary + '20' },
          ]}
        >
          <Ionicons
            name="shield-checkmark"
            size={80}
            color={theme.colors.primary}
          />
        </View>

        <Text style={[styles.title, { color: theme.colors.text }]}>
          Verificação em andamento
        </Text>

        <Text
          style={[styles.description, { color: theme.colors.textSecondary }]}
        >
          Olá {user?.fullName || user?.passenger?.fullName || 'Passageiro'},
          estamos verificando seus dados e a validade do seu CPF. Este processo
          é rápido e garante a segurança de todos na plataforma.
        </Text>

        <View style={styles.statusCard}>
          <ActivityIndicator
            size="small"
            color={theme.colors.primary}
            style={styles.loader}
          />
          <Text style={[styles.statusText, { color: theme.colors.primary }]}>
            Aguardando validação dos documentos...
          </Text>
        </View>

        <Text style={[styles.hint, { color: theme.colors.textSecondary }]}>
          Você será liberado para solicitar viagens assim que a verificação for
          concluída.
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.logoutButton, { borderColor: theme.colors.border }]}
        onPress={logout}
      >
        <Ionicons
          name="log-out-outline"
          size={20}
          color={theme.colors.error || '#FF3B30'}
        />
        <Text
          style={[
            styles.logoutText,
            { color: theme.colors.error || '#FF3B30' },
          ]}
        >
          Sair da conta
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    marginBottom: 40,
  },
  iconContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  statusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.03)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 32,
    width: '100%',
  },
  loader: {
    marginRight: 12,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  hint: {
    fontSize: 14,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
