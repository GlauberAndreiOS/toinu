import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { UserRole } from '@toinu/shared-types';

const { width } = Dimensions.get('window');

interface RoleSelectionStepProps {
  selectedRole: UserRole | null;
  onSelectRole: (role: UserRole) => void;
  theme: any;
}

export const RoleSelectionStep: React.FC<RoleSelectionStepProps> = ({
  selectedRole,
  onSelectRole,
  theme,
}) => {
  return (
    <View style={[styles.container, { width }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>
        Como você quer usar o app?
      </Text>
      <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
        Escolha seu perfil para continuarmos o cadastro
      </Text>

      <View style={styles.rolesContainer}>
        <TouchableOpacity
          style={[
            styles.roleCard,
            {
              backgroundColor: theme.colors.card,
              borderColor: theme.colors.border,
            },
            selectedRole === UserRole.PASSENGER && {
              borderColor: theme.colors.primary,
              borderWidth: 2,
            },
          ]}
          onPress={() => onSelectRole(UserRole.PASSENGER)}
        >
          <View style={[styles.iconContainer, { backgroundColor: '#EEF2FF' }]}>
            <Ionicons name="person" size={32} color={theme.colors.primary} />
          </View>
          <Text style={[styles.roleName, { color: theme.colors.text }]}>
            Passageiro
          </Text>
          <Text
            style={[
              styles.roleDescription,
              { color: theme.colors.textSecondary },
            ]}
          >
            Quero pedir viagens e me locomover com segurança
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.roleCard,
            {
              backgroundColor: theme.colors.card,
              borderColor: theme.colors.border,
            },
            selectedRole === UserRole.DRIVER && {
              borderColor: theme.colors.primary,
              borderWidth: 2,
            },
          ]}
          onPress={() => onSelectRole(UserRole.DRIVER)}
        >
          <View style={[styles.iconContainer, { backgroundColor: '#ECFDF5' }]}>
            <Ionicons name="car" size={32} color="#10B981" />
          </View>
          <Text style={[styles.roleName, { color: theme.colors.text }]}>
            Motorista
          </Text>
          <Text
            style={[
              styles.roleDescription,
              { color: theme.colors.textSecondary },
            ]}
          >
            Quero oferecer viagens e aumentar minha renda
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
  rolesContainer: {
    gap: 16,
  },
  roleCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
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
  roleName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  roleDescription: {
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
});
