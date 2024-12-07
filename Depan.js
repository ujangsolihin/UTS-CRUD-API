import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput, Button, ScrollView, TouchableOpacity } from 'react-native'
import CheckBox from 'react-native-check-box'

import firebase from './Firebase'

export class Depan extends Component {
    state = {
        rencana:'',
        listRencanaAktivitas:[]
    }
    namaTabel = 'listRencanaAktivitas';

    componentDidMount(){
        let rencana = firebase.database().ref('/'+this.namaTabel);
        rencana.once('value').then(snapshot => {
            this.setState({listRencanaAktivitas:snapshot.val()});
        })
    }
    tambahRencana = () => {
        if(this.state.rencana == ''){
            alert('Silakan masukkan rencana Anda');
            return false;
        }

        firebase.database().ref('/'+this.namaTabel).push(
            {
                aktivitas:this.state.rencana,
                sudah:false
            }
        ).then(()=>{
            alert('Sukses memasukkan rencana Aktivitas Baru');
            let rencana = firebase.database().ref('/'+this.namaTabel);
            rencana.once('value').then(snapshot => {
                this.setState({
                    listRencanaAktivitas:snapshot.val()
                });

                console.log(snapshot.val());
            })
            
            this.setState({rencana:''});
        }).catch((error)=>{
            alert(error);
        })


    }

    klikRadio = (item) => {
        var sudah = this.state.listRencanaAktivitas[item].sudah;
        var aktivitas = this.state.listRencanaAktivitas[item].aktivitas;
        var sudahBaru = ''; 
        if(sudah == true){
            var sudahBaruVal = "Belum Selesai";
            sudahBaru = false;
        }else{
            var sudahBaruVal = "Sudah Selesai";
            sudahBaru = true;
        }

        firebase.database().ref('/'+this.namaTabel+'/'+item).set(
            {
                aktivitas:aktivitas,
                sudah:sudahBaru
            }
        ).then(()=>{
            let rencana = firebase.database().ref('/'+this.namaTabel);
            rencana.once('value').then(snapshot=>{
                this.setState({listRencanaAktivitas:snapshot.val()});
            })
        }).catch((error)=>{
            alert(error);
        })

        alert(aktivitas+' sudah diubah statusnya menjadi: '+sudahBaruVal);
    }

    deleteRencana = () => {
        let keyFirebase = Object.keys(this.state.listRencanaAktivitas);
        let i = 0;
        keyFirebase.map((item)=>{
            if(this.state.listRencanaAktivitas[item].sudah == true){
                firebase.database().ref('/'+this.namaTabel+'/'+item).remove();
                i++;
            }
        })

        if(i > 0){
            alert(i+' data sudah dihapus ');
        }else{
            alert('Tidak ada data yang dihapus');
        }

        let rencana = firebase.database().ref('/'+this.namaTabel);
        rencana.once('value').then(snapshot=>{
            this.setState({listRencanaAktivitas:snapshot.val()});
        })

    }
    render() {
        let keyFirebase = [];
        if(this.state.listRencanaAktivitas){
            keyFirebase = Object.keys(this.state.listRencanaAktivitas);
        }
        console.log(keyFirebase);
        return (
            <View style = {styles.viewWrapper}>
                <View style = {styles.viewAktivitas}>
                    <ScrollView
                        scrollEnabled
                        showsVerticalScrollIndicator
                        stickyHeaderIndices
                    >
                    {
                        keyFirebase.map((item)=>(
                            <TouchableOpacity
                                key = {item}
                            >
                                <View style = {styles.viewItem}>
                                    <Text style = {styles.textItem}>{this.state.listRencanaAktivitas[item].aktivitas}</Text>

                                    <CheckBox 
                                        onClick={()=>this.klikRadio(item)}
                                        style = {styles.checkItem}
                                        checkBoxColor = 'skyblue'
                                        isChecked = {this.state.listRencanaAktivitas[item].sudah}
                                    />
                                </View>
                            </TouchableOpacity>
                        ))
                    }
                    </ScrollView>
                </View>
                <View style = {styles.viewTombol}>
                    <TextInput 
                        style = {styles.textInput}
                        placeholder = "Masukkan Rencana Aktivitas"
                        onChangeText = {(text) => this.setState({rencana:text})}
                        value = {this.state.rencana}
                    />
                    <Button title = "Tambah Rencana" onPress = {this.tambahRencana}/>
                </View>
                <View style = {styles.viewTombolDelete}>
                    <Button 
                        title = "Hapus Rencana yang Selesai"
                        color = "red"
                        onPress = {this.deleteRencana}
                    />
                </View>
            </View>
        )
    }
}

export default Depan

const styles = StyleSheet.create ({
    viewWrapper:{
        flex:1,
        backgroundColor:'#FFFFFF',
        padding:20
    },
    viewAktivitas:{
        flex:4,
    },
    viewTombol:{
       flex:2,
       textAlign:'center',
       justifyContent:'center', 
    },
    viewTombolDelete:{
        marginTop:20
    },
    textInput:{
        borderWidth:1, 
        borderColor:'#afafaf',
        borderRadius:5,
        paddingHorizontal:10,
        marginVertical:20,
        fontSize:20
    },
    viewItem:{
        flexDirection:'row'
    },
    textItem:{
       flex:4,
       paddingVertical:5, 
       paddingHorizontal:5,
       fontSize:18,
       borderBottomWidth:1,
       borderBottomColor:'#CCCCCC' 
    },
    checkItem:{
        borderBottomWidth:1, 
        borderBottomColor:'#CCCCCC',
        paddingVertical:5, 
       paddingHorizontal:5,
    }

})
