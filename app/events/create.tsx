import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Camera, Calendar, MapPin, Clock } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import SmartImage from '../../components/SmartImage';
import { useEventsStore } from '../../hooks/useEventsStore';

const COVER_EXAMPLES = [
  'https://lebaneseotaku.com/assets/img/image-1.jpg',
  'https://showbook.africa/storage/676/20240911_175900-(3).jpg',
  'https://controlpanel.people237.com/wp-content/uploads/2024/12/emy-dany-bassong-film-rdc-people237.jpg'
];

export default function CreateEvent() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [cover, setCover] = useState(COVER_EXAMPLES[0]);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [category, setCategory] = useState('divertement');
  const progress = useRef(new Animated.Value(0)).current;
  const { createEvent } = useEventsStore();
  const [coverUrl, setCoverUrl] = useState('');

  const CATEGORIES = [
    { id: 'otaku237', label: 'OTAKU 237' },
    { id: 'cinema', label: 'Cinéma' },
    { id: 'festival', label: 'Festival' },
    { id: 'salon', label: 'Salon' },
    { id: 'divertement', label: 'Divertissement' },
  ];

  const submit = async () => {
    if (!title) return;
    setSubmitting(true);
    try {
      await createEvent({
        name: title,
        date,
        location,
        description,
        imageUrl: cover,
        price: price || 'Gratuit',
        currency: 'FCFA',
        type: 'upcoming',
        category,
      });
      router.push('/events' as any);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: '#071026' }}>
      <LinearGradient colors={["#071026", "transparent"]} className="pt-2">
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 12, paddingVertical: 10 }}>
          <TouchableOpacity onPress={() => router.push('/events' as any)} style={{ width: 40, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.03)' }}>
            <ArrowLeft size={20} color="#fff" />
          </TouchableOpacity>

          <Text style={{ color: '#fff', fontSize: 18, fontWeight: '700' }}>Nouvel événement</Text>

          <TouchableOpacity onPress={submit} disabled={submitting} style={{ paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, backgroundColor: title ? '#1e90ff' : 'rgba(255,255,255,0.04)' }}>
            <Text style={{ color: '#fff', fontWeight: '600' }}>{submitting ? '...' : 'Créer'}</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={{ padding: 12 }}>
        {/* Cover picker */}
        <View style={{ marginBottom: 18 }}>
          <TouchableOpacity onPress={() => setPickerOpen(!pickerOpen)} style={{ borderRadius: 14, overflow: 'hidden', backgroundColor: '#0b1220' }}>
            <SmartImage source={cover} style={{ width: '100%', height: 180 }} contain={false} />
            <BlurView intensity={40} style={{ position: 'absolute', left: 12, right: 12, bottom: 12, borderRadius: 12 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 8 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Camera size={16} color="#fff" />
                  <Text style={{ color: '#fff', marginLeft: 8 }}>Change cover</Text>
                </View>
                <Text style={{ color: '#fff/60' }}>{cover.split('/').pop()?.substring(0, 20)}</Text>
              </View>
            </BlurView>
          </TouchableOpacity>

          {pickerOpen && (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 8 }}>
              {COVER_EXAMPLES.map((c, idx) => (
                <TouchableOpacity key={idx} onPress={() => setCover(c)} style={{ marginRight: 8 }}>
                  <SmartImage source={c} style={{ width: 120, height: 70, borderRadius: 8 }} contain={false} />
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>

        {/* Fields */}
        <View style={{ marginBottom: 12 }}>
          <Text style={{ color: '#fff', marginBottom: 6 }}>Titre</Text>
          <TextInput value={title} onChangeText={setTitle} placeholder="Titre de l'événement" placeholderTextColor="#999" style={{ backgroundColor: '#081224', padding: 12, borderRadius: 10, color: '#fff' }} />
        </View>

        <View style={{ flexDirection: 'row', gap: 8, marginBottom: 12 }}>
          <View style={{ flex: 1 }}>
            <Text style={{ color: '#fff', marginBottom: 6 }}>Date</Text>
            <TextInput value={date} onChangeText={setDate} placeholder="25 Dec 2025" placeholderTextColor="#999" style={{ backgroundColor: '#081224', padding: 12, borderRadius: 10, color: '#fff' }} />
          </View>
          <View style={{ width: 110 }}>
            <Text style={{ color: '#fff', marginBottom: 6 }}>Heure</Text>
            <TextInput value={time} onChangeText={setTime} placeholder="19:00" placeholderTextColor="#999" style={{ backgroundColor: '#081224', padding: 12, borderRadius: 10, color: '#fff' }} />
          </View>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text style={{ color: '#fff', marginBottom: 6 }}>Lieu</Text>
          <TextInput value={location} onChangeText={setLocation} placeholder="Ex: Canal Olympia" placeholderTextColor="#999" style={{ backgroundColor: '#081224', padding: 12, borderRadius: 10, color: '#fff' }} />
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text style={{ color: '#fff', marginBottom: 6 }}>Prix</Text>
          <TextInput value={price} onChangeText={setPrice} placeholder="e.g. 3000 FCFA or Free" placeholderTextColor="#999" style={{ backgroundColor: '#081224', padding: 12, borderRadius: 10, color: '#fff' }} />
        </View>

        {/* URL image */}
        <View style={{ marginBottom: 12 }}>
          <Text style={{ color: '#fff', marginBottom: 6 }}>URL de l'image</Text>
          <TextInput
            value={coverUrl}
            onChangeText={(url) => { setCoverUrl(url); if (url) setCover(url); }}
            placeholder="https://..."
            placeholderTextColor="#999"
            autoCapitalize="none"
            style={{ backgroundColor: '#081224', padding: 12, borderRadius: 10, color: '#fff' }}
          />
        </View>

        {/* Catégorie */}
        <View style={{ marginBottom: 12 }}>
          <Text style={{ color: '#fff', marginBottom: 8 }}>Catégorie</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                onPress={() => setCategory(cat.id)}
                style={{
                  marginRight: 8,
                  paddingHorizontal: 14,
                  paddingVertical: 8,
                  borderRadius: 20,
                  backgroundColor: category === cat.id ? '#1e90ff' : '#081224',
                  borderWidth: 1,
                  borderColor: category === cat.id ? '#1e90ff' : 'rgba(255,255,255,0.1)',
                }}
              >
                <Text style={{ color: '#fff', fontWeight: category === cat.id ? '700' : '400' }}>{cat.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={{ marginBottom: 18 }}>
          <Text style={{ color: '#fff', marginBottom: 6 }}>Description</Text>
          <TextInput value={description} onChangeText={setDescription} placeholder="Détails, invités, programme..." placeholderTextColor="#999" multiline style={{ backgroundColor: '#081224', padding: 12, borderRadius: 10, color: '#fff', minHeight: 120, textAlignVertical: 'top' }} />
        </View>

        <TouchableOpacity onPress={submit} disabled={submitting} style={{ backgroundColor: '#1e90ff', padding: 14, borderRadius: 12, alignItems: 'center', opacity: submitting ? 0.7 : 1 }}>
          <Text style={{ color: '#fff', fontWeight: '700' }}>{submitting ? 'Création...' : "Créer l'événement"}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
