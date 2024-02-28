import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

const Modalcomponente = ({errorTextModal,estado,setEstado}) => {
  return (
    <>
    {estado && 
    <View style={styles.container}>
      <Modal isVisible={estado} onBackdropPress={() => setEstado(!estado)}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>{errorTextModal}</Text>
          <TouchableOpacity onBackdropPress={() => setEstado(!estado)}>
            <Text style={styles.modalCloseButton}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
}
    </>
  );
};

const styles = StyleSheet.create({
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
