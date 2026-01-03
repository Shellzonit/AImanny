import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SkillAssessmentScreen from '../screens/SkillAssessmentScreen';
import JobSuggestionsScreen from '../screens/JobSuggestionsScreen';
import ResumeBuilderScreen from '../screens/ResumeBuilderScreen';
import ResumeEditorScreen from '../screens/ResumeEditorScreen';
import InterviewPracticeScreen from '../screens/InterviewPracticeScreen';
import TrainingScreen from '../screens/TrainingScreen';
import TransitionDirectoryScreen from '../screens/TransitionDirectoryScreen';
import EmployerPortalScreen from '../screens/EmployerPortalScreen';

const Stack = createStackNavigator();

const CareerNavigator = () => (
  <Stack.Navigator initialRouteName="SkillAssessment">
    <Stack.Screen name="SkillAssessment" component={SkillAssessmentScreen} options={{ title: 'Skill Assessment' }} />
    <Stack.Screen name="JobSuggestions" component={JobSuggestionsScreen} options={{ title: 'Job Suggestions' }} />
    <Stack.Screen name="ResumeBuilder" component={ResumeBuilderScreen} options={{ title: 'Resume Builder' }} />
    <Stack.Screen name="ResumeEditor" component={ResumeEditorScreen} options={{ title: 'Resume Editor' }} />
    <Stack.Screen name="InterviewPractice" component={InterviewPracticeScreen} options={{ title: 'Interview Practice' }} />
    <Stack.Screen name="Training" component={TrainingScreen} options={{ title: 'Training' }} />
    <Stack.Screen name="TransitionDirectory" component={TransitionDirectoryScreen} options={{ title: 'AI Transition Directory' }} />
    <Stack.Screen name="EmployerPortal" component={EmployerPortalScreen} options={{ title: 'Employer Portal' }} />
  </Stack.Navigator>
);

export default CareerNavigator;
