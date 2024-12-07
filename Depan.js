import React, {Component} from 'react';
import {Alert, Button, StyleSheet, Text, TextInput, View} from 'react-native';
import firebase from './Firebase';

export class Depan extends Component {
  state = {
    rencana: '',
    listRencanaAktivitas: [],
  };
  tambahRencana = () => {
    if (this.state.rencana == '') {
      alert('Silahkan Masukan Rencana Anda');
      return false;
    }

    firebase
      .database()
      .ref('/listRencanaAktivitas')
      .push({
        aktivitas: this.state.rencana,
        sudah: false,
      })
      .then(() => {
        alert('Sukses memasukan rencana aktivitas baru');
        let rencana = firebase.database().ref('/listRencanaAktivitas');
        rencana.once('value').then(snapshot => {
          this.setState({
            listRencanaAktivitas: snapshot.val(),
          });
        });
        this.setState({rencana: ''});
      })
      .catch(error => {
        alert('error');
      });
  };
  render() {
    return (
      <View style={styles.viewWrapper}>
        <View style={styles.viewAktivitas}></View>
        <View style={styles.viewTombol}>
          <TextInput
            style={styles.TextInput}
            placeholder="Masukan Rencana Aktivitas"
            onChangeText={text => this.setState({rencana: text})}
            value={this.state.rencana}
          />
          <Button title="Tambah Rencana" onPress={this.tambahRencana} />
        </View>
        <View style={styles.viewTombolDelete}></View>
      </View>
    );
  }
}

export default Depan;

const styles = StyleSheet.create({
  viewWrapper: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },

  viewAktivitas: {
    flex: 4,
    borderWidth: 1,
  },

  viewTombol: {
    flex: 2,
    textAlign: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },

  viewTombolDelete: {
    marginTop: 20,
  },

  TextInput: {
    borderWidth: 1,
    borderColor: '#afafaf',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 20,
    fontSize: 20,
  },
});
