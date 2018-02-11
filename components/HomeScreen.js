import React, {Component} from 'react';
import {signInWithEmail} from './../redux/actions/userActions';
import {
    Alert,
    View,
    Text,
    TextInput,
    Button
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
        reports: []
    };

    static navigationOptions = {
        title: 'Mapa',
    };

    getReports = () => {
        var context = this;
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
                    key: reporte.key
                    });
            });
            context.setState({reports: reportesArray});
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
        }
    }

    render(){
        if(this.state.reports.length<=0){
            this.getReports();
        }
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
                    <Marker coordinate={reporte.marker}
                    title={reporte.titulo}
                    description={reporte.descripcion}
                    pinColor={reporte.color}
                    onPress={(e) => this.props.navigation.navigate("ReportProfile",{clave: reporte.key})}
                    />
                )}
                </MapView>
                <Button title="Crear reporte" onPress={this.makeReport} />
            </View>
        );
    }
}