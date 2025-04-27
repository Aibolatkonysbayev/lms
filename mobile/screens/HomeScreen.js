import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const HomeScreen = ({ navigation }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = await SecureStore.getItemAsync('token');
        const response = await axios.get('http://your-api-url/api/courses', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setCourses(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={courses}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.courseItem}
            onPress={() => navigation.navigate('CourseDetail', { courseId: item._id })}
          >
            <Text style={styles.courseTitle}>{item.titleRu}</Text>
            <Text style={styles.courseDescription}>{item.descriptionRu.substring(0, 100)}...</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  courseItem: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 5
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  courseDescription: {
    fontSize: 14,
    color: '#666'
  }
});

export default HomeScreen;
