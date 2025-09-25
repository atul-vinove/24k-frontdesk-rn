import { theme } from '@/src/constants/theme';
import { useAuthStore } from '@/src/state/authStore';
import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { TouchableOpacity } from 'react-native';

// Import screens
import DrawerContent from '@/src/components/DrawerContent';
import AboutUsScreen from '@/src/screens/AboutUsScreen';
import HistoryScreen from '@/src/screens/HistoryScreen';
import LoginScreen from '@/src/screens/LoginScreen';
import VisitorFormScreen from '@/src/screens/VisitorFormScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Main app navigator with drawer for authenticated screens
function MainDrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props: any) => <DrawerContent {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerTintColor: theme.colors.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        drawerStyle: {
          backgroundColor: theme.colors.background,
          width: 280,
        },
      }}
    >
      <Drawer.Screen 
        name="VisitorForm" 
        component={VisitorFormScreen}
        options={({ navigation }) => ({
          title: 'Visitor Registration',
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 16 }}
              onPress={() => navigation.navigate('History')}
              activeOpacity={0.7}
            >
              <Ionicons name="time-outline" size={24} color={theme.colors.white} />
            </TouchableOpacity>
          ),
        })}
      />
      <Drawer.Screen 
        name="History" 
        component={HistoryScreen}
        options={({ navigation }) => ({
          title: 'Visitor History',
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 16 }}
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
            >
              <Ionicons name="arrow-back" size={24} color={theme.colors.white} />
            </TouchableOpacity>
          ),
        })}
      />
      <Drawer.Screen 
        name="AboutUs" 
        component={AboutUsScreen}
        options={{ title: 'About Us' }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor={theme.colors.background} />
      <Stack.Navigator
        initialRouteName={isAuthenticated ? "Main" : "Login"}
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerTintColor: theme.colors.text,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{ title: 'Login' }}
        />
        <Stack.Screen 
          name="Main" 
          component={MainDrawerNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
