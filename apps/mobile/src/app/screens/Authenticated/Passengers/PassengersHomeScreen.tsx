import React, { useState, useCallback, useMemo, memo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  type GestureResponderEvent,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

interface Trip {
  readonly id: number;
  readonly type: 'bus' | 'train' | 'bike';
  readonly from: string;
  readonly to: string;
  readonly date: string;
  readonly time: string;
  readonly duration: string;
  readonly price: string;
  readonly icon: React.ComponentProps<typeof Ionicons>['name'];
  readonly color: string;
}

interface TripCardProps {
  readonly trip: Trip;
}

const TripCard = memo(({ trip }: TripCardProps) => (
  <TouchableOpacity style={styles.tripCard}>
    <View style={styles.tripContent}>
      <View style={[styles.tripIcon, { backgroundColor: trip.color }]}>
        <Ionicons name={trip.icon} size={24} color="#FFFFFF" />
      </View>

      <View style={styles.tripDetails}>
        <View style={styles.tripRoute}>
          <View style={styles.locationRow}>
            <Ionicons name="ellipse" size={12} color="#9CA3AF" />
            <Text style={styles.locationText} numberOfLines={1}>
              {trip.from}
            </Text>
          </View>
          <View style={styles.locationRow}>
            <Ionicons name="location" size={12} color="#4F46E5" />
            <Text style={styles.locationText} numberOfLines={1}>
              {trip.to}
            </Text>
          </View>
        </View>

        <View style={styles.tripMeta}>
          <View style={styles.metaItem}>
            <Ionicons name="calendar-outline" size={14} color="#6B7280" />
            <Text style={styles.metaText}>{trip.date}</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={14} color="#6B7280" />
            <Text style={styles.metaText}>{trip.time}</Text>
          </View>
          <Text style={styles.priceText}>{trip.price}</Text>
        </View>
      </View>

      <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
    </View>
  </TouchableOpacity>
));

TripCard.displayName = 'TripCard';

interface PassengersHomeScreenProps {
  readonly onProfilePress?: () => void;
}

export function PassengersHomeScreen({
  onProfilePress,
}: PassengersHomeScreenProps) {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const upcomingTrips = useMemo(
    (): readonly Trip[] => [
      {
        id: 1,
        type: 'bus',
        from: 'Estação Centro',
        to: 'Terminal do Aeroporto 2',
        date: 'Hoje',
        time: '14:30',
        duration: '45 min',
        price: 'R$ 12,50',
        icon: 'bus-outline',
        color: '#3B82F6',
      },
      {
        id: 2,
        type: 'train',
        from: 'Estação Central',
        to: 'Zona Oeste',
        date: 'Amanhã',
        time: '09:00',
        duration: '25 min',
        price: 'R$ 8,00',
        icon: 'train-outline',
        color: '#10B981',
      },
      {
        id: 3,
        type: 'bike',
        from: 'Avenida do Parque',
        to: 'Centro da Cidade',
        date: '5 de jan',
        time: '11:00',
        duration: '15 min',
        price: 'R$ 3,00',
        icon: 'bicycle-outline',
        color: '#8B5CF6',
      },
    ],
    [],
  );

  const pastTrips = useMemo(
    (): readonly Trip[] => [
      {
        id: 4,
        type: 'bus',
        from: 'Casa',
        to: 'Escritório',
        date: 'Ontem',
        time: '08:30',
        duration: '30 min',
        price: 'R$ 10,00',
        icon: 'bus-outline',
        color: '#3B82F6',
      },
      {
        id: 5,
        type: 'train',
        from: 'Shopping',
        to: 'Centro',
        date: '1 de jan',
        time: '17:00',
        duration: '20 min',
        price: 'R$ 7,50',
        icon: 'train-outline',
        color: '#10B981',
      },
    ],
    [],
  );

  const trips = useMemo(
    () => (activeTab === 'upcoming' ? upcomingTrips : pastTrips),
    [activeTab, upcomingTrips, pastTrips],
  );

  const handleTabChange = useCallback((tab: 'upcoming' | 'past') => {
    setActiveTab(tab);
  }, []);

  const handleProfilePress = useCallback(() => {
    onProfilePress?.();
  }, [onProfilePress]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.greeting}>Bem-vindo de volta,</Text>
            <Text style={styles.userName}>Sarah Johnson</Text>
          </View>
          <View style={styles.headerButtons}>
            <TouchableOpacity style={styles.headerButton}>
              <Ionicons name="settings-outline" size={20} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={handleProfilePress}
            >
              <Ionicons name="person-outline" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.searchCard}>
          <View style={styles.searchInputContainer}>
            <Ionicons name="navigate-outline" size={20} color="#4F46E5" />
            <TextInput
              style={styles.searchInput}
              placeholder="Para onde você quer ir?"
              placeholderTextColor="#9CA3AF"
            />
          </View>
          <View style={styles.transportButtons}>
            <TouchableOpacity style={styles.transportButton}>
              <Ionicons name="bus-outline" size={16} color="#4F46E5" />
              <Text style={styles.transportButtonText}>Ônibus</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.transportButton}>
              <Ionicons name="train-outline" size={16} color="#4F46E5" />
              <Text style={styles.transportButtonText}>Trem</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.transportButton}>
              <Ionicons name="bicycle-outline" size={16} color="#4F46E5" />
              <Text style={styles.transportButtonText}>Bike</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => handleTabChange('upcoming')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'upcoming' && styles.activeTabText,
            ]}
          >
            Próximas
          </Text>
          {activeTab === 'upcoming' && (
            <View style={styles.activeTabIndicator} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => handleTabChange('past')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'past' && styles.activeTabText,
            ]}
          >
            Passadas
          </Text>
          {activeTab === 'past' && <View style={styles.activeTabIndicator} />}
        </TouchableOpacity>
      </View>

      {/* Trip List */}
      <ScrollView
        style={styles.tripList}
        contentContainerStyle={styles.tripListContent}
      >
        {trips.map((trip) => (
          <TripCard key={trip.id} trip={trip} />
        ))}
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab}>
        <Ionicons name="navigate" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#4F46E5',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  greeting: {
    fontSize: 14,
    color: '#C7D2FE',
    marginBottom: 4,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
  },
  transportButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  transportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#EEF2FF',
    borderRadius: 8,
    gap: 8,
  },
  transportButtonText: {
    fontSize: 14,
    color: '#4F46E5',
    fontWeight: '600',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingHorizontal: 24,
  },
  tab: {
    paddingVertical: 16,
    marginRight: 32,
    position: 'relative',
  },
  tabText: {
    fontSize: 16,
    color: '#6B7280',
  },
  activeTabText: {
    color: '#4F46E5',
    fontWeight: '600',
  },
  activeTabIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#4F46E5',
  },
  tripList: {
    flex: 1,
  },
  tripListContent: {
    padding: 24,
    gap: 16,
  },
  tripCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  tripContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  tripIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tripDetails: {
    flex: 1,
  },
  tripRoute: {
    marginBottom: 12,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  locationText: {
    fontSize: 14,
    color: '#111827',
    flex: 1,
  },
  tripMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#6B7280',
  },
  priceText: {
    marginLeft: 'auto',
    fontSize: 14,
    fontWeight: '600',
    color: '#4F46E5',
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});
