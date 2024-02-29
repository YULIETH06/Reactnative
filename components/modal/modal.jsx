import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Modalcomponente = ({errorTextModal,estado,setEstado}) => {
  return (
    <>
    {estado && 
    <View style={styles.container}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>{errorTextModal}</Text>
          <TouchableOpacity onPress={() => setEstado(!estado)}>
            <Text style={styles.modalCloseButton}>Cerrar</Text>
          </TouchableOpacity>
        </View>
    </View>
    }
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.551)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    flex: 1,
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalCloseButton: {
    color: 'blue',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Modalcomponente;
