import React, { useRef, useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextStyle,
  StyleProp,
  Image,
  ImageSourcePropType,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../../../contexts/ThemeContext';
import { useAuth } from '../../../../contexts/AuthContext';

const { width } = Dimensions.get('window');

interface Slide {
  key: string;
  title: string;
  description: string;
  justified?: boolean;
  image: ImageSourcePropType;
}

const slides: Slide[] = [
  {
    key: '1',
    title: 'Liberdade para escolher o profissional!',
    description:
      'Aqui você vai ver uma lista de profissionais, escolha o que é mais adequado pra você, preço, segurança, atendimento ou até mesmo escolha o seu favorito!',
    justified: true,
    image: require('../../../../../assets/images/icon.png'),
  },
  {
    key: '2',
    title: 'Acompanhe em tempo real',
    description: 'Veja a localização do motorista e o trajeto no mapa.',
    image: require('../../../../../assets/images/adaptive-icon.png'),
  },
  {
    key: '3',
    title: 'Pague de forma segura',
    description: 'Cartão, PIX ou dinheiro — escolha a opção que preferir.',
    image: require('../../../../../assets/images/splash-icon.png'),
  },
];

interface Props {
  onGetStarted?: () => void;
}

export default function Carousel({ onGetStarted }: Props) {
  const { theme } = useTheme();
  const { markCarouselAsSeen } = useAuth();
  const listRef = useRef<FlatList<Slide> | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const dynamicStyles = useMemo(() => createDynamicStyles(theme), [theme]);

  const handleNext = async () => {
    if (currentIndex < slides.length - 1) {
      listRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
      setCurrentIndex(currentIndex + 1);
    } else {
      // Marca carrossel como visto e navega para login
      await markCarouselAsSeen();
      onGetStarted?.();
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      listRef.current?.scrollToIndex({
        index: currentIndex - 1,
        animated: true,
      });
      setCurrentIndex(currentIndex - 1);
    }
  };

  const isLastSlide = currentIndex === slides.length - 1;
  const isFirstSlide = currentIndex === 0;

  return (
    <SafeAreaView style={dynamicStyles.container} edges={['top', 'bottom']}>
      <FlatList
        ref={listRef}
        data={slides}
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.key}
        onMomentumScrollEnd={(e) => {
          const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentIndex(newIndex);
        }}
        renderItem={({ item }) => (
          <View style={[dynamicStyles.slide, { width }]}>
            <Image
              source={item.image}
              style={dynamicStyles.image}
              resizeMode="contain"
            />
            <Text style={dynamicStyles.title}>{item.title}</Text>
            <Text
              style={
                [
                  dynamicStyles.description,
                  item.justified
                    ? ({ textAlign: 'justify' } as TextStyle)
                    : null,
                ] as StyleProp<TextStyle>
              }
            >
              {item.description}
            </Text>
          </View>
        )}
      />

      <View style={dynamicStyles.dotsContainer}>
        {slides.map((_, i) => (
          <View
            key={i}
            style={[
              dynamicStyles.dot,
              i === currentIndex ? dynamicStyles.activeDot : undefined,
            ]}
          />
        ))}
      </View>

      <View style={dynamicStyles.buttonContainer}>
        <TouchableOpacity
          style={[
            dynamicStyles.button,
            dynamicStyles.prevButton,
            isFirstSlide && dynamicStyles.buttonDisabled,
          ]}
          onPress={handlePrevious}
          disabled={isFirstSlide}
        >
          <Text
            style={[
              dynamicStyles.prevButtonText,
              isFirstSlide && dynamicStyles.buttonTextDisabled,
            ]}
          >
            Anterior
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[dynamicStyles.button, dynamicStyles.nextButton]}
          onPress={handleNext}
        >
          <Text style={dynamicStyles.nextButtonText}>
            {isLastSlide ? 'Começar' : 'Próximo'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const createDynamicStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 24,
    },
    slide: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 24,
    },
    image: {
      width: 200,
      height: 200,
      marginBottom: 48,
    },
    title: {
      fontSize: 26,
      fontWeight: '700',
      textAlign: 'center',
      marginBottom: 16,
      color: theme.colors.text,
    },
    description: {
      fontSize: 16,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      paddingHorizontal: 12,
      lineHeight: 24,
    },
    dotsContainer: {
      flexDirection: 'row',
      marginVertical: 32,
      alignItems: 'center',
      justifyContent: 'center',
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: theme.colors.border,
      marginHorizontal: 6,
    },
    activeDot: {
      backgroundColor: theme.colors.primary,
      width: 28,
      borderRadius: 4,
    },
    buttonContainer: {
      flexDirection: 'row',
      width: '100%',
      paddingHorizontal: 24,
      gap: 12,
    },
    button: {
      flex: 1,
      paddingVertical: 14,
      paddingHorizontal: 24,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    prevButton: {
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    nextButton: {
      backgroundColor: theme.colors.primary,
    },
    buttonDisabled: {
      opacity: 0.5,
    },
    prevButtonText: {
      color: theme.colors.text,
      fontWeight: '600',
      fontSize: 16,
    },
    nextButtonText: {
      color: theme.mode === 'light' ? theme.colors.background : '#0f172a',
      fontWeight: '600',
      fontSize: 16,
    },
    buttonTextDisabled: {
      color: theme.colors.textSecondary,
    },
  });
