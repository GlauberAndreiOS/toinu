import React from 'react';
import { StyleSheet } from 'react-native';
import Carousel from './Carousel/Carousel';

interface HomeScreenProps {
  onGetStarted?: () => void;
}

export function HomeScreen({ onGetStarted }: HomeScreenProps) {
  const handleGetStarted = () => {
    // TODO: navegar para a tela de registro/login
    onGetStarted?.();
  };

  return <Carousel onGetStarted={handleGetStarted} />;
}

const styles = StyleSheet.create({});

