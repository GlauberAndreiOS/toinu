import React, { useState, useMemo } from 'react';
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
import { useAuth } from '@contexts/AuthContext';
import { useTheme } from '@contexts/ThemeContext';
import { PasswordInput } from '@app/components';

interface RegisterScreenProps {
  navigation: any;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const { theme } = useTheme();

  const dynamicStyles = useMemo(
    () => createRegisterStyles(theme),
    [theme]
  );

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Erro', 'A senha deve ter no mínimo 6 caracteres');
      return;
    }

    setLoading(true);
    try {
      await register(email, password, name);
      // Navegação será gerenciada pelo App baseado no estado de autenticação
    } catch (error: any) {
      Alert.alert('Erro ao registrar', error.message);
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
          <Text style={dynamicStyles.title}>Criar conta</Text>
          <Text style={dynamicStyles.subtitle}>Preencha os dados para se cadastrar</Text>

          <View style={dynamicStyles.form}>
            <View style={dynamicStyles.inputContainer}>
              <Text style={dynamicStyles.label}>Nome</Text>
              <TextInput
                style={dynamicStyles.input}
                placeholder="Seu nome completo"
                placeholderTextColor={theme.colors.textSecondary}
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                autoCorrect={false}
              />
            </View>

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
                placeholder="Mínimo 6 caracteres"
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={dynamicStyles.inputContainer}>
              <Text style={dynamicStyles.label}>Confirmar Senha</Text>
              <PasswordInput
                placeholder="Digite a senha novamente"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <TouchableOpacity
              style={[dynamicStyles.button, loading && dynamicStyles.buttonDisabled]}
              onPress={handleRegister}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={dynamicStyles.buttonText}>Cadastrar</Text>
              )}
            </TouchableOpacity>

            <View style={dynamicStyles.loginContainer}>
              <Text style={dynamicStyles.loginText}>Já tem uma conta? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={dynamicStyles.loginLink}>Faça login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const createRegisterStyles = (theme: any) =>
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
    loginContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 24,
    },
    loginText: {
      color: theme.colors.textSecondary,
      fontSize: 14,
    },
    loginLink: {
      color: '#007AFF',
      fontSize: 14,
      fontWeight: '600',
    },
  });

