import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Axios from 'axios';
import Modalcomponente from '../modal/modal';

const Registro = () => {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [correoError, setCorreoError] = useState('');
  const [mayusculaError, setMayusculaError] = useState('');
  const [minusculaError, setMinusculaculaError] = useState('');
  const [numeroError, setNumeroError] = useState('');
  const [caracterEspecialError, setCaracterEspecialError] = useState('');
  const [caracterMinimosError, setCaracterMinimosError] = useState('');
  const [contraseñaError, setContraseñaError] = useState('');
  const [modalErrorVisible, setModalErrorVisible] = useState(false);
  const [modalMensaje, setModalMensaje] = useState("");

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

  const validarMinuscula = (contraseña) => {
    const regex = /^(?=.*[a-z])/;
    return regex.test(contraseña);
  };

  const validarMayuscula = (contraseña) => {
    const regex = /^(?=.*[A-Z])/;
    return regex.test(contraseña);
  };
  const validarNumero = (contraseña) => {
    const regex = /^(?=.*[0-9])/;
    return regex.test(contraseña);
  };

  const validarCaracteresMinimos = (contraseña) => {
    const regex = /^.{8,}$/;
    return regex.test(contraseña);
  };

  const validarCaracterEspecial = (contraseña) => {
    const regex = /[!@#$%^&*(),.?":{}|<>]/;
    return regex.test(contraseña);
  };

  const handleContraseñaChange = (text) => {
    setContraseña(text);

    const cumpleContraseña = validarContraseña(text);
    const cumpleMayuscula = validarMayuscula(text);
    const cumpleNumero = validarNumero(text);
    const cumpleMinuscula = validarMinuscula(text);
    const cumpleCaracterMinimos = validarCaracteresMinimos(text);
    const cumpleCaracterEspecial = validarCaracterEspecial(text);

    if (text && !cumpleContraseña) {
      setContraseñaError(
        'La contraseña debe contener al menos una mayúscula, una minúscula, un mínimo de 8 caracteres y al menos un carácter especial'
      );
    } else {
      setContraseñaError('');
    }

    if (text && !cumpleMayuscula) {
      setMayusculaError('Usar mayúscula');
    } else {
      setMayusculaError('');
    }

    if (text && !cumpleMinuscula) {
      setMinusculaculaError('Usar minuscula');
    } else {
      setMinusculaculaError('');
    }

    if (text && !cumpleNumero) {
      setNumeroError('Usar numero');
    } else {
      setNumeroError('');
    }

    if (text && !cumpleCaracterEspecial) {
      setCaracterEspecialError('caracter especial');
    } else {
      setCaracterEspecialError('');
    }

    if (text && !cumpleCaracterMinimos) {
      setCaracterMinimosError('La contraseña debe contener al menos 8 carácter');
    } else {
      setCaracterMinimosError('');
    }
  };

  const validarContraseña = (contraseña) => {
    const cumpleMinuscula = validarMinuscula(contraseña);
    const cumpleMayuscula = validarMayuscula(contraseña);
    const cumpleCaracterEspecial = validarCaracterEspecial(contraseña);
    const cumpleCaracteresMInimos = validarCaracteresMinimos(contraseña);

    return cumpleMinuscula && cumpleMayuscula  && cumpleCaracterEspecial && cumpleCaracteresMInimos;
  };

  const handleRegistro = async () => {
    if (correo && contraseña) {
      if (!validarCorreo(correo)) {
        setModalErrorVisible(true);
        setModalMensaje('El correo no es válido')
      } else if (!validarContraseña(contraseña)) {
        setModalErrorVisible(true);
        setModalMensaje('La contraseña no es válida')
      }  else {
        try {
          const response = await Axios.post(`http://localhost:3002/api/register`, {
            email: correo,
            password: contraseña,
          });
          if (response.data.error === 'correo_existe') {
            setModalErrorVisible(true);
            setModalMensaje('Esta dirección de correo ya está en uso. Por favor, elige otra.')
          } else {
            setModalErrorVisible(true);
            setModalMensaje('¡Registro exitoso!')
            // Limpiar los campos después de un registro exitoso
            setCorreo('');
            setContraseña('');
          }
        } catch (error) {
          console.log('❤️❤️❤️', error);
        }
      }
    } else if (!correo && !contraseña) {
      setModalErrorVisible(true);
      setModalMensaje('Ingresa correo y contraseña');
    } else if (!correo) {
      setModalErrorVisible(true);
      setModalMensaje('Ingresa correo');
    } else if (!contraseña) {
      setModalErrorVisible(true);
      setModalMensaje('Ingresa contraseña')
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
        maxLength={30}
      />
      {correoError !== '' && (
        <Text style={styles.errorText}>{correoError}</Text>
      )}
      <TextInput
        placeholder="Contraseña"
        secureTextEntry={true}
        style={styles.textInput}
        onChangeText={handleContraseñaChange}
        maxLength={20}
      />
      {/* {contraseñaError !== '' && (
        <Text style={styles.errorText}>{contraseñaError}</Text>
      )} */}
      {caracterMinimosError !== '' && (
        <Text style={styles.errorText}>{caracterMinimosError}</Text>
      )}
      {mayusculaError !== '' && (
        <Text style={styles.errorText}>{mayusculaError}</Text>
      )}
      {minusculaError !== '' && (
        <Text style={styles.errorText}>{minusculaError}</Text>
      )}
      {numeroError !== '' && (
        <Text style={styles.errorText}>{numeroError}</Text>
      )}
      {caracterEspecialError !== '' && (
        <Text style={styles.errorText}>{caracterEspecialError}</Text>
      )}
      <TouchableOpacity style={styles.containerButton} onPress={handleRegistro}>
        <LinearGradient
          style={styles.button}
          colors={['#FFB677', '#FF3CBD']}
          // start={{ x: 0, y: 0 }}
          // end={{ x: 1, y: 1 }}
        >
          <Text style={styles.textButton}>Registrar</Text>
        </LinearGradient>
      </TouchableOpacity>
      {modalErrorVisible && (
        <Modalcomponente errorTextModal={modalMensaje} estado={modalErrorVisible} setEstado={setModalErrorVisible} />
      )}
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