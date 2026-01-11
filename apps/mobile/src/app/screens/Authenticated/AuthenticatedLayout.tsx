import React, { useState, useCallback, memo } from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { PassengersHomeScreen } from './Passengers';
import { DriversHomeScreen } from './Drivers';
import { ProfileScreen } from './ProfileScreen';
import { useAuth } from '../../../contexts/AuthContext';

type TabType = 'trips' | 'explore' | 'favorites' | 'profile';

interface TabItem {
  readonly id: TabType;
  readonly label: string;
  readonly icon: React.ComponentProps<typeof Ionicons>['name'];
  readonly activeIcon: React.ComponentProps<typeof Ionicons>['name'];
}

const TABS: readonly TabItem[] = [
  {
    id: 'trips',
    label: 'Viagens',
    icon: 'receipt-outline',
    activeIcon: 'receipt',
  },
  {
    id: 'explore',
    label: 'Explorar',
    icon: 'compass-outline',
    activeIcon: 'compass',
  },
  {
    id: 'favorites',
    label: 'Favoritos',
    icon: 'heart-outline',
    activeIcon: 'heart',
  },
  {
    id: 'profile',
    label: 'Perfil',
    icon: 'person-outline',
    activeIcon: 'person',
  },
];

interface TabButtonProps {
  readonly tab: TabItem;
  readonly isActive: boolean;
  readonly onPress: (tab: TabType) => void;
}

const TabButton = memo(({ tab, isActive, onPress }: TabButtonProps) => (
  <TouchableOpacity
    style={styles.tabButton}
    onPress={() => onPress(tab.id)}
    activeOpacity={0.7}
  >
    <Ionicons
      name={isActive ? tab.activeIcon : tab.icon}
      size={24}
      color={isActive ? '#4F46E5' : '#9CA3AF'}
    />
  </TouchableOpacity>
));

TabButton.displayName = 'TabButton';

interface ScreenProps {
  readonly key: string;
}

const renderScreen = (
  activeTab: TabType,
  onProfilePress: () => void,
  userRole: 'DRIVER' | 'PASSENGER',
): React.ReactNode => {
  switch (activeTab) {
    case 'trips':
      if (userRole === 'DRIVER') {
        return <DriversHomeScreen key="trips" />;
      }
      return (
        <PassengersHomeScreen key="trips" onProfilePress={onProfilePress} />
      );
    case 'explore':
      return (
        <View style={styles.placeholderScreen} key="explore">
          <Ionicons name="compass" size={64} color="#D1D5DB" />
        </View>
      );
    case 'favorites':
      return (
        <View style={styles.placeholderScreen} key="favorites">
          <Ionicons name="heart" size={64} color="#D1D5DB" />
        </View>
      );
    case 'profile':
      return <ProfileScreen key="profile" />;
    default:
      return null;
  }
};

export function AuthenticatedLayout() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('trips');

  const handleTabPress = useCallback((tab: TabType) => {
    setActiveTab(tab);
  }, []);

  const handleProfilePress = useCallback(() => {
    setActiveTab('profile');
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screenContainer}>
        {renderScreen(activeTab, handleProfilePress, user?.role || 'PASSENGER')}
      </View>

      {/* Bottom Tab Bar */}
      <View style={styles.tabBar}>
        {TABS.map((tab) => (
          <TabButton
            key={tab.id}
            tab={tab}
            isActive={activeTab === tab.id}
            onPress={handleTabPress}
          />
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  screenContainer: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    height: Platform.select({
      ios: 80,
      android: 70,
    }),
    paddingBottom: Platform.select({
      ios: 20,
      android: 10,
    }),
    paddingHorizontal: 12,
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 4,
  },
  tabButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: 'transparent',
  },
  placeholderScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
});
