import React, {Component} from 'react';
import {signInWithEmail} from './../redux/actions/userActions';
import {
    Alert,
    View,
    Text,
    TextInput,
    Button,
    Picker
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import firebase from './../firebase';

const db = firebase.database().ref("/");

export default class HomeScreen extends Component {
    state = {
        auth:{
            email: '',
            password: ''
        },
        center: {
            latitude: 20.6751803,
            longitude: -103.3949403,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        },
        marker: undefined,
        eventMarker: [],
        reports: [],
        filtro: "N",
        loaded: false
    };

    static navigationOptions = {
        title: 'Mapa',
    };

    getReports = () => {
        var context = this;
        let eventosArray = [];
        db.child("Evento").on("value", (eventos) => {
            eventos.forEach(function (evento){
                eventosArray.push({
                    marker: {
                        latitude: evento.val().latitud,
                        longitude: evento.val().longitud
                    },
                    nombre: evento.val().nombre,
                    horario: evento.val().fecha+" "+evento.val().hora,
                });
            });
        });
        db.child("Reporte").on("value", (reportes) => {
            let reportesArray = [];
            reportes.forEach(function (reporte){
                reportesArray.push({
                    marker: {
                        latitude: reporte.val().latitud,
                        longitude: reporte.val().longitud
                    },
                    titulo: reporte.val().titulo,
                    descripcion: reporte.val().descripcion,
                    color: reporte.val().categoria==="Medio ambiente" ? "#22b142" : reporte.val().categoria==="Movilidad" ? "#d81a1d" : reporte.val().categoria==="Seguridad" ? "#2267b1" : "#ffff",
                    categoria: reporte.val().categoria,
                    key: reporte.key,
                    show: true
                    });
            });
            context.setState({reports: reportesArray, eventMarker: eventosArray});
        });
    }

    addMarker = (e) => {
        this.setState({
            marker:{
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude
            }
        });
    }

    
    makeReport = () => {
        if(this.state.marker){
            this.props.navigation.navigate("Report", {
                marker: this.state.marker
            });
        }else {

        }
    }

    componentDidMount(){
        var context = this;
        let eventosArray = [];
        db.child("Evento").on("value", (eventos) => {
            eventos.forEach(function (evento){
                eventosArray.push({
                    marker: {
                        latitude: evento.val().latitud,
                        longitude: evento.val().longitud
                    },
                    nombre: evento.val().nombre,
                    categoria: evento.val().categoria
                });
            });
        });
        db.child("Reporte").on("value", (reportes) => {
            let reportesArray = [];
            reportes.forEach(function (reporte){
                reportesArray.push({
                    marker: {
                        latitude: reporte.val().latitud,
                        longitude: reporte.val().longitud
                    },
                    titulo: reporte.val().titulo,
                    descripcion: reporte.val().descripcion,
                    color: reporte.val().categoria==="Medio ambiente" ? "#22b142" : reporte.val().categoria==="Movilidad" ? "#d81a1d" : reporte.val().categoria==="Seguridad" ? "#2267b1" : "#ffff",
                    categoria: reporte.val().categoria,
                    key: reporte.key,
                    show: true
                    });
            });
            context.setState({reports: reportesArray, eventMarker: eventosArray});
        });
    }

    filter = (itemValue, itemIndex) => {
        var context = this;
        if(itemValue!=="NA"){
            this.state.reports.map((reporte) => {
                if(reporte.categoria===itemValue){
                    reporte.show = true;
                }else{
                    reporte.show = false;
                }
            });
        }else{
            this.state.reports.map((reporte) => {
                reporte.show = true;
            });
        }
        this.setState({filtro: itemValue});
    }

    render(){
        /*if(this.state.reports.length<=0){
            this.getReports();
        }*/
        return(
            <View style={styles.container} >
                <MapView
                style={styles.map}
                    initialRegion={this.state.center}
                    onPress={this.addMarker}
                >
                {this.state.marker && 
                    <Marker coordinate={this.state.marker} />
                }
                {this.state.reports.map((reporte) =>
                    reporte.show && <Marker coordinate={reporte.marker}
                    title={reporte.titulo}
                    description={reporte.descripcion}
                    pinColor={reporte.color}
                    onPress={(e) => this.props.navigation.navigate("ReportProfile",{clave: reporte.key})}
                    />
                )}
                {this.state.eventMarker.map((evento) =>
                    <Marker coordinate={evento.marker}
                    title={evento.nombre}
                    description={evento.categoria}
                    pinColor={"#6c2b7d"}
                    />
                )}
                </MapView>
                <View>
                    <Picker
                    selectedValue={this.state.flitro}
                    onValueChange={this.filter}>
                    <Picker.Item label="- Filtro -" value="N" />
                        <Picker.Item label="No filtrar" value="NA" />
                        <Picker.Item label="Medio ambiente" value="Medio ambiente" />
                        <Picker.Item label="Movilidad" value="Movilidad" />
                        <Picker.Item label="Seguridad" value="Seguridad" />
                    </Picker>
                    <Button title="Crear reporte" onPress={this.makeReport} />
                </View>
            </View>
        );
    }
}