import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({ navigation }) => {
  useEffect(() => {
    // Verificar si hay un token almacenado en AsyncStorage
    const checkAuthentication = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        // Si hay un token, el usuario está autenticado, permanece en la pantalla Home
        if (!token) {
          // Si no hay un token, el usuario no está autenticado, redirige a la pantalla de inicio de sesión
          navigation.replace('Login');
        }
      } catch (error) {
        console.error('Error al verificar la autenticación', error);
      }
    };

    // Llama a la función para verificar la autenticación al cargar el componente
    checkAuthentication();
  }, [navigation]);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      navigation.replace('Login');
    } catch (error) {
      console.error('Error al eliminar el token', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Bienvenidos!</Text>
      <Button title="Salir" onPress={handleLogout} />
    </View>
  );
};
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
