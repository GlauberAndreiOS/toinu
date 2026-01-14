import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { maskPhone, unmask } from '../../../../../utils/masks'; // Utilizando suas funções

export function AuthStep({ formData, setFormData, onNext }: any) {
  const handleAuthTypeChange = (type: 'email' | 'phone') => {
    setFormData((prev: any) => ({
      ...prev,
      authType: type,
      // Limpa os campos ao trocar para evitar envio de dados cruzados
      email: '',
      phone: '',
    }));
  };

  const handleSubmit = () => {
    if (formData.authType === 'email' && !formData.email.includes('@')) {
      Alert.alert('Erro', 'Insira um e-mail válido.');
      return;
    }

    if (formData.authType === 'phone' && formData.phone.length < 10) {
      Alert.alert('Erro', 'Insira um telefone válido.');
      return;
    }

    if (formData.password.length < 6) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    if (formData.password !== formData.passwordConfirmation) {
      Alert.alert('Erro', 'As senhas não coincidem!');
      return;
    }
    onNext();
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
        <Text style={styles.title}>Como você quer entrar?</Text>

        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              formData.authType === 'email' && styles.activeToggle,
            ]}
            onPress={() => handleAuthTypeChange('email')}
          >
            <Text
              style={[
                styles.toggleText,
                formData.authType === 'email' && styles.activeToggleText,
              ]}
            >
              E-mail
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.toggleButton,
              formData.authType === 'phone' && styles.activeToggle,
            ]}
            onPress={() => handleAuthTypeChange('phone')}
          >
            <Text
              style={[
                styles.toggleText,
                formData.authType === 'phone' && styles.activeToggleText,
              ]}
            >
              Telefone
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            {formData.authType === 'email' ? 'Seu E-mail' : 'Seu Telefone'}
          </Text>
          <TextInput
            style={styles.input}
            placeholder={
              formData.authType === 'email'
                ? 'exemplo@email.com'
                : '(00) 00000-0000'
            }
            keyboardType={
              formData.authType === 'email' ? 'email-address' : 'phone-pad'
            }
            autoCapitalize="none"
            autoCorrect={false}
            // Aplica máscara visual de telefone se for o caso
            value={
              formData.authType === 'email'
                ? formData.email
                : maskPhone(formData.phone)
            }
            onChangeText={(text) => {
              const value = formData.authType === 'phone' ? unmask(text) : text;
              setFormData({ ...formData, [formData.authType]: value });
            }}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            secureTextEntry
            value={formData.password}
            onChangeText={(text) =>
              setFormData({ ...formData, password: text })
            }
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Confirme a Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            secureTextEntry
            value={formData.passwordConfirmation}
            onChangeText={(text) =>
              setFormData({ ...formData, passwordConfirmation: text })
            }
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Próximo passo</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContent: { paddingBottom: 40 },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#111827',
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 10,
  },
  activeToggle: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  toggleText: { color: '#6B7280', fontWeight: '600', fontSize: 15 },
  activeToggleText: { color: '#2563EB' },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '700', color: '#4B5563', marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    color: '#1F2937',
    backgroundColor: '#F9FAFB',
  },
  button: {
    backgroundColor: '#2563EB',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
