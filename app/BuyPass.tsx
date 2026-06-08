import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar, ActivityIndicator, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Download, CheckCircle } from 'lucide-react-native';
import { collection, addDoc, query, where, getDocs, serverTimestamp } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { useAuthStore } from '@/hooks/useAuthStore';
import { useEventsStore } from '@/hooks/useEventsStore';
import { QRCodeSVG } from 'qrcode.react';
import { LinearGradient } from 'expo-linear-gradient';
import SmartImage from '../components/SmartImage';

interface Ticket {
  id: string;
  ticketNumber: string;
  userName: string;
  eventName: string;
  eventId: string;
  location: string;
  date: string;
  price: string;
  currency: string;
  purchaseDate: string;
  status: 'active' | 'used';
}

const generateTicketNumber = () =>
  'IBN-' + Math.random().toString(36).substring(2, 10).toUpperCase();

export default function BuyPass() {
  const router = useRouter();
  const { eventId } = useLocalSearchParams();
  const { user } = useAuthStore();
  const { getEvent } = useEventsStore();

  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);

  // Charger ticket existant ou préparer un nouveau
  useEffect(() => {
    if (!user || !eventId) return;
    loadOrPrepare();
  }, [user, eventId]);

  const loadOrPrepare = async () => {
    setLoading(true);
    try {
      // Vérifier si l'utilisateur a déjà un ticket pour cet événement
      const q = query(
        collection(db, 'tickets'),
        where('userId', '==', user!.id),
        where('eventId', '==', eventId)
      );
      const snap = await getDocs(q);

      if (!snap.empty) {
        const data = snap.docs[0].data();
        setTicket({ id: snap.docs[0].id, ...data } as Ticket);
        return;
      }

      // Pas de ticket existant → charger l'événement pour préparer l'achat
      const event = await getEvent(eventId as string);
      if (!event) return;

      const now = new Date();
      setTicket({
        id: '',
        ticketNumber: generateTicketNumber(),
        userName: `${user!.firstName} ${user!.lastName}`.trim(),
        eventName: event.name,
        eventId: eventId as string,
        location: event.location ?? '',
        date: event.date ?? '',
        price: event.price,
        currency: event.currency,
        purchaseDate: now.toLocaleDateString('fr-FR'),
        status: 'active',
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async () => {
    if (!ticket || !user || ticket.id) return;
    setPurchasing(true);
    try {
      const ref = await addDoc(collection(db, 'tickets'), {
        userId: user.id,
        eventId: ticket.eventId,
        ticketNumber: ticket.ticketNumber,
        userName: ticket.userName,
        eventName: ticket.eventName,
        location: ticket.location,
        date: ticket.date,
        price: ticket.price,
        currency: ticket.currency,
        purchaseDate: ticket.purchaseDate,
        status: 'active',
        createdAt: serverTimestamp(),
      });
      setTicket({ ...ticket, id: ref.id });
    } finally {
      setPurchasing(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5', alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#1e90ff" />
      </SafeAreaView>
    );
  }

  if (!ticket) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5', alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: '#333' }}>Événement introuvable</Text>
      </SafeAreaView>
    );
  }

  const alreadyPurchased = !!ticket.id;
  const qrData = JSON.stringify({
    ticketNumber: ticket.ticketNumber,
    eventId: ticket.eventId,
    userId: user?.id,
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0a0f1e' }}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 16 }}>
          <ArrowLeft size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}>
          {alreadyPurchased ? 'Mon Ticket' : 'Acheter le Pass'}
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20, alignItems: 'center' }}>

        {/* Badge déjà acheté */}
        {alreadyPurchased && (
          <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#1a3a1a', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 8, marginBottom: 20 }}>
            <CheckCircle size={18} color="#4ade80" />
            <Text style={{ color: '#4ade80', fontWeight: '700', marginLeft: 8 }}>Pass confirmé</Text>
          </View>
        )}

        {/* Ticket Card */}
        <View style={{ width: '100%', borderRadius: 20, overflow: 'hidden', elevation: 12, shadowColor: '#000', shadowOpacity: 0.4, shadowRadius: 20, shadowOffset: { width: 0, height: 8 } }}>
          <LinearGradient colors={['#1e3a5f', '#0a1628']} style={{ padding: 24 }}>

            {/* Titre événement */}
            <Text style={{ color: '#fff', fontSize: 20, fontWeight: '800', marginBottom: 4 }}>{ticket.eventName}</Text>
            <Text style={{ color: '#9ca3af', fontSize: 13, marginBottom: 20 }}>{ticket.location}</Text>

            {/* Infos */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
              <View>
                <Text style={{ color: '#6b7280', fontSize: 11, marginBottom: 2 }}>TITULAIRE</Text>
                <Text style={{ color: '#fff', fontWeight: '700' }}>{ticket.userName}</Text>
              </View>
              <View>
                <Text style={{ color: '#6b7280', fontSize: 11, marginBottom: 2 }}>DATE</Text>
                <Text style={{ color: '#fff', fontWeight: '700' }}>{ticket.date}</Text>
              </View>
              <View>
                <Text style={{ color: '#6b7280', fontSize: 11, marginBottom: 2 }}>PRIX</Text>
                <Text style={{ color: '#fbbf24', fontWeight: '700' }}>
                  {ticket.price} {ticket.currency}
                </Text>
              </View>
            </View>

            {/* Séparateur pointillé */}
            <View style={{ borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.1)', borderStyle: 'dashed', marginBottom: 20 }} />

            {/* QR Code — affiché seulement si ticket acheté */}
            {alreadyPurchased && Platform.OS === 'web' ? (
              <View style={{ alignItems: 'center', marginBottom: 20 }}>
                <View style={{ backgroundColor: '#fff', padding: 12, borderRadius: 12 }}>
                  <QRCodeSVG value={qrData} size={160} />
                </View>
                <Text style={{ color: '#6b7280', fontSize: 11, marginTop: 8 }}>Scanner à l'entrée</Text>
              </View>
            ) : alreadyPurchased ? (
              <View style={{ alignItems: 'center', marginBottom: 20 }}>
                <View style={{ backgroundColor: '#fff', padding: 12, borderRadius: 12, alignItems: 'center', justifyContent: 'center', width: 184, height: 184 }}>
                  <Text style={{ color: '#333', fontSize: 11, textAlign: 'center' }}>QR Code disponible sur web</Text>
                </View>
              </View>
            ) : null}

            {/* Numéro de ticket */}
            <View style={{ alignItems: 'center' }}>
              <Text style={{ color: '#4b5563', fontSize: 12, letterSpacing: 2 }}>{ticket.ticketNumber}</Text>
            </View>
          </LinearGradient>
        </View>

        {/* Bouton achat ou téléchargement */}
        <View style={{ width: '100%', marginTop: 24 }}>
          {!alreadyPurchased ? (
            <TouchableOpacity
              onPress={handlePurchase}
              disabled={purchasing}
              style={{ borderRadius: 14, overflow: 'hidden', opacity: purchasing ? 0.7 : 1 }}
            >
              <LinearGradient colors={['#1e90ff', '#0066cc']} style={{ padding: 16, alignItems: 'center' }}>
                {purchasing
                  ? <ActivityIndicator color="#fff" />
                  : <Text style={{ color: '#fff', fontWeight: '700', fontSize: 16 }}>Confirmer l'achat — {ticket.price} {ticket.currency}</Text>
                }
              </LinearGradient>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#1a2a1a', borderWidth: 1, borderColor: '#4ade80', borderRadius: 14, padding: 16 }}
              onPress={() => console.log('TODO: télécharger PDF')}
            >
              <Download size={20} color="#4ade80" />
              <Text style={{ color: '#4ade80', fontWeight: '700', marginLeft: 8 }}>Télécharger le ticket</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
