import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Registro from './components/form/registro';
import Home from './components/home';
import Login from './components/form/login';
import React from 'react';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Registro" component={Registro} options={{ headerShown: false }} />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerLeft: null, // Esto oculta la flecha de retroceso en Home
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
