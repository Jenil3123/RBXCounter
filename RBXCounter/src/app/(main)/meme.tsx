import React from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

import { ThemedText } from '@/components/themed-text';

const MEMES = [
  { id: 1, url: 'https://tr.rbxcdn.com/30DAY-Avatar-355CF216CA290788033FD093C4FD81AD-Png/420/420/Avatar/Png/noFilter', title: 'When the server lags' },
  { id: 2, url: 'https://tr.rbxcdn.com/30DAY-Avatar-00F5AC82069E81313F7B0CDD9CC83E2D-Png/420/420/Avatar/Png/noFilter', title: 'Me looking at my 0 RBX balance' },
  { id: 3, url: 'https://tr.rbxcdn.com/30DAY-Avatar-F91A80687E1339FA0DF979634D216503-Png/420/420/Avatar/Png/noFilter', title: 'OOF' },
  { id: 4, url: 'https://tr.rbxcdn.com/30DAY-Avatar-7925185D9F22E4E10C7338C442D263B9-Png/420/420/Avatar/Png/noFilter', title: 'Admins when you say free robux' },
];

export default function MemeRoute() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const handleLike = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <ThemedText style={styles.title}>Meme Feed</ThemedText>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {MEMES.map((meme) => (
          <View key={meme.id} style={styles.memeCard}>
            <Image 
              source={{ uri: meme.url }} 
              style={styles.memeImage}
              resizeMode="cover"
            />
            <View style={styles.memeFooter}>
              <ThemedText style={styles.memeTitle}>{meme.title}</ThemedText>
              <View style={styles.actions}>
                <TouchableOpacity style={styles.actionBtn} onPress={handleLike}>
                  <Ionicons name="heart-outline" size={28} color="#F472B6" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionBtn}>
                  <Ionicons name="share-outline" size={28} color="#60A5FA" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
        
        <ThemedText style={styles.endText}>You've caught up! Check back later.</ThemedText>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#090A0F',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1F202B',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#12131A',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#1F202B',
  },
  title: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '900',
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  memeCard: {
    backgroundColor: '#12131A',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#1F202B',
    marginBottom: 24,
    overflow: 'hidden',
  },
  memeImage: {
    width: '100%',
    aspectRatio: 1, // Square images
    backgroundColor: '#000',
  },
  memeFooter: {
    padding: 20,
  },
  memeTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  actionBtn: {
    padding: 8,
  },
  endText: {
    color: '#555',
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold',
  }
});
