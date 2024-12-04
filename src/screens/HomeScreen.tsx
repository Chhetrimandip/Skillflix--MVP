import React from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

const videos = [
  {
    id: '1',
    title: 'The Future of Artificial Intelligence',
    creator: 'Dr. Jane Smith',
    avatar: 'https://example.com/avatar1.jpg',
    thumbnail: 'https://example.com/ai-thumbnail.jpg',
    likes: '125K',
    comments: '1.2K',
    shares: '3.4K',
  },
  {
    id: '2',
    title: 'Understanding Quantum Mechanics',
    creator: 'Prof. John Doe',
    avatar: 'https://example.com/avatar2.jpg',
    thumbnail: 'https://example.com/quantum-thumbnail.jpg',
    likes: '89K',
    comments: '956',
    shares: '2.1K',
  },
];

const VideoCard = ({ title, creator, avatar, likes, comments, shares }) => (
  <View style={styles.videoCard}>
    <View style={styles.videoContent}>
      {/* Video placeholder */}
      <View style={styles.videoPlaceholder} />
      
      {/* Progress bar */}
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar} />
      </View>
    </View>

    {/* Right side actions - Now with fixed positioning from bottom of videoCard */}
    <View style={styles.sideActions}>
      <TouchableOpacity style={styles.actionButton}>
        <Icon name="heart-outline" size={28} color="white" />
        <Text style={styles.actionText}>{likes}</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.actionButton}>
        <Icon name="chatbubble-outline" size={28} color="white" />
        <Text style={styles.actionText}>{comments}</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.actionButton}>
        <Icon name="share-social-outline" size={28} color="white" />
        <Text style={styles.actionText}>{shares}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.avatarContainer}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
      </TouchableOpacity>
    </View>

    {/* Bottom content - Now with fixed positioning from bottom of videoCard */}
    <View style={styles.bottomContent}>
      <Text style={styles.creator}>@{creator}</Text>
      <Text style={styles.title} numberOfLines={2}>{title}</Text>
    </View>
  </View>
);

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={videos}
        renderItem={({ item }) => <VideoCard {...item} />}
        keyExtractor={(item) => item.id}
        pagingEnabled
        snapToInterval={height - 49}
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        bounces={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  videoCard: {
    width: width,
    height: height - 49, // Consistent height for all cards
    backgroundColor: '#000',
    position: 'relative', // Ensure this is the positioning context
  },
  videoContent: {
    flex: 1,
    position: 'relative',
  },
  videoPlaceholder: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  progressBarContainer: {
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.2)',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FFC21E',
    width: '45%',
  },
  sideActions: {
    position: 'absolute',
    right: 8,
    bottom: 120,
    alignItems: 'center',
    zIndex: 1, // Ensure it's above other content
  },
  actionButton: {
    alignItems: 'center',
    marginVertical: 6,
  },
  actionText: {
    color: 'white',
    fontSize: 12,
    marginTop: 2,
  },
  avatarContainer: {
    marginTop: 12,
    borderWidth: 2,
    borderColor: '#FFC21E',
    borderRadius: 23,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },
  bottomContent: {
    position: 'absolute',
    bottom: 45,
    left: 0,
    right: 0,
    padding: 16,
    zIndex: 1, // Ensure it's above other content
  },
  creator: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  title: {
    color: 'white',
    fontSize: 14,
    marginRight: 64,
  },
});

