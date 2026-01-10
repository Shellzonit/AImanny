import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import HomelifeScreen from '../screens/HomelifeScreen';
import WellnessScreen from '../screens/WellnessScreen';
import CareerScreen from '../screens/CareerScreen';
import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import SkillGapScreen from '../screens/SkillGapScreen';
import AIEthicsScreen from '../screens/AIEthicsScreen';
import VoiceMultimodalScreen from '../screens/VoiceMultimodalScreen';
import AdminScreen from '../screens/AdminScreen';
import JobSearchScreen from '../screens/JobSearchScreen';
import ResumeOptimizerScreen from '../screens/ResumeOptimizerScreen';
import InterviewPracticeScreen from '../screens/InterviewPracticeScreen';
import InterviewMessagesScreen from '../screens/InterviewMessagesScreen';
import MockInterviewScreen from '../screens/MockInterviewScreen';
import PracticeCardsScreen from '../screens/PracticeCardsScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor:
            route.name === 'Homelife' || route.name === 'Wellness' || route.name === 'Career' ? '#e3f2fd' : '#fff',
          borderTopColor: route.name === 'Homelife' || route.name === 'Wellness' || route.name === 'Career' ? '#388e3c' : '#cfd8dc',
        },
        tabBarActiveTintColor: route.name === 'Homelife' || route.name === 'Wellness' || route.name === 'Career' ? '#388e3c' : '#1976d2',
        tabBarInactiveTintColor: '#888',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Homelife" component={HomelifeScreen} />
      <Tab.Screen name="Career" component={CareerScreen} />
      <Tab.Screen name="Wellness" component={WellnessScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Onboarding" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Main" component={MainTabs} />
      <Stack.Screen name="SkillGap" component={SkillGapScreen} />
      <Stack.Screen name="AIEthics" component={AIEthicsScreen} />
      <Stack.Screen name="VoiceMultimodal" component={VoiceMultimodalScreen} />
      <Stack.Screen name="Admin" component={AdminScreen} />
      <Stack.Screen name="JobSearch" component={JobSearchScreen} />
      <Stack.Screen name="ResumeOptimizer" component={ResumeOptimizerScreen} />
      <Stack.Screen name="InterviewPractice" component={InterviewPracticeScreen} />
      <Stack.Screen name="InterviewMessages" component={InterviewMessagesScreen} />
      <Stack.Screen name="MockInterview" component={MockInterviewScreen} />
      <Stack.Screen name="PracticeCards" component={PracticeCardsScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
