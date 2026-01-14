import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { unmask, maskCep } from '../../../../../utils/masks'; // Utilizando suas funções

export function AddressStep({ formData, setFormData, onFinish, onBack }: any) {
  const [loadingCep, setLoadingCep] = useState(false);

  const handleCepChange = async (text: string) => {
    const cleanCep = unmask(text); //

    setFormData({
      ...formData,
      address: { ...formData.address, zipCode: cleanCep },
    });

    if (cleanCep.length === 8) {
      setLoadingCep(true);
      try {
        const response = await fetch(
          `https://viacep.com.br/ws/${cleanCep}/json/`,
        );
        const data = await response.json();

        if (!data.erro) {
          setFormData((prev: any) => ({
            ...prev,
            address: {
              ...prev.address,
              street: data.logradouro,
              neighborhood: data.bairro,
              city: data.localidade,
              state: data.uf,
              zipCode: cleanCep,
            },
          }));
        } else {
          Alert.alert('Erro', 'CEP não encontrado.');
        }
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível buscar o CEP.');
      } finally {
        setLoadingCep(false);
      }
    }
  };

  const updateAddressField = (field: string, value: string) => {
    setFormData({
      ...formData,
      address: { ...formData.address, [field]: value },
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.title}>Onde você mora?</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>CEP</Text>
          <View style={styles.cepInputContainer}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              value={maskCep(formData.address.zipCode)} // Aplica sua nova máscara
              keyboardType="numeric"
              onChangeText={handleCepChange}
              maxLength={9}
              placeholder="00000-000"
            />
            {loadingCep && (
              <ActivityIndicator style={styles.loader} color="#2563EB" />
            )}
          </View>
        </View>

        <View style={styles.row}>
          <View style={[styles.inputGroup, { flex: 3 }]}>
            <Text style={styles.label}>Rua</Text>
            <TextInput
              style={styles.input}
              value={formData.address.street}
              onChangeText={(text) => updateAddressField('street', text)}
              placeholder="Ex: Av. Brasil"
            />
          </View>
          <View style={[styles.inputGroup, { flex: 1, marginLeft: 10 }]}>
            <Text style={styles.label}>Nº</Text>
            <TextInput
              style={styles.input}
              value={formData.address.number}
              onChangeText={(text) => updateAddressField('number', text)}
              keyboardType="numeric"
              placeholder="123"
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Bairro</Text>
          <TextInput
            style={styles.input}
            value={formData.address.neighborhood}
            onChangeText={(text) => updateAddressField('neighborhood', text)}
          />
        </View>

        <View style={styles.row}>
          <View style={[styles.inputGroup, { flex: 2 }]}>
            <Text style={styles.label}>Cidade</Text>
            <TextInput
              style={styles.input}
              value={formData.address.city}
              onChangeText={(text) => updateAddressField('city', text)}
            />
          </View>
          <View style={[styles.inputGroup, { flex: 1, marginLeft: 10 }]}>
            <Text style={styles.label}>UF</Text>
            <TextInput
              style={styles.input}
              value={formData.address.state}
              onChangeText={(text) => updateAddressField('state', text)}
              autoCapitalize="characters"
              maxLength={2}
            />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Text style={styles.backButtonText}>Voltar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.finishButton, loadingCep && styles.buttonDisabled]}
            onPress={onFinish}
            disabled={loadingCep}
          >
            <Text style={styles.finishButtonText}>Finalizar Cadastro</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContent: { paddingBottom: 20 },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#111827',
  },
  inputGroup: { marginBottom: 15 },
  label: { fontSize: 14, fontWeight: '700', color: '#4B5563', marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    color: '#1F2937',
    backgroundColor: '#F9FAFB',
  },
  cepInputContainer: { flexDirection: 'row', alignItems: 'center' },
  loader: { marginLeft: 10 },
  row: { flexDirection: 'row' },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
    marginBottom: 40,
  },
  finishButton: {
    flex: 2,
    backgroundColor: '#059669',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#A7F3D0',
  },
  finishButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  backButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  backButtonText: { color: '#374151', fontSize: 16, fontWeight: '600' },
});
