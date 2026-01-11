import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';

const { width } = Dimensions.get('window');

interface DriverPersonalInfoStepProps {
  phone: string;
  setPhone: (val: string) => void;
  emailContact: string;
  setEmailContact: (val: string) => void;
  cnh: string;
  setCnh: (val: string) => void;
  cnhExpiration: string;
  setCnhExpiration: (val: string) => void;
  theme: any;
}

export const DriverPersonalInfoStep: React.FC<DriverPersonalInfoStepProps> = ({
  phone,
  setPhone,
  emailContact,
  setEmailContact,
  cnh,
  setCnh,
  cnhExpiration,
  setCnhExpiration,
  theme,
}) => {
  const inputStyle = [
    styles.input,
    {
      backgroundColor: theme.colors.card,
      color: theme.colors.text,
      borderColor: theme.colors.border,
    },
  ];

  const labelStyle = [styles.label, { color: theme.colors.text }];

  return (
    <View style={{ width, flex: 1 }}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Informações Profissionais
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
          Dados adicionais para seu perfil de motorista
        </Text>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={labelStyle}>Telefone de Contato</Text>
            <TextInput
              style={inputStyle}
              placeholder="(00) 00000-0000"
              placeholderTextColor={theme.colors.textSecondary}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={labelStyle}>Email de Contato</Text>
            <TextInput
              style={inputStyle}
              placeholder="email@contato.com"
              placeholderTextColor={theme.colors.textSecondary}
              value={emailContact}
              onChangeText={setEmailContact}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputContainer, { flex: 1 }]}>
              <Text style={labelStyle}>CNH</Text>
              <TextInput
                style={inputStyle}
                placeholder="Nº Registro"
                placeholderTextColor={theme.colors.textSecondary}
                value={cnh}
                onChangeText={setCnh}
                keyboardType="numeric"
              />
            </View>
            <View style={[styles.inputContainer, { flex: 1 }]}>
              <Text style={labelStyle}>Validade CNH</Text>
              <TextInput
                style={inputStyle}
                placeholder="DD/MM/AAAA"
                placeholderTextColor={theme.colors.textSecondary}
                value={cnhExpiration}
                onChangeText={setCnhExpiration}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: 'center',
  },
  form: {
    gap: 16,
  },
  inputContainer: {
    gap: 8,
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
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
