import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const CourseDetailScreen = ({ route, navigation }) => {
  const { courseId } = route.params;
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const token = await SecureStore.getItemAsync('token');
        const response = await axios.get(`http://your-api-url/api/courses/${courseId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setCourse(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{course.titleRu}</Text>
      <Text style={styles.description}>{course.descriptionRu}</Text>
      
      {course.modules && course.modules.map(module => (
        <View key={module._id} style={styles.moduleContainer}>
          <Text style={styles.moduleTitle}>{module.titleRu}</Text>
          {module.lessons && module.lessons.map(lesson => (
            <TouchableOpacity 
              key={lesson._id}
              style={styles.lessonItem}
              onPress={() => navigation.navigate('Lesson', { lessonId: lesson._id })}
            >
              <Text style={styles.lessonTitle}>{lesson.titleRu}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10
  },
  description: {
    fontSize: 16,
    marginBottom: 20
  },
  moduleContainer: {
    marginBottom: 20
  },
  moduleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  lessonItem: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    marginBottom: 5,
    borderRadius: 5
  },
  lessonTitle: {
    fontSize: 16
  }
});

export default CourseDetailScreen;
