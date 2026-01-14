import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { maskCpf, maskDate, unmask } from '../../../../../utils/masks'; // Suas funções

export function PersonalDataStep({
  formData,
  setFormData,
  onNext,
  onBack,
}: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dados Pessoais</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Nome Completo</Text>
        <TextInput
          style={styles.input}
          value={formData.fullName}
          onChangeText={(text) => setFormData({ ...formData, fullName: text })}
          placeholder="Digite seu nome"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>CPF</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          maxLength={14}
          value={maskCpf(formData.cpf)} // Aplica sua máscara
          onChangeText={(text) =>
            setFormData({ ...formData, cpf: unmask(text) })
          } // Salva limpo
          placeholder="000.000.000-00"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Data de Nascimento</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          maxLength={10}
          value={maskDate(formData.birthDate)} // Aplica sua máscara
          onChangeText={(text) => setFormData({ ...formData, birthDate: text })}
          placeholder="DD/MM/AAAA"
        />
      </View>

      <View style={styles.row}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text>Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={onNext}>
          <Text style={styles.nextText}>Próximo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  inputGroup: { marginBottom: 15 },
  label: { fontSize: 14, color: '#666', marginBottom: 5 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 12, borderRadius: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  backButton: { padding: 15 },
  nextButton: {
    backgroundColor: '#2563EB',
    padding: 15,
    borderRadius: 8,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  nextText: { color: '#fff', fontWeight: 'bold' },
});
