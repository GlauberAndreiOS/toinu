import React, { useState, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Checkbox } from 'expo-checkbox';
import { useAuth } from '@contexts/AuthContext';
import { useTheme } from '@contexts/ThemeContext';
import { PasswordInput } from '@app/components';

interface LoginScreenProps {
  navigation: any;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { login, savedEmail } = useAuth();
  const { theme } = useTheme();

  // Carrega email salvo ao montar o componente
  useEffect(() => {
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, [savedEmail]);

  const dynamicStyles = useMemo(
    () => createLoginStyles(theme),
    [theme]
  );

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    setLoading(true);
    try {
      await login(email, password, rememberMe);
      // Navegação será gerenciada pelo App baseado no estado de autenticação
    } catch (error: any) {
      Alert.alert('Erro ao fazer login', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={dynamicStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={dynamicStyles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={dynamicStyles.content}>
          <Text style={dynamicStyles.title}>Bem-vindo de volta!</Text>
          <Text style={dynamicStyles.subtitle}>Faça login para continuar</Text>

          <View style={dynamicStyles.form}>
            <View style={dynamicStyles.inputContainer}>
              <Text style={dynamicStyles.label}>Email</Text>
              <TextInput
                style={dynamicStyles.input}
                placeholder="seu@email.com"
                placeholderTextColor={theme.colors.textSecondary}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={dynamicStyles.inputContainer}>
              <Text style={dynamicStyles.label}>Senha</Text>
              <PasswordInput
                placeholder="Sua senha"
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={dynamicStyles.rememberMeContainer}>
              <Checkbox
                value={rememberMe}
                onValueChange={setRememberMe}
                color={theme.colors.primary}
              />
              <Text style={dynamicStyles.rememberMeText}>Lembrar-me</Text>
            </View>

            <TouchableOpacity
              style={[dynamicStyles.button, loading && dynamicStyles.buttonDisabled]}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={dynamicStyles.buttonText}>Entrar</Text>
              )}
            </TouchableOpacity>

            <View style={dynamicStyles.registerContainer}>
              <Text style={dynamicStyles.registerText}>Não tem uma conta? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={dynamicStyles.registerLink}>Cadastre-se</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const createLoginStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollContent: {
      flexGrow: 1,
    },
    content: {
      flex: 1,
      padding: 24,
      justifyContent: 'center',
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: 8,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 16,
      color: theme.colors.textSecondary,
      marginBottom: 32,
      textAlign: 'center',
    },
    form: {
      width: '100%',
    },
    inputContainer: {
      marginBottom: 20,
    },
    label: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: 8,
    },
    input: {
      backgroundColor: theme.colors.surface,
      borderRadius: 12,
      padding: 16,
      fontSize: 16,
      borderWidth: 1,
      borderColor: theme.colors.border,
      color: theme.colors.text,
    },
    rememberMeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    rememberMeText: {
      color: theme.colors.text,
      fontSize: 14,
      marginLeft: 8,
    },
    button: {
      backgroundColor: '#007AFF',
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
      marginTop: 8,
    },
    buttonDisabled: {
      opacity: 0.6,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
    registerContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 24,
    },
    registerText: {
      color: theme.colors.textSecondary,
      fontSize: 14,
    },
    registerLink: {
      color: '#007AFF',
      fontSize: 14,
      fontWeight: '600',
    },
  });

