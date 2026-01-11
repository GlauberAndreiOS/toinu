import React from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions } from 'react-native';
import { PasswordInput } from '../../../components/PasswordInput';

const { width } = Dimensions.get('window');

interface BasicInfoStepProps {
  name: string;
  setName: (name: string) => void;
  cpf: string;
  setCpf: (cpf: string) => void;
  birthDate: string;
  setBirthDate: (date: string) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  theme: any;
}

export const BasicInfoStep: React.FC<BasicInfoStepProps> = ({
  name,
  setName,
  cpf,
  setCpf,
  birthDate,
  setBirthDate,
  email,
  setEmail,
  password,
  setPassword,
  theme,
}) => {
  return (
    <View style={[styles.container, { width }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>
        Informações Básicas
      </Text>
      <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
        Precisamos de alguns dados para criar sua conta
      </Text>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: theme.colors.text }]}>
            Nome Completo
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.colors.card,
                color: theme.colors.text,
                borderColor: theme.colors.border,
              },
            ]}
            placeholder="Seu nome completo"
            placeholderTextColor={theme.colors.textSecondary}
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            autoCorrect={false}
          />
        </View>

        <View style={styles.row}>
          <View style={[styles.inputContainer, { flex: 1 }]}>
            <Text style={[styles.label, { color: theme.colors.text }]}>
              CPF
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.colors.card,
                  color: theme.colors.text,
                  borderColor: theme.colors.border,
                },
              ]}
              placeholder="000.000.000-00"
              placeholderTextColor={theme.colors.textSecondary}
              value={cpf}
              onChangeText={setCpf}
              keyboardType="numeric"
            />
          </View>
          <View style={[styles.inputContainer, { flex: 1 }]}>
            <Text style={[styles.label, { color: theme.colors.text }]}>
              Nascimento
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.colors.card,
                  color: theme.colors.text,
                  borderColor: theme.colors.border,
                },
              ]}
              placeholder="DD/MM/AAAA"
              placeholderTextColor={theme.colors.textSecondary}
              value={birthDate}
              onChangeText={setBirthDate}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: theme.colors.text }]}>
            Email
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.colors.card,
                color: theme.colors.text,
                borderColor: theme.colors.border,
              },
            ]}
            placeholder="seu@email.com"
            placeholderTextColor={theme.colors.textSecondary}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: theme.colors.text }]}>
            Senha
          </Text>
          <PasswordInput
            placeholder="Mínimo 6 caracteres"
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
    textAlign: 'center',
  },
  form: {
    gap: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  inputContainer: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
  input: {
    height: 52,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
  },
});
