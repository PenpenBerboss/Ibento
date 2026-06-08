import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useState } from 'react';
import app from '@/config/firebase';

const storage = getStorage(app);

export function useImageUpload() {
  const [uploading, setUploading] = useState(false);

  const pickAndUpload = async (folder: 'profiles' | 'events'): Promise<string | null> => {
    // Demander la permission
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') return null;

    // Ouvrir la galerie
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: folder === 'profiles' ? [1, 1] : [16, 9],
      quality: 0.7,
    });

    if (result.canceled || !result.assets[0]) return null;

    setUploading(true);
    try {
      const uri = result.assets[0].uri;
      const filename = `${folder}/${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
      
      // Convertir en blob
      const response = await fetch(uri);
      const blob = await response.blob();

      // Upload vers Firebase Storage
      const storageRef = ref(storage, filename);
      await uploadBytes(storageRef, blob);

      // Récupérer l'URL publique
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } finally {
      setUploading(false);
    }
  };

  return { pickAndUpload, uploading };
}
