import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';



    // const handleIniciar = async () => {
    //     if (correo && contraseña) {
    //         try {
    //             await AsyncStorage.setItem('correo', correo);
    //             await AsyncStorage.setItem('contraseña', contraseña);
    //             // Redirigir al usuario a la pantalla "Home"
    //             navigation.navigate('Home');
    //         } catch (error) {
    //             console.log('Error al guardar los datos:', error);
    //         }
    //     } else if (!correo && !contraseña) {
    //         alert('Por favor ingrese contraseña y correo');
    //     } else if (!contraseña) {
    //         alert('Ingrese contraseña');
    //     } else if (!correo) {
    //         alert('Ingrese correo');
    //     }
    // };

export default function Home() {
  return (
    <View style={styles.container}>
      <Text>Bienvenidos!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
