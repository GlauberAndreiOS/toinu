import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { ThemeProvider, useTheme } from '../contexts/ThemeContext';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { PassengerStatus } from '@toinu/shared-types';
import {
  HomeScreen,
  LoginScreen,
  RegisterScreen,
} from './screens/Unauthenticated';
import { AuthenticatedLayout } from './screens/Authenticated/AuthenticatedLayout';
import { VerificationPendingScreen } from './screens/Authenticated/VerificationPendingScreen';

type UnauthenticatedScreen = 'home' | 'login' | 'register';

interface AppState {
  unauthenticatedScreen: UnauthenticatedScreen;
}

/**
 * Componente interno que usa o theme e auth
 */
function AppContent() {
  const { theme } = useTheme();
  const { isAuthenticated, user, loading, hasSeenCarousel } = useAuth();
  const [appState, setAppState] = useState<AppState>({
    unauthenticatedScreen: 'home',
  });

  // Atualiza tela inicial quando carousssel é carregado
  React.useEffect(() => {
    if (!loading) {
      setAppState((prev) => ({
        ...prev,
        unauthenticatedScreen: !hasSeenCarousel ? 'login' : 'home',
      }));
    }
  }, [hasSeenCarousel, loading]);

  // Handlers para telas não autenticadas
  const handleGetStarted = () => {
    setAppState((prev) => ({
      ...prev,
      unauthenticatedScreen: 'login',
    }));
  };

  const handleNavigateToRegister = () => {
    setAppState((prev) => ({
      ...prev,
      unauthenticatedScreen: 'register',
    }));
  };

  const handleNavigateToLogin = () => {
    setAppState((prev) => ({
      ...prev,
      unauthenticatedScreen: 'login',
    }));
  };

  const renderUnauthenticatedScreen = () => {
    switch (appState.unauthenticatedScreen) {
      case 'login':
        return (
          <LoginScreen
            navigation={{
              navigate: handleNavigateToRegister,
            }}
          />
        );
      case 'register':
        return (
          <RegisterScreen
            navigation={{
              navigate: handleNavigateToLogin,
              goBack: handleNavigateToLogin,
            }}
          />
        );
      case 'home':
      default:
        return <HomeScreen onGetStarted={handleGetStarted} />;
    }
  };

  const renderAuthenticatedScreen = () => {
    // Se for passageiro e não estiver verificado, mostra a tela de pendência
    if (user?.passenger && user.passenger.status !== PassengerStatus.VERIFIED) {
      return <VerificationPendingScreen />;
    }

    return <AuthenticatedLayout />;
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.colors.background }]}
      edges={['top', 'bottom']}
    >
      {isAuthenticated
        ? renderAuthenticatedScreen()
        : renderUnauthenticatedScreen()}
    </SafeAreaView>
  );
}

/**
 * Root component do app
 * Gerencia o SafeAreaView, tema e autenticação
 */
export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
