import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const topics = [
  { id: '1', name: 'Science', icon: 'flask' },
  { id: '2', name: 'Art', icon: 'color-palette' },
  { id: '3', name: 'Music', icon: 'musical-notes' },
  { id: '4', name: 'History', icon: 'book' },
  { id: '5', name: 'Technology', icon: 'hardware-chip' },
  { id: '6', name: 'Philosophy', icon: 'school' },
];

const TopicCard = ({ name, icon }) => (
  <TouchableOpacity style={styles.topicCard}>
    <Icon name={icon} size={32} color="#FFC21E" />
    <Text style={styles.topicName}>{name}</Text>
  </TouchableOpacity>
);

export default function ExploreScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#486581" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Discover Knowledge"
          placeholderTextColor="#486581"
        />
      </View>
      <FlatList
        data={topics}
        renderItem={({ item }) => <TopicCard {...item} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#102A43',
  },
  row: {
    justifyContent: 'space-between',
  },
  topicCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    width: '48%',
    marginBottom: 16,
  },
  topicName: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#102A43',
  },
});

