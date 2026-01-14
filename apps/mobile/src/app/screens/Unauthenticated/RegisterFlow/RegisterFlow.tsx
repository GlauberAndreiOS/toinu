import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { formatDateToApi } from '../../../../utils/masks';
import { useAuth } from '@contexts/AuthContext';

// Steps
import { AuthStep } from './Steps/AuthInfoStep';
import { PersonalDataStep } from './Steps/PersonalDataStep';
import { AddressStep } from './Steps/AddressStep';

export function RegisterFlow() {
  const { register, updateUser, isAuthenticated, user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    authType: 'email',
    email: '',
    phone: '',
    password: '',
    passwordConfirmation: '',
    fullName: '',
    cpf: '',
    birthDate: '',
    address: {
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
      zipCode: '',
    },
  });

  const handleFinalSubmit = async () => {
    try {
      const formattedDate = formatDateToApi(formData.birthDate);

      // Dados comuns
      const commonData = {
        fullName: formData.fullName,
        cpf: formData.cpf,
        phone: formData.phone,
        birthDate: formattedDate,
        address: formData.address,
      };

      if (isAuthenticated && user) {
        // Usuário já logado (completando cadastro)
        await updateUser({
          ...commonData,
          role: 'PASSENGER', // Força criação de perfil de passageiro
        });
      } else {
        // Novo usuário
        await register(
          formData.email,
          formData.password,
          formData.fullName,
          'PASSENGER',
          commonData // Passa os dados adicionais diretamente
        );
      }

      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
    } catch (error: any) {
      console.error(error);
      Alert.alert('Erro', error.message || 'Falha no cadastro');
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          {currentStep === 1 && (
            <AuthStep
              formData={formData}
              setFormData={setFormData}
              onNext={() => setCurrentStep(2)}
            />
          )}
          {currentStep === 2 && (
            <PersonalDataStep
              formData={formData}
              setFormData={setFormData}
              onNext={() => setCurrentStep(3)}
              onBack={() => setCurrentStep(1)}
            />
          )}
          {currentStep === 3 && (
            <AddressStep
              formData={formData}
              setFormData={setFormData}
              onFinish={handleFinalSubmit}
              onBack={() => setCurrentStep(2)}
            />
          )}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1, padding: 20 },
});
