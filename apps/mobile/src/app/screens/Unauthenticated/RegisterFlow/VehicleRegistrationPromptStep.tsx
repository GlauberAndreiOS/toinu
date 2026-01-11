import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface VehicleRegistrationPromptStepProps {
  wantToRegisterVehicle: boolean | null;
  setWantToRegisterVehicle: (val: boolean) => void;
  theme: any;
}

export const VehicleRegistrationPromptStep: React.FC<
  VehicleRegistrationPromptStepProps
> = ({ wantToRegisterVehicle, setWantToRegisterVehicle, theme }) => {
  return (
    <View style={[styles.container, { width }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>Veículo</Text>
      <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
        Deseja cadastrar um veículo agora para começar a dirigir?
      </Text>

      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={[
            styles.optionCard,
            {
              backgroundColor: theme.colors.card,
              borderColor:
                wantToRegisterVehicle === true
                  ? theme.colors.primary
                  : theme.colors.border,
              borderWidth: wantToRegisterVehicle === true ? 2 : 1,
            },
          ]}
          onPress={() => setWantToRegisterVehicle(true)}
        >
          <View style={[styles.iconContainer, { backgroundColor: '#ECFDF5' }]}>
            <Ionicons name="car" size={32} color="#10B981" />
          </View>
          <Text style={[styles.optionTitle, { color: theme.colors.text }]}>
            Sim, cadastrar agora
          </Text>
          <Text
            style={[
              styles.optionDescription,
              { color: theme.colors.textSecondary },
            ]}
          >
            Vou preencher os dados do meu carro agora mesmo
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.optionCard,
            {
              backgroundColor: theme.colors.card,
              borderColor:
                wantToRegisterVehicle === false
                  ? theme.colors.primary
                  : theme.colors.border,
              borderWidth: wantToRegisterVehicle === false ? 2 : 1,
            },
          ]}
          onPress={() => setWantToRegisterVehicle(false)}
        >
          <View style={[styles.iconContainer, { backgroundColor: '#F3F4F6' }]}>
            <Ionicons name="time" size={32} color="#6B7280" />
          </View>
          <Text style={[styles.optionTitle, { color: theme.colors.text }]}>
            Depois
          </Text>
          <Text
            style={[
              styles.optionDescription,
              { color: theme.colors.textSecondary },
            ]}
          >
            Quero finalizar meu cadastro e cadastrar o carro mais tarde
          </Text>
        </TouchableOpacity>
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
  optionsContainer: {
    gap: 16,
  },
  optionCard: {
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
});
