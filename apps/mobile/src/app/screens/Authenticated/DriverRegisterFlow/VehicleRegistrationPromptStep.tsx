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
        Você deseja cadastrar seu veículo agora?
      </Text>

      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={[
            styles.optionCard,
            {
              backgroundColor: theme.colors.card,
              borderColor: theme.colors.border,
            },
            wantToRegisterVehicle === true && {
              borderColor: theme.colors.primary,
              borderWidth: 2,
            },
          ]}
          onPress={() => setWantToRegisterVehicle(true)}
        >
          <View style={[styles.iconContainer, { backgroundColor: '#EEF2FF' }]}>
            <Ionicons name="car" size={32} color={theme.colors.primary} />
          </View>
          <Text style={[styles.optionName, { color: theme.colors.text }]}>
            Sim, cadastrar agora
          </Text>
          <Text
            style={[
              styles.optionDescription,
              { color: theme.colors.textSecondary },
            ]}
          >
            Vou preencher os dados do meu carro para começar a atuar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.optionCard,
            {
              backgroundColor: theme.colors.card,
              borderColor: theme.colors.border,
            },
            wantToRegisterVehicle === false && {
              borderColor: theme.colors.primary,
              borderWidth: 2,
            },
          ]}
          onPress={() => setWantToRegisterVehicle(false)}
        >
          <View style={[styles.iconContainer, { backgroundColor: '#F3F4F6' }]}>
            <Ionicons
              name="time-outline"
              size={32}
              color={theme.colors.textSecondary}
            />
          </View>
          <Text style={[styles.optionName, { color: theme.colors.text }]}>
            Depois
          </Text>
          <Text
            style={[
              styles.optionDescription,
              { color: theme.colors.textSecondary },
            ]}
          >
            Quero finalizar meu cadastro profissional primeiro
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
    borderWidth: 1,
    alignItems: 'center',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  optionName: {
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
