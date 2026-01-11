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

interface VehicleRegistrationStepProps {
  brand: string;
  setBrand: (val: string) => void;
  model: string;
  setModel: (val: string) => void;
  yearOfManufacture: string;
  setYearOfManufacture: (val: string) => void;
  yearOfModel: string;
  setYearOfModel: (val: string) => void;
  renavam: string;
  setRenavam: (val: string) => void;
  licensePlate: string;
  setLicensePlate: (val: string) => void;
  color: string;
  setColor: (val: string) => void;
  theme: any;
}

export const VehicleRegistrationStep: React.FC<
  VehicleRegistrationStepProps
> = ({
  brand,
  setBrand,
  model,
  setModel,
  yearOfManufacture,
  setYearOfManufacture,
  yearOfModel,
  setYearOfModel,
  renavam,
  setRenavam,
  licensePlate,
  setLicensePlate,
  color,
  setColor,
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
          Dados do Veículo
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
          Quase lá! Agora os dados do seu carro
        </Text>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={labelStyle}>Marca</Text>
            <TextInput
              style={inputStyle}
              placeholder="Ex: Volkswagen, Ford..."
              placeholderTextColor={theme.colors.textSecondary}
              value={brand}
              onChangeText={setBrand}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={labelStyle}>Modelo</Text>
            <TextInput
              style={inputStyle}
              placeholder="Ex: Gol, Fiesta..."
              placeholderTextColor={theme.colors.textSecondary}
              value={model}
              onChangeText={setModel}
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputContainer, { flex: 1 }]}>
              <Text style={labelStyle}>Ano Fabricação</Text>
              <TextInput
                style={inputStyle}
                placeholder="2020"
                placeholderTextColor={theme.colors.textSecondary}
                value={yearOfManufacture}
                onChangeText={setYearOfManufacture}
                keyboardType="numeric"
              />
            </View>
            <View style={[styles.inputContainer, { flex: 1 }]}>
              <Text style={labelStyle}>Ano Modelo</Text>
              <TextInput
                style={inputStyle}
                placeholder="2021"
                placeholderTextColor={theme.colors.textSecondary}
                value={yearOfModel}
                onChangeText={setYearOfModel}
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={labelStyle}>Placa</Text>
            <TextInput
              style={inputStyle}
              placeholder="ABC1D23"
              placeholderTextColor={theme.colors.textSecondary}
              value={licensePlate}
              onChangeText={setLicensePlate}
              autoCapitalize="characters"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={labelStyle}>Cor</Text>
            <TextInput
              style={inputStyle}
              placeholder="Ex: Preto, Branco..."
              placeholderTextColor={theme.colors.textSecondary}
              value={color}
              onChangeText={setColor}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={labelStyle}>Renavam</Text>
            <TextInput
              style={inputStyle}
              placeholder="00000000000"
              placeholderTextColor={theme.colors.textSecondary}
              value={renavam}
              onChangeText={setRenavam}
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
