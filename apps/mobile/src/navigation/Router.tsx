import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useAuth } from '@contexts/AuthContext';
import { useTheme } from '@contexts/ThemeContext';
import { PassengerStatus } from '@toinu/shared-types';

// Importação das Telas
import { HomeScreen } from '@screens/Unauthenticated';
import { LoginScreen } from '@screens/Unauthenticated';
import { RegisterFlow } from '@screens/Unauthenticated/RegisterFlow/RegisterFlow';
import { AuthenticatedLayout } from '@screens/Authenticated';
import { VerificationPendingScreen } from '@screens/Authenticated/VerificationPendingScreen';

export function Router() {
  const { theme } = useTheme();
  const { isAuthenticated, user, loading, hasSeenCarousel } = useAuth();

  const [unauthScreen, setUnauthScreen] = useState<
    'home' | 'login' | 'register'
  >('home');

  useEffect(() => {
    if (!loading) {
      setUnauthScreen(hasSeenCarousel ? 'login' : 'home');
    }
  }, [hasSeenCarousel, loading]);

  if (loading) {
    return (
      <View
        style={[styles.center, { backgroundColor: theme.colors.background }]}
      >
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  // --- FLUXO AUTENTICADO ---
  if (isAuthenticated) {
    // 1. Verificação de CPF Pendente (Integração com o Job do NestJS)
    if (user?.passenger && user.passenger.status !== PassengerStatus.VERIFIED) {
      return <VerificationPendingScreen />;
    }

    // 2. Cadastro Incompleto (Logou mas não criou perfil)
    if (!user?.passenger && !user?.driver) {
      return <RegisterFlow />;
    }

    // 3. App Principal
    return <AuthenticatedLayout />;
  }

  // --- FLUXO NÃO AUTENTICADO (GUEST) ---
  switch (unauthScreen) {
    case 'login':
      return (
        <LoginScreen
          navigation={{ navigate: () => setUnauthScreen('register') }}
        />
      );
    case 'register':
      return <RegisterFlow />;
    case 'home':
    default:
      return <HomeScreen onGetStarted={() => setUnauthScreen('login')} />;
  }
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
