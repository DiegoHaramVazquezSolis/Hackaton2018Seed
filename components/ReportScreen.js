import React, {Component} from 'react';
import {
    Text,
    TextInput,
    Button,
    Picker,
    View
    } from 'react-native';
import firebase from './../firebase';
    
const db = firebase.database().ref("/Reporte");

export default class ReportScreen extends Component {
    state = {
        nombre: '',
        titulo: '',
        descripcion: '',
        categoria: 'Medio ambiente',
    }

    static navigationOptions = {
        title: 'Crear reporte',
    };

    sendReport = () => {
        const { params } = this.props.navigation.state;
        db.push({
            titulo: this.state.titulo,
            descripcion: this.state.descripcion,
            likes: 0,
            categoria: this.state.categoria,
            latitud: params.marker.latitude,
            longitud: params.marker.longitude,
            autor: this.state.nombre,
        });
    }

    render(){
        const { params } = this.props.navigation.state;
        return(
            <View>
                <Text>Nombre: </Text>
                <TextInput 
                    onChangeText={(nombre) => this.setState({nombre})}
                />
                <Text>Titulo: </Text>
                <TextInput 
                    onChangeText={(titulo) => this.setState({titulo})}
                />
                <Text>Descripcion: </Text>
                <TextInput 
                    onChangeText={(descripcion) => this.setState({descripcion})}
                />
                <Text>Categoria: </Text>
                <Picker
                    selectedValue={this.state.categoria}
                    onValueChange={(itemValue, itemIndex) => this.setState({categoria: itemValue})}>
                        <Picker.Item label="Medio ambiente" value="Medio ambiente" color="#22b142" />
                        <Picker.Item label="Movilidad" value="Movilidad" color="#d81a1d" />
                        <Picker.Item label="Seguridad" value="Seguridad" color="#2267b1" />
                </Picker>
                <Button title="Enviar reporte" onPress={this.sendReport} />
            </View>
        );
    }
}