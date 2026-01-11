import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Call {
  id: string;
  passengerName: string;
  origin: string;
  destination: string;
  price: string;
  distance: string;
}

const MOCK_CALLS: Call[] = [
  {
    id: '1',
    passengerName: 'Maria Silva',
    origin: 'Av. Paulista, 1000',
    destination: 'Rua Augusta, 500',
    price: 'R$ 15,00',
    distance: '2.5 km',
  },
  {
    id: '2',
    passengerName: 'João Souza',
    origin: 'Rua Oscar Freire, 200',
    destination: 'Shopping Eldorado',
    price: 'R$ 22,50',
    distance: '4.8 km',
  },
];

export function DriversHomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Chamadas Disponíveis</Text>
        <View style={styles.statusBadge}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>Online</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {MOCK_CALLS.map((call) => (
          <View key={call.id} style={styles.callCard}>
            <View style={styles.passengerInfo}>
              <View style={styles.avatar}>
                <Ionicons name="person" size={24} color="#4F46E5" />
              </View>
              <View>
                <Text style={styles.passengerName}>{call.passengerName}</Text>
                <Text style={styles.distanceText}>
                  {call.distance} de distância
                </Text>
              </View>
              <Text style={styles.priceText}>{call.price}</Text>
            </View>

            <View style={styles.routeInfo}>
              <View style={styles.routeItem}>
                <Ionicons name="ellipse" size={12} color="#9CA3AF" />
                <Text style={styles.locationText} numberOfLines={1}>
                  {call.origin}
                </Text>
              </View>
              <View style={styles.routeLine} />
              <View style={styles.routeItem}>
                <Ionicons name="location" size={12} color="#4F46E5" />
                <Text style={styles.locationText} numberOfLines={1}>
                  {call.destination}
                </Text>
              </View>
            </View>

            <TouchableOpacity style={styles.acceptButton}>
              <Text style={styles.acceptButtonText}>Aceitar Corrida</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#065F46',
  },
  scrollContent: {
    padding: 16,
  },
  callCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  passengerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  passengerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  distanceText: {
    fontSize: 14,
    color: '#6B7280',
  },
  priceText: {
    marginLeft: 'auto',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4F46E5',
  },
  routeInfo: {
    marginBottom: 20,
  },
  routeItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  routeLine: {
    width: 1,
    height: 20,
    backgroundColor: '#E5E7EB',
    marginLeft: 5,
    marginVertical: 2,
  },
  locationText: {
    fontSize: 14,
    color: '#374151',
    marginLeft: 8,
    flex: 1,
  },
  acceptButton: {
    backgroundColor: '#4F46E5',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  acceptButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
