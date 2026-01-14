import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Download } from 'lucide-react-native';
import { upcomingEvents } from '../data/events';
import { Platform } from 'react-native';

export default function BuyPass() {
  const router = useRouter();
  const { eventId } = useLocalSearchParams();
  
  // Trouver l'événement correspondant
  const event = upcomingEvents.find(e => e.id === eventId);
  
  const ticket = {
    userName: 'John Doe',
    eventName: event?.name || "Avant-première IBENTO",
    purchaseDate: '31/10/2025',
    purchaseTime: '21:45',
    location: event?.location || 'Douala Grand Mall',
    ticketNumber: 'IBN-8745632',
    eventImage: event?.imageUrl || 'https://images.unsplash.com/photo-1508830524289-0adcbe822b40?w=800&q=80',
  };

  // Générer un code-barres unique
  const generateBarcode = () => {
    const data = `${ticket.ticketNumber}-${ticket.userName}-${ticket.purchaseDate}`;
    const hash = data.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    return Math.abs(hash).toString().padStart(12, '0');
  };

  const barcodeNumber = generateBarcode();

  const downloadTicket = () => {
    if (Platform.OS === 'web') {
      // Pour le web, on peut utiliser html2canvas et jsPDF
      console.log('Téléchargement du ticket...');
      // TODO: Implémenter le téléchargement web
    } else {
      // Pour les plateformes natives
      console.log('Téléchargement non disponible sur cette plateforme');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: 'white' }}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 16 }}>
          <ArrowLeft size={24} color="#333" />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333' }}>Votre Ticket</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20, alignItems: 'center' }}>
        {/* Ticket Container */}
        <View style={{
          width: 500,
          height: 200,
          backgroundColor: '#D4AF37',
          borderRadius: 15,
          overflow: 'hidden',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.3,
          shadowRadius: 25,
          elevation: 8,
          flexDirection: 'row',
          position: 'relative'
        }}>
          
          {/* Perforations en haut */}
          <View style={{
            position: 'absolute',
            top: -5,
            left: 0,
            right: 0,
            height: 10,
            backgroundColor: 'white',
            zIndex: 2
          }} />
          
          {/* Perforations en bas */}
          <View style={{
            position: 'absolute',
            bottom: -5,
            left: 0,
            right: 0,
            height: 10,
            backgroundColor: 'white',
            zIndex: 2
          }} />

          {/* Trous de perforation */}
          <View style={{
            position: 'absolute',
            left: -10,
            top: '50%',
            marginTop: -10,
            width: 20,
            height: 20,
            borderRadius: 10,
            backgroundColor: 'white'
          }} />
          <View style={{
            position: 'absolute',
            right: -10,
            top: '50%',
            marginTop: -10,
            width: 20,
            height: 20,
            borderRadius: 10,
            backgroundColor: 'white'
          }} />

          {/* Section code-barres */}
          <View style={{
            width: 80,
            backgroundColor: '#B8860B',
            alignItems: 'center',
            justifyContent: 'center',
            borderRightWidth: 2,
            borderRightColor: '#8B7355',
            borderStyle: 'dashed'
          }}>
            <Text style={{
              transform: [{ rotate: '90deg' }],
              fontSize: 10,
              color: '#333',
              fontWeight: 'bold',
              marginBottom: 10
            }}>
              {barcodeNumber}
            </Text>
            
            {/* Lignes de code-barres */}
            <View style={{ height: 120, width: 50, justifyContent: 'space-between' }}>
              {Array.from({ length: 40 }, (_, i) => (
                <View
                  key={i}
                  style={{
                    backgroundColor: '#333',
                    height: 2,
                    width: i % 2 === 0 ? '100%' : i % 3 === 0 ? '60%' : i % 5 === 0 ? '90%' : '80%'
                  }}
                />
              ))}
            </View>
          </View>

          {/* Section principale */}
          <View style={{ flex: 1, padding: 20, justifyContent: 'space-between' }}>
            {/* En-tête */}
            <View style={{ alignItems: 'center', marginBottom: 15 }}>
              <Text style={{ color: '#8B4513', fontSize: 14, marginBottom: 5 }}>★ ★ ★</Text>
              <View style={{
                borderWidth: 2,
                borderColor: '#8B4513',
                paddingVertical: 5,
                paddingHorizontal: 15,
                borderRadius: 5
              }}>
                <Text style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: '#8B4513',
                  letterSpacing: 1
                }}>
                  TICKET ÉVÉNEMENT
                </Text>
              </View>
            </View>

            {/* Informations */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 15 }}>
              <View style={{ flex: 1 }}>
                <View style={{ marginBottom: 8 }}>
                  <Text style={{ fontSize: 12, color: '#8B4513' }}>
                    <Text style={{ fontWeight: 'bold', width: 60 }}>NOM: </Text>
                    <Text style={{ color: '#333' }}>{ticket.userName}</Text>
                  </Text>
                </View>
                <View style={{ marginBottom: 8 }}>
                  <Text style={{ fontSize: 12, color: '#8B4513' }}>
                    <Text style={{ fontWeight: 'bold', width: 60 }}>HEURE: </Text>
                    <Text style={{ color: '#333' }}>{ticket.purchaseTime}</Text>
                  </Text>
                </View>
                <View style={{ marginBottom: 8 }}>
                  <Text style={{ fontSize: 12, color: '#8B4513' }}>
                    <Text style={{ fontWeight: 'bold', width: 60 }}>DATE: </Text>
                    <Text style={{ color: '#333' }}>{ticket.purchaseDate}</Text>
                  </Text>
                </View>
                <View style={{ marginBottom: 8 }}>
                  <Text style={{ fontSize: 12, color: '#8B4513' }}>
                    <Text style={{ fontWeight: 'bold', width: 60 }}>LIEU: </Text>
                    <Text style={{ color: '#333' }}>{ticket.location}</Text>
                  </Text>
                </View>
              </View>

              {/* Section image événement */}
              <View style={{
                width: 120,
                height: 80,
                backgroundColor: '#8B4513',
                borderRadius: 8,
                overflow: 'hidden',
                position: 'relative',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {/* Placeholder pour l'image */}
                <View style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#654321',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Text style={{ color: '#D4AF37', fontSize: 12, fontWeight: 'bold' }}>
                    IMAGE
                  </Text>
                </View>
                
                <View style={{
                  position: 'absolute',
                  top: 5,
                  right: 5,
                  backgroundColor: 'rgba(0,0,0,0.7)',
                  paddingHorizontal: 6,
                  paddingVertical: 2,
                  borderRadius: 3
                }}>
                  <Text style={{ color: '#D4AF37', fontSize: 10, fontWeight: 'bold' }}>
                    ÉVÉNEMENT
                  </Text>
                </View>
                
                <Text style={{
                  position: 'absolute',
                  right: 8,
                  bottom: 8,
                  color: '#D4AF37',
                  fontSize: 20
                }}>
                  ▶
                </Text>
              </View>
            </View>

            {/* Numéro de ticket */}
            <View style={{ alignItems: 'center', marginTop: 10 }}>
              <Text style={{
                fontSize: 10,
                color: '#8B4513',
                fontWeight: 'bold'
              }}>
                {ticket.ticketNumber}
              </Text>
            </View>
          </View>
        </View>

        {/* Bouton de téléchargement */}
        <TouchableOpacity
          onPress={downloadTicket}
          style={{
            marginTop: 20,
            backgroundColor: '#D4AF37',
            borderWidth: 2,
            borderColor: '#8B4513',
            paddingVertical: 12,
            paddingHorizontal: 24,
            borderRadius: 8,
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <Download size={20} color="#8B4513" style={{ marginRight: 8 }} />
          <Text style={{
            color: '#8B4513',
            fontWeight: 'bold'
          }}>
            Télécharger le ticket
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}