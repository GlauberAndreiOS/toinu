import React, { useState, useCallback, useMemo, memo, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../../../contexts/AuthContext';
import api from '../../../../services/api';
import { Trip as ApiTrip, TripStatus } from '@toinu/shared-types';

// Interface para exibição (adaptada da API)
interface DisplayTrip {
  readonly id: string;
  readonly type: 'bus' | 'train' | 'bike' | 'car';
  readonly from: string;
  readonly to: string;
  readonly date: string;
  readonly time: string;
  readonly duration: string;
  readonly price: string;
  readonly icon: React.ComponentProps<typeof Ionicons>['name'];
  readonly color: string;
  readonly status: TripStatus;
}

interface TripCardProps {
  readonly trip: DisplayTrip;
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
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [trips, setTrips] = useState<DisplayTrip[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTrips = useCallback(async () => {
    if (!user?.passenger?.id) return;

    try {
      setLoading(true);
      const response = await api.get<ApiTrip[]>(
        `/passengers/${user.passenger.id}/trips`,
      );

      // Adaptar dados da API para exibição
      const adaptedTrips: DisplayTrip[] = response.data.map((trip) => {
        const date = new Date(trip.createdAt);
        return {
          id: trip.id,
          type: 'car', // Padrão por enquanto
          from: trip.origin,
          to: trip.destination,
          date: date.toLocaleDateString('pt-BR'),
          time: date.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
          }),
          duration: 'N/A', // API não retorna ainda
          price: 'R$ --', // API não retorna ainda
          icon: 'car-outline',
          color: '#4F46E5',
          status: trip.status,
        };
      });

      setTrips(adaptedTrips);
    } catch (error) {
      console.error('Erro ao buscar viagens:', error);
    } finally {
      setLoading(false);
    }
  }, [user?.passenger?.id]);

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  const filteredTrips = useMemo(() => {
    // Filtrar por status ou data se necessário
    // Por enquanto, vamos simular que 'upcoming' são as REQUESTED/ACCEPTED e 'past' são COMPLETED/CANCELED
    if (activeTab === 'upcoming') {
      return trips.filter((t) =>
        ['REQUESTED', 'ACCEPTED', 'STARTED'].includes(t.status),
      );
    } else {
      return trips.filter((t) => ['COMPLETED', 'CANCELED'].includes(t.status));
    }
  }, [trips, activeTab]);

  const handleTabChange = useCallback((tab: 'upcoming' | 'past') => {
    setActiveTab(tab);
  }, []);

  const handleProfilePress = useCallback(() => {
    onProfilePress?.();
  }, [onProfilePress]);

  const handleMotoPress = useCallback(() => {
    Alert.alert(
      'Indisponível',
      'Viagens de moto estão indisponíveis no momento.',
    );
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.greeting}>Bem-vindo de volta,</Text>
            <Text style={styles.userName} numberOfLines={1} ellipsizeMode="tail">
              {user?.fullName || 'Passageiro'}
            </Text>
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
              <Ionicons name="car-outline" size={16} color="#4F46E5" />
              <Text style={styles.transportButtonText}>Carro</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.transportButton, styles.disabledButton]}
              onPress={handleMotoPress}
              activeOpacity={0.7}
            >
              <Ionicons name="bicycle-outline" size={16} color="#9CA3AF" />
              <Text style={[styles.transportButtonText, styles.disabledButtonText]}>
                Moto
              </Text>
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
        {loading ? (
          <ActivityIndicator size="large" color="#4F46E5" />
        ) : filteredTrips.length > 0 ? (
          filteredTrips.map((trip) => <TripCard key={trip.id} trip={trip} />)
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>Nenhuma viagem encontrada</Text>
          </View>
        )}
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab}>
        <Ionicons name="navigate" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
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
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTextContainer: {
    flex: 1,
    marginRight: 16,
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
    flexShrink: 0,
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
  disabledButton: {
    backgroundColor: '#F3F4F6',
    opacity: 0.7,
  },
  transportButtonText: {
    fontSize: 14,
    color: '#4F46E5',
    fontWeight: '600',
  },
  disabledButtonText: {
    color: '#9CA3AF',
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
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  emptyStateText: {
    color: '#6B7280',
    fontSize: 16,
  },
});
