import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Axios from 'axios';

const Login = ({ navigation }) => {
    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [correoError, setCorreoError] = useState('');

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
            try {
                const response = await Axios.post(`http://localhost:3002/api/login`, {
                    email: correo,
                    password: contraseña,
                });
                console.log(response, "😒😒");
                if (response.data.message === "Inicio de sesión exitoso") {
                    alert("Inicio de sesión exitoso");
                }
                navigation.navigate('Home');
            } catch (error) {
                console.log("❤️❤️❤️", error);
                if (error.response && error.response.status === 401) {
                    alert("Contraseña incorrecta");
                } else if (error.response && error.response.status === 404) {
                    alert("El correo electrónico no está registrado.");
                }
            }
        } else if (!correo && !contraseña) {
            alert("Ingresar correo y contraseña");
        } else if (!correo) {
            alert("Ingresar correo");
        } else if (!contraseña) {
            alert("Ingresar contraseña");
        }
    };



    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Hola</Text>
            <Text style={styles.subTitle}>Iniciar sesión en su cuenta</Text>
            <TextInput
                placeholder="correo"
                style={styles.textInput}
                onChangeText={handleCorreoChange}
            />
            {correoError !== '' && (
                <Text style={styles.errorText}>{correoError}</Text>
            )}
            <TextInput
                placeholder="contraseña"
                secureTextEntry={true}
                style={styles.textInput}
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
                <Text>Registrarse</Text>
            </TouchableOpacity>
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
}); 