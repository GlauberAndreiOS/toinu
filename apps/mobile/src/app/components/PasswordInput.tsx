import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import { useTheme } from '@contexts/ThemeContext';

interface PasswordInputProps extends TextInputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
}

/**
 * Componente de input de senha com botão para mostrar/esconder
 * Suporta temas light e dark automaticamente
 */
export const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  placeholder = 'Sua senha',
  value,
  onChangeText,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const { theme } = useTheme();

  const styles = createPasswordInputStyles(theme);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={styles.inputWrapper}>
        <TextInput
          {...props}
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textSecondary}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={!isVisible}
        />

        <TouchableOpacity
          style={styles.toggleButton}
          onPress={() => setIsVisible(!isVisible)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.toggleIcon}>
            {isVisible ? '👁️' : '👁️‍🗨️'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const createPasswordInputStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      marginBottom: 20,
    },
    label: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: 8,
    },
    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.colors.border,
      paddingRight: 12,
    },
    input: {
      flex: 1,
      padding: 16,
      fontSize: 16,
      color: theme.colors.text,
    },
    toggleButton: {
      padding: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
    toggleIcon: {
      fontSize: 20,
    },
  });

export default PasswordInput;

