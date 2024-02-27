import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Axios from 'axios';

const Registro = () => {
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

    const handleRegistro = async () => {
        if (correo && contraseña) {
            if (!validarCorreo(correo)) {
                alert('El correo no es válido');
            } else {
                try {
                    const response = await Axios.post(`http://localhost:3002/api/register`, {
                        email: correo,
                        password: contraseña,
                    });
                    if (response.data.error === "correo_existe") {
                        alert("Esta dirección de correo ya está en uso. Por favor, elige otra.")
                    } else {
                        alert("¡Registro exitoso!");
                        // Limpiar los campos después de un registro exitoso
                        setCorreo('');
                        setContraseña('');
                    }
                } catch (error) {
                    console.log("❤️❤️❤️", error);
                }
            }
        } else if (!correo && !contraseña) {
            alert("Ingresa correo y contraseña");
        } else if (!correo) {
            alert("Ingresa correo");
        } else if (!contraseña) {
            alert("Ingresa contraseña");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Registro</Text>
            <Text style={styles.subTitle}>Crear cuenta</Text>
            <TextInput
                placeholder="Correo"
                style={styles.textInput}
                onChangeText={handleCorreoChange}
            />
            {correoError !== '' && (
                <Text style={styles.errorText}>{correoError}</Text>
            )}
            <TextInput
                placeholder="Contraseña"
                secureTextEntry={true}
                style={styles.textInput}
                onChangeText={(text) => setContraseña(text)}
            />
            <TouchableOpacity style={styles.containerButton} onPress={handleRegistro}>
                <LinearGradient
                    style={styles.button}
                    colors={['#FFB677', '#FF3CBD']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <Text style={styles.textButton}>Registrar</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    );
};

export default Registro;

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
