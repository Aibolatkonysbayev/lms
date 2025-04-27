import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Video } from 'expo-av';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const LessonScreen = ({ route }) => {
  const { lessonId } = route.params;
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const videoRef = React.useRef(null);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const token = await SecureStore.getItemAsync('token');
        const response = await axios.get(`http://your-api-url/api/lessons/${lessonId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setLesson(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [lessonId]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{lesson.titleRu}</Text>
      
      {lesson.contentType === 'video' && lesson.videoUrl && (
        <Video
          ref={videoRef}
          style={styles.video}
          source={{ uri: lesson.videoUrl }}
          useNativeControls
          resizeMode="contain"
          isLooping={false}
        />
      )}

      {lesson.textContentRu && (
        <Text style={styles.content}>{lesson.textContentRu}</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20
  },
  video: {
    width: '100%',
    height: 200,
    marginBottom: 20
  },
  content: {
    fontSize: 16,
    lineHeight: 24
  }
});

export default LessonScreen;
