import React, { useState, useRef, useMemo } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { UserRole } from '@toinu/shared-types';
import { useTheme } from '../../../../contexts/ThemeContext';
import { useAuth } from '../../../../contexts/AuthContext';
import { unmask, formatDateToApi } from '../../../../utils/masks';
import { RoleSelectionStep } from './RoleSelectionStep';
import { BasicInfoStep } from './BasicInfoStep';

const { width } = Dimensions.get('window');

interface PassengerRegisterFlowScreenProps {
  navigation: any;
}

export const PassengerRegisterFlowScreen: React.FC<
  PassengerRegisterFlowScreenProps
> = ({ navigation }) => {
  const { theme } = useTheme();
  const { register, user, updateUser, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const [currentStep, setCurrentStep] = useState(0);

  // Form State
  const [name, setName] = useState(user?.fullName || '');
  const [cpf, setCpf] = useState(user?.passenger?.cpf || '');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');

  // Se o usuário já está autenticado mas sem perfil, ele já passou pelo registro básico.
  // No novo fluxo, o registro básico JÁ cria o usuário e loga.
  // Mas o passageiro ainda precisa preencher CPF e nascimento se não o fez.
  // Atualmente o BasicInfoStep tem tudo isso.

  const steps = useMemo(() => {
    return [{ id: 'basic', component: BasicInfoStep }];
  }, []);

  const handleNext = async () => {
    // Validações por step
    if (currentStep === 0) {
      if (!name || !cpf || !birthDate || !email || !password) {
        Alert.alert('Erro', 'Por favor, preencha todos os campos básicos');
        return;
      }
      if (password.length < 6) {
        Alert.alert('Erro', 'A senha deve ter no mínimo 6 caracteres');
        return;
      }

      // Se ainda não estiver autenticado, cria a conta básica agora
      if (!isAuthenticated) {
        setLoading(true);
        try {
          await register(email, password, name);
        } catch (error: any) {
          Alert.alert('Erro ao criar conta', error.message);
          setLoading(false);
          return;
        }
        setLoading(false);
      }
    }

    if (currentStep < steps.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentStep + 1,
        animated: true,
      });
      setCurrentStep(currentStep + 1);
    } else {
      handleFinalSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      flatListRef.current?.scrollToIndex({
        index: currentStep - 1,
        animated: true,
      });
      setCurrentStep(currentStep - 1);
    } else {
      navigation.goBack();
    }
  };

  const handleFinalSubmit = async () => {
    setLoading(true);
    try {
      const cleanCpf = unmask(cpf);
      const apiBirthDate = formatDateToApi(birthDate);

      const profileData = {
        role: UserRole.PASSENGER,
        fullName: name,
        cpf: cleanCpf,
        birthDate: apiBirthDate,
      };

      await updateUser(profileData);
    } catch (error: any) {
      Alert.alert('Erro ao finalizar cadastro', error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderStep = ({ item }: { item: any }) => {
    const StepComponent = item.component;
    return (
      <StepComponent
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        birthDate={birthDate}
        setBirthDate={setBirthDate}
        cpf={cpf}
        setCpf={setCpf}
        theme={theme}
        isAuthenticated={isAuthenticated}
      />
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      edges={['top', 'bottom']}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <View style={styles.progressContainer}>
            {steps.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.progressDot,
                  {
                    backgroundColor:
                      index <= currentStep
                        ? theme.colors.primary
                        : theme.colors.border,
                  },
                ]}
              />
            ))}
          </View>
        </View>

        <FlatList
          ref={flatListRef}
          data={steps}
          renderItem={renderStep}
          horizontal
          pagingEnabled
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
        />

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.nextButton,
              { backgroundColor: theme.colors.primary },
            ]}
            onPress={handleNext}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <>
                <Text style={styles.nextButtonText}>
                  {currentStep === steps.length - 1 ? 'Concluir' : 'Próximo'}
                </Text>
                <Ionicons name="arrow-forward" size={20} color="#FFF" />
              </>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 56,
  },
  backButton: {
    padding: 8,
  },
  progressContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginRight: 40, // Compensar o botão de voltar
  },
  progressDot: {
    height: 4,
    width: 20,
    borderRadius: 2,
  },
  footer: {
    padding: 24,
  },
  nextButton: {
    height: 56,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
