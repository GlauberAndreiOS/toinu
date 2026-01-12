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
import { DriverPersonalInfoStep } from './DriverPersonalInfoStep';
import { DriverAddressStep } from './DriverAddressStep';
import { VehicleRegistrationPromptStep } from './VehicleRegistrationPromptStep';
import { VehicleRegistrationStep } from './VehicleRegistrationStep';

const { width } = Dimensions.get('window');

interface DriverRegisterFlowScreenProps {
  onCancel: () => void;
  onSuccess: () => void;
}

export const DriverRegisterFlowScreen: React.FC<
  DriverRegisterFlowScreenProps
> = ({ onCancel, onSuccess }) => {
  const { theme } = useTheme();
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const [currentStep, setCurrentStep] = useState(0);

  // Driver Personal Info
  const [phone, setPhone] = useState(user?.driver?.phoneContact || '');
  const [emailContact, setEmailContact] = useState(
    user?.driver?.emailContact || '',
  );
  const [cnh, setCnh] = useState(user?.driver?.cnh || '');
  const [cnhExpiration, setCnhExpiration] = useState('');

  // Address
  const [street, setStreet] = useState(
    (user?.driver?.address as any)?.street || '',
  );
  const [number, setNumber] = useState(
    (user?.driver?.address as any)?.number || '',
  );
  const [complement, setComplement] = useState(
    (user?.driver?.address as any)?.complement || '',
  );
  const [neighborhood, setNeighborhood] = useState(
    (user?.driver?.address as any)?.neighborhood || '',
  );
  const [city, setCity] = useState((user?.driver?.address as any)?.city || '');
  const [state, setState] = useState(
    (user?.driver?.address as any)?.state || '',
  );
  const [zipCode, setZipCode] = useState(
    (user?.driver?.address as any)?.zipCode || '',
  );

  // Vehicle Logic
  const [wantToRegisterVehicle, setWantToRegisterVehicle] = useState<
    boolean | null
  >(null);
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [yearOfManufacture, setYearOfManufacture] = useState('');
  const [yearOfModel, setYearOfModel] = useState('');
  const [renavam, setRenavam] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [color, setColor] = useState('');

  const steps = useMemo(() => {
    const baseSteps = [
      { id: 'driver_personal', component: DriverPersonalInfoStep },
      { id: 'driver_address', component: DriverAddressStep },
      { id: 'vehicle_prompt', component: VehicleRegistrationPromptStep },
    ];

    if (wantToRegisterVehicle === true) {
      baseSteps.push({
        id: 'vehicle_info',
        component: VehicleRegistrationStep,
      });
    }

    return baseSteps;
  }, [wantToRegisterVehicle]);

  const handleNext = async () => {
    // Step 0: Professional/Personal Info
    if (currentStep === 0) {
      if (!phone || !emailContact || !cnh || !cnhExpiration) {
        Alert.alert('Erro', 'Por favor, preencha todos os dados profissionais');
        return;
      }
    }

    // Step 1: Address
    if (currentStep === 1) {
      if (!street || !number || !neighborhood || !city || !state || !zipCode) {
        Alert.alert('Erro', 'Por favor, preencha o endereço completo');
        return;
      }
    }

    // Step 2: Vehicle Prompt
    if (currentStep === 2 && wantToRegisterVehicle === null) {
      Alert.alert('Erro', 'Por favor, escolha uma opção');
      return;
    }

    // Step 3: Vehicle Info (if applicable)
    if (currentStep === 3 && wantToRegisterVehicle === true) {
      if (
        !brand ||
        !model ||
        !yearOfManufacture ||
        !yearOfModel ||
        !licensePlate ||
        !color ||
        !renavam
      ) {
        Alert.alert('Erro', 'Por favor, preencha todos os dados do veículo');
        return;
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
      onCancel();
    }
  };

  const handleFinalSubmit = async () => {
    setLoading(true);
    try {
      const profileData = {
        role: UserRole.DRIVER,
        fullName: user?.fullName,
        birthDate: user?.passenger?.birthDate || user?.driver?.birthDate,
        cpf: user?.passenger?.cpf || user?.driver?.cpf,
        phone: unmask(phone),
        emailContact: emailContact,
        cnh,
        cnhExpiration: formatDateToApi(cnhExpiration),
        address: {
          street,
          number,
          complement,
          neighborhood,
          city,
          state,
          zipCode,
        },
        vehicle: wantToRegisterVehicle
          ? {
              brand,
              model,
              yearOfManufacture: parseInt(yearOfManufacture),
              yearOfModel: parseInt(yearOfModel),
              renavam,
              licensePlate,
              color,
            }
          : undefined,
      };

      await updateUser(profileData);

      if (!wantToRegisterVehicle) {
        Alert.alert(
          'Registro Concluído',
          'Seu cadastro de motorista foi recebido e está aguardando aprovação. Você poderá cadastrar seu veículo mais tarde no perfil.',
          [{ text: 'OK', onPress: onSuccess }],
        );
      } else {
        onSuccess();
      }
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
        phone={phone}
        setPhone={setPhone}
        emailContact={emailContact}
        setEmailContact={setEmailContact}
        cnh={cnh}
        setCnh={setCnh}
        cnhExpiration={cnhExpiration}
        setCnhExpiration={setCnhExpiration}
        street={street}
        setStreet={setStreet}
        number={number}
        setNumber={setNumber}
        complement={complement}
        setComplement={setComplement}
        neighborhood={neighborhood}
        setNeighborhood={setNeighborhood}
        city={city}
        setCity={setCity}
        state={state}
        setState={setState}
        zipCode={zipCode}
        setZipCode={setZipCode}
        wantToRegisterVehicle={wantToRegisterVehicle}
        setWantToRegisterVehicle={setWantToRegisterVehicle}
        brand={brand}
        setBrand={setBrand}
        model={model}
        setModel={setModel}
        yearOfManufacture={yearOfManufacture}
        setYearOfManufacture={setYearOfManufacture}
        yearOfModel={yearOfModel}
        setYearOfModel={setYearOfModel}
        renavam={renavam}
        setRenavam={setRenavam}
        licensePlate={licensePlate}
        setLicensePlate={setLicensePlate}
        color={color}
        setColor={setColor}
        theme={theme}
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
