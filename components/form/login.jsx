import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modalcomponente from '../modal/modal';

// prop que proporciona funciones y propiedades relacionadas con la navegación entre pantallas
const Login = ({ navigation }) => {
    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [correoError, setCorreoError] = useState('');
    const [modalErrorVisible, setModalErrorVisible] = useState(false);
  const [modalMensaje, setModalMensaje] = useState("");

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          navigation.replace('Home');
        }
      } catch (error) {
        console.error('Error al verificar el token', error);
      }
    };

    checkToken();
  }, [navigation]);

    //expresión regular para validar el correo//
    const validarCorreo = (correo) => {
        const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return correoRegex.test(correo);
    };

    const handleCorreoChange = (text) => {
        setCorreo(text);
        if (text && !validarCorreo(text)) {
            setCorreoError('El correo no es válido');
        } else {
            setCorreoError('');
        }
    };

    const handleLogin = async () => {
        if (correo && contraseña) {
            if (!validarCorreo(correo)) {
                setModalErrorVisible(true);
                setModalMensaje("El correo no es válido")
            } else {
                try {
                    const response = await Axios.post(`http://localhost:3002/api/login`, {
                        email: correo,
                        password: contraseña,
                    });
                    if (response.data.message === "Inicio de sesión exitoso") {
                        setCorreo('');
                        setContraseña('');
                    }
                    const token = response.data.token;
                    await AsyncStorage.setItem('token', token);
                    navigation.navigate('Home');
                } catch (error) {
                    if (error.response && error.response.status === 401) {
                        setModalErrorVisible(true);
                        setModalMensaje(error.response.data.message,"uuuu bobolon")
                    } else if (error.response && error.response.status === 404) {
                        setModalErrorVisible(true);
                        setModalMensaje("El correo electrónico no está registrado.")
                    } else if (error.response.data.message.includes("bloqueada")) {
                        // Puedes redirigir al usuario o mostrar un mensaje específico
                        setModalErrorVisible(true);
                        setModalMensaje(error.response.data.message,"bloqueada")
                    }
                }
            }
        } else if (!correo && !contraseña) {
            setModalErrorVisible(true);
            setModalMensaje("Ingresar correo y contraseña")
        } else if (!correo) {
            setModalErrorVisible(true);
            setModalMensaje("Ingresar correo")
        } else if (!contraseña) {
            setModalErrorVisible(true);
            setModalMensaje("Ingresar contraseña")
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Hola</Text>
            <Text style={styles.subTitle}>Iniciar sesión en su cuenta</Text>
            <TextInput
                placeholder="correo"
                value={correo}
                style={styles.textInput}
                maxLength={30}
                onChangeText={handleCorreoChange}
            />
            {correoError !== '' && (
                <Text style={styles.errorText}>{correoError}</Text>
            )}
            <TextInput
                placeholder="contraseña"
                value={contraseña}
                secureTextEntry={true}
                style={styles.textInput}
                maxLength={20}
                onChangeText={(text) => setContraseña(text)}
            />
            <TouchableOpacity style={styles.containerButton} onPress={handleLogin}>
                <LinearGradient
                    style={styles.button}
                    colors={['#FFB677', '#FF3CBD']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <Text style={styles.textButton}>Iniciar</Text>
                </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
                <Text style={styles.LinkText}>Registrarse</Text>
            </TouchableOpacity>
            {modalErrorVisible && (
        <Modalcomponente errorTextModal={modalMensaje} estado={modalErrorVisible} setEstado={setModalErrorVisible} />
      )}
        </View>
    );
};
export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f1f1',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titulo: {
        fontSize: 80,
        color: '#34434D',
        fontWeight: 'bold',
    },
    subTitle: {
        fontSize: 20,
        color: '#0000009f',
    },
    textInput: {
        padding: 10,
        paddingStart: 30,
        width: '80%',
        height: 50,
        marginTop: 20,
        borderRadius: 30,
        backgroundColor: '#fff',
    },
    containerButton: {
        width: '100%',
        alignItems: 'center',
    },
    button: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        height: 50,
        borderRadius: 25,
        padding: 10,
    },
    textButton: {
        fontSize: 16,
        color: '#FFF',
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
    },
    LinkText: {
        fontSize: 20,
        marginTop: 10,
    },
}); 