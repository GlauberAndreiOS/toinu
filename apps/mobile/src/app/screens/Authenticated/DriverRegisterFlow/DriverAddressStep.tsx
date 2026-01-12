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

interface DriverAddressStepProps {
  street: string;
  setStreet: (val: string) => void;
  number: string;
  setNumber: (val: string) => void;
  complement: string;
  setComplement: (val: string) => void;
  neighborhood: string;
  setNeighborhood: (val: string) => void;
  city: string;
  setCity: (val: string) => void;
  state: string;
  setState: (val: string) => void;
  zipCode: string;
  setZipCode: (val: string) => void;
  theme: any;
}

export const DriverAddressStep: React.FC<DriverAddressStepProps> = ({
  street,
  setStreet,
  number,
  setNumber,
  complement,
  setComplement,
  neighborhood,
  setNeighborhood,
  city,
  setCity,
  state,
  setState,
  zipCode,
  setZipCode,
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
          Seu Endereço
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
          Precisamos saber onde você atua
        </Text>

        <View style={styles.form}>
          <View style={styles.row}>
            <View style={[styles.inputContainer, { flex: 3 }]}>
              <Text style={labelStyle}>Rua</Text>
              <TextInput
                style={inputStyle}
                placeholder="Nome da rua"
                placeholderTextColor={theme.colors.textSecondary}
                value={street}
                onChangeText={setStreet}
              />
            </View>
            <View style={[styles.inputContainer, { flex: 1 }]}>
              <Text style={labelStyle}>Nº</Text>
              <TextInput
                style={inputStyle}
                placeholder="123"
                placeholderTextColor={theme.colors.textSecondary}
                value={number}
                onChangeText={setNumber}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={labelStyle}>Complemento (Opcional)</Text>
            <TextInput
              style={inputStyle}
              placeholder="Apto, Bloco, etc."
              placeholderTextColor={theme.colors.textSecondary}
              value={complement}
              onChangeText={setComplement}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={labelStyle}>Bairro</Text>
            <TextInput
              style={inputStyle}
              placeholder="Nome do bairro"
              placeholderTextColor={theme.colors.textSecondary}
              value={neighborhood}
              onChangeText={setNeighborhood}
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputContainer, { flex: 2 }]}>
              <Text style={labelStyle}>Cidade</Text>
              <TextInput
                style={inputStyle}
                placeholder="Sua cidade"
                placeholderTextColor={theme.colors.textSecondary}
                value={city}
                onChangeText={setCity}
              />
            </View>
            <View style={[styles.inputContainer, { flex: 1 }]}>
              <Text style={labelStyle}>Estado</Text>
              <TextInput
                style={inputStyle}
                placeholder="UF"
                placeholderTextColor={theme.colors.textSecondary}
                value={state}
                onChangeText={setState}
                autoCapitalize="characters"
                maxLength={2}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={labelStyle}>CEP</Text>
            <TextInput
              style={inputStyle}
              placeholder="00000-000"
              placeholderTextColor={theme.colors.textSecondary}
              value={zipCode}
              onChangeText={setZipCode}
              keyboardType="numeric"
            />
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
