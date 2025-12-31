import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemeProvider, useTheme } from '@contexts/ThemeContext';
import { AuthProvider, useAuth } from '@contexts/AuthContext';
import { HomeScreen, LoginScreen, RegisterScreen } from '@screens/Unauthenticated';
import { ProfileScreen } from '@screens/Authenticated';

type UnauthenticatedScreen = 'home' | 'login' | 'register';
type AuthenticatedScreen = 'profile' | 'dashboard';

interface AppState {
  unauthenticatedScreen: UnauthenticatedScreen;
  authenticatedScreen: AuthenticatedScreen;
}

/**
 * Componente interno que usa o theme e auth
 */
function AppContent() {
  const { theme } = useTheme();
  const { isAuthenticated, logout, hasSeenCarousel, loading } = useAuth();
  const [appState, setAppState] = useState<AppState>({
    unauthenticatedScreen: 'home',
    authenticatedScreen: 'profile',
  });

  // Atualiza tela inicial quando carousssel é carregado
  React.useEffect(() => {
    if (!loading) {
      setAppState((prev) => ({
        ...prev,
        unauthenticatedScreen: hasSeenCarousel ? 'login' : 'home',
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

  // Handlers para telas autenticadas
  const handleNavigateToProfile = () => {
    setAppState((prev) => ({
      ...prev,
      authenticatedScreen: 'profile',
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
            }}
          />
        );
      case 'home':
      default:
        return <HomeScreen onGetStarted={handleGetStarted} />;
    }
  };

  const renderAuthenticatedScreen = () => {
    switch (appState.authenticatedScreen) {
      case 'profile':
      default:
        return <ProfileScreen />;
    }
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.colors.background }]}
      edges={['top', 'bottom']}
    >
      {isAuthenticated ? renderAuthenticatedScreen() : renderUnauthenticatedScreen()}
    </SafeAreaView>
  );
}

/**
 * Root component do app
 * Gerencia o SafeAreaView, tema e autenticação
 */
export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
