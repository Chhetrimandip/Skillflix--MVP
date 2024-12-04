import React, { useState } from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

const videos = [
  {
    id: '1',
    title: 'The Future of Artificial Intelligence',
    creator: 'Dr. Jane Smith',
    avatar: 'https://example.com/avatar1.jpg',
    videoUrl: require('../assets/video1.mp4'),
    likes: '125K',
    comments: '1.2K',
    shares: '3.4K',
  },
  {
    id: '2',
    title: 'Understanding Quantum Mechanics',
    creator: 'Prof. John Doe',
    avatar: 'https://example.com/avatar2.jpg',
    videoUrl: require('../assets/video1.mp4'),
    likes: '89K',
    comments: '956',
    shares: '2.1K',
  },
];

const VideoCard = ({ title, creator, avatar, videoUrl, likes, comments, shares, paused: parentPaused }) => {
  const [paused, setPaused] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  React.useEffect(() => {
    setPaused(parentPaused);
  }, [parentPaused]);

  const onLoadStart = () => {
    setLoading(true);
    setError(null);
  };

  const onLoad = () => {
    setLoading(false);
    setPaused(parentPaused);
  };

  const onError = (err) => {
    setError(err);
    setLoading(false);
  };

  const togglePause = () => {
    if (!parentPaused) {
      setPaused(!paused);
    }
  };

  return (
    <View style={styles.videoCard}>
      <TouchableOpacity 
        style={styles.videoContent}
        onPress={togglePause}
      >
        <Video
          source={videoUrl}
          style={styles.videoPlayer}
          resizeMode="cover"
          repeat
          paused={paused}
          onLoadStart={onLoadStart}
          onLoad={onLoad}
          onError={onError}
          controls={false}
          muted={false}
          playInBackground={false}
          playWhenInactive={false}
          volume={1.0}
        />
        
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FFC21E" />
          </View>
        )}

        {error && (
          <View style={styles.errorContainer}>
            <Icon name="alert-circle" size={24} color="white" />
            <Text style={styles.errorText}>Failed to load video</Text>
          </View>
        )}

        <View style={styles.progressBarContainer}>
          <View style={styles.progressBar} />
        </View>
      </TouchableOpacity>

      {/* Right side actions */}
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

      {/* Bottom content */}
      <View style={styles.bottomContent}>
        <Text style={styles.creator}>@{creator}</Text>
        <Text style={styles.title} numberOfLines={2}>{title}</Text>
      </View>
    </View>
  );
};

export default function HomeScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const onViewableItemsChanged = React.useCallback(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={videos}
        renderItem={({ item, index }) => (
          <VideoCard 
            {...item} 
            paused={index !== currentIndex}
          />
        )}
        keyExtractor={(item) => item.id}
        pagingEnabled
        snapToInterval={height - 49}
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        bounces={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50
        }}
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
    height: height - 49,
    backgroundColor: '#000',
    position: 'relative',
  },
  videoContent: {
    flex: 1,
    position: 'relative',
  },
  videoPlayer: {
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
    zIndex: 1,
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
    zIndex: 1,
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
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  errorContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  errorText: {
    color: 'white',
    marginTop: 8,
    fontSize: 14,
  },
});

