import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthScreen from './screens/AuthScreen';
import HomeScreen from './screens/HomeScreen';
import CourseDetailScreen from './screens/CourseDetailScreen';
import LessonScreen from './screens/LessonScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth">
        <Stack.Screen 
          name="Auth" 
          component={AuthScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Advanced People' }}
        />
        <Stack.Screen 
          name="CourseDetail" 
          component={CourseDetailScreen} 
          options={{ title: 'Course Details' }}
        />
        <Stack.Screen 
          name="Lesson" 
          component={LessonScreen} 
          options={{ title: 'Lesson' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
