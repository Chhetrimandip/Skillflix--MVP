import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

const user = {
  name: 'Dr. Emily Johnson',
  bio: 'Astrophysicist and science communicator passionate about making complex concepts accessible to all.',
  qualifications: 'PhD in Astrophysics, Stanford University',
  topicsTeaching: ['Astronomy', 'Physics', 'Space Exploration'],
  topicsLearning: ['Quantum Computing', 'Neuroscience'],
  videosWatched: 75,
  totalVideos: 100,
};

const ProgressBar = ({ progress }) => (
  <View style={styles.progressBarContainer}>
    <View style={[styles.progressBar, { width: `${progress}%` }]} />
  </View>
);

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://example.com/profile-picture.jpg' }}
          style={styles.profilePicture}
        />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.qualifications}>{user.qualifications}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.bio}>{user.bio}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Topics Teaching</Text>
        <View style={styles.topicsContainer}>
          {user.topicsTeaching.map((topic, index) => (
            <View key={index} style={styles.topicChip}>
              <Text style={styles.topicText}>{topic}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Topics Learning</Text>
        <View style={styles.topicsContainer}>
          {user.topicsLearning.map((topic, index) => (
            <View key={index} style={[styles.topicChip, styles.learningChip]}>
              <Text style={[styles.topicText, styles.learningText]}>{topic}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Learning Progress</Text>
        <ProgressBar progress={(user.videosWatched / user.totalVideos) * 100} />
        <Text style={styles.progressText}>
          {user.videosWatched} out of {user.totalVideos} videos watched
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  header: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#102A43',
  },
  qualifications: {
    fontSize: 14,
    color: '#486581',
  },
  section: {
    padding: 16,
    backgroundColor: 'white',
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#102A43',
    marginBottom: 8,
  },
  bio: {
    fontSize: 14,
    color: '#334E68',
  },
  topicsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  topicChip: {
    backgroundColor: '#D9E2EC',
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 8,
    margin: 4,
  },
  topicText: {
    color: '#334E68',
    fontSize: 14,
  },
  learningChip: {
    backgroundColor: '#FFEFC2',
  },
  learningText: {
    color: '#B38600',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#D9E2EC',
    borderRadius: 4,
    marginVertical: 8,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FFC21E',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#486581',
    textAlign: 'center',
  },
});

