import React, { useEffect, useState, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useAuth } from '@contexts/AuthContext';
import { useTheme } from '@contexts/ThemeContext';
import { authApi } from '@services/api';

interface UserProfile {
  id: string;
  email: string;
  name: string;
  createdAt?: string;
}

/**
 * Tela de Perfil do Usuário
 * Exibe dados do usuário autenticado e permite logout
 */
export function ProfileScreen() {
  const { user, logout, token } = useAuth();
  const { theme } = useTheme();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const dynamicStyles = useMemo(
    () => createProfileStyles(theme),
    [theme]
  );

  useEffect(() => {
    loadProfile();
  }, [token]);

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!token) {
        setError('Token não encontrado');
        setLoading(false);
        return;
      }

      const profileData = await authApi.getProfile();
      setProfile(profileData);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Erro ao carregar perfil';
      setError(errorMessage);
      console.error('Erro ao carregar perfil:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Deseja sair da sua conta?', [
      {
        text: 'Cancelar',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Sair',
        onPress: async () => {
          try {
            await logout();
          } catch (error) {
            Alert.alert('Erro', 'Erro ao fazer logout');
          }
        },
        style: 'destructive',
      },
    ]);
  };

  if (loading) {
    return (
      <View style={dynamicStyles.container}>
        <ActivityIndicator
          size="large"
          color={theme.colors.primary}
          style={{ marginTop: 50 }}
        />
        <Text style={dynamicStyles.loadingText}>Carregando perfil...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={dynamicStyles.container}>
        <View style={dynamicStyles.errorContainer}>
          <Text style={dynamicStyles.errorIcon}>⚠️</Text>
          <Text style={dynamicStyles.errorTitle}>Erro ao Carregar Perfil</Text>
          <Text style={dynamicStyles.errorMessage}>{error}</Text>

          <TouchableOpacity
            style={dynamicStyles.retryButton}
            onPress={loadProfile}
          >
            <Text style={dynamicStyles.retryButtonText}>Tentar Novamente</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={dynamicStyles.logoutButton}
            onPress={handleLogout}
          >
            <Text style={dynamicStyles.logoutButtonText}>Sair</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const displayProfile = (profile || user) as UserProfile;

  return (
    <ScrollView style={dynamicStyles.container}>
      {/* Header */}
      <View style={dynamicStyles.header}>
        <View style={dynamicStyles.avatarContainer}>
          <Text style={dynamicStyles.avatar}>
            {displayProfile?.name?.charAt(0).toUpperCase() || '👤'}
          </Text>
        </View>
        <Text style={dynamicStyles.userName}>{displayProfile?.name || 'Usuário'}</Text>
        <Text style={dynamicStyles.userEmail}>{displayProfile?.email}</Text>
      </View>

      {/* Informações do Perfil */}
      <View style={dynamicStyles.section}>
        <Text style={dynamicStyles.sectionTitle}>Informações Pessoais</Text>

        <View style={dynamicStyles.infoItem}>
          <Text style={dynamicStyles.infoLabel}>Nome</Text>
          <Text style={dynamicStyles.infoValue}>{displayProfile?.name}</Text>
        </View>

        <View style={dynamicStyles.infoItem}>
          <Text style={dynamicStyles.infoLabel}>Email</Text>
          <Text style={dynamicStyles.infoValue}>{displayProfile?.email}</Text>
        </View>

        <View style={dynamicStyles.infoItem}>
          <Text style={dynamicStyles.infoLabel}>ID de Usuário</Text>
          <Text style={dynamicStyles.infoValueMonospace}>{displayProfile?.id}</Text>
        </View>

        {displayProfile?.createdAt && (
          <View style={dynamicStyles.infoItem}>
            <Text style={dynamicStyles.infoLabel}>Cadastrado em</Text>
            <Text style={dynamicStyles.infoValue}>
              {new Date(displayProfile.createdAt).toLocaleDateString('pt-BR')}
            </Text>
          </View>
        )}
      </View>

      {/* Ações */}
      <View style={dynamicStyles.section}>
        <TouchableOpacity
          style={dynamicStyles.actionButton}
          onPress={loadProfile}
        >
          <Text style={dynamicStyles.actionButtonIcon}>🔄</Text>
          <Text style={dynamicStyles.actionButtonText}>Atualizar Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[dynamicStyles.actionButton, dynamicStyles.logoutActionButton]}
          onPress={handleLogout}
        >
          <Text style={dynamicStyles.actionButtonIcon}>🚪</Text>
          <Text style={dynamicStyles.logoutActionButtonText}>Fazer Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={dynamicStyles.footer}>
        <Text style={dynamicStyles.footerText}>Versão 1.0.0</Text>
      </View>
    </ScrollView>
  );
}

const createProfileStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    loadingText: {
      marginTop: 16,
      fontSize: 16,
      color: theme.colors.textSecondary,
      textAlign: 'center',
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 24,
    },
    errorIcon: {
      fontSize: 64,
      marginBottom: 16,
    },
    errorTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: theme.colors.text,
      marginBottom: 8,
      textAlign: 'center',
    },
    errorMessage: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      marginBottom: 24,
      lineHeight: 20,
    },
    retryButton: {
      backgroundColor: theme.colors.primary,
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: 8,
      marginBottom: 12,
      width: '100%',
    },
    retryButtonText: {
      color: theme.colors.background,
      fontWeight: '600',
      fontSize: 14,
      textAlign: 'center',
    },
    logoutButton: {
      backgroundColor: theme.colors.error,
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: 8,
      width: '100%',
    },
    logoutButtonText: {
      color: '#ffffff',
      fontWeight: '600',
      fontSize: 14,
      textAlign: 'center',
    },
    header: {
      paddingVertical: 32,
      paddingHorizontal: 24,
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    avatarContainer: {
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: theme.colors.surface,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
      borderWidth: 2,
      borderColor: theme.colors.primary,
    },
    avatar: {
      fontSize: 48,
    },
    userName: {
      fontSize: 24,
      fontWeight: '700',
      color: theme.colors.text,
      marginBottom: 4,
    },
    userEmail: {
      fontSize: 14,
      color: theme.colors.textSecondary,
    },
    section: {
      paddingHorizontal: 24,
      paddingVertical: 20,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '700',
      color: theme.colors.text,
      marginBottom: 16,
    },
    infoItem: {
      marginBottom: 16,
      paddingBottom: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    infoLabel: {
      fontSize: 12,
      fontWeight: '600',
      color: theme.colors.textSecondary,
      textTransform: 'uppercase',
      marginBottom: 4,
    },
    infoValue: {
      fontSize: 16,
      fontWeight: '500',
      color: theme.colors.text,
    },
    infoValueMonospace: {
      fontSize: 12,
      fontWeight: '500',
      color: theme.colors.textSecondary,
      fontFamily: 'Courier New',
    },
    actionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 8,
      marginBottom: 12,
    },
    logoutActionButton: {
      borderColor: theme.colors.error,
      backgroundColor: `${theme.colors.error}15`,
    },
    actionButtonIcon: {
      fontSize: 20,
      marginRight: 12,
    },
    actionButtonText: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.text,
    },
    logoutActionButtonText: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.error,
    },
    footer: {
      paddingVertical: 24,
      alignItems: 'center',
    },
    footerText: {
      fontSize: 12,
      color: theme.colors.textSecondary,
    },
  });

