
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importa tus componentes de pantalla
import Registro from './components/form/registro';
import Home from './components/home';
import Login from './components/form/login';

// Crea un StackNavigator
const Stack = createStackNavigator();

// Configura las rutas de navegación
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Registro" component={Registro} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;