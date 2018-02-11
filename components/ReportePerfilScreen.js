import React, {Component} from 'react';
import { Text, Button, View } from 'react-native';
import firebase from './../firebase';

export const db = firebase.database().ref("/");

export default class ReportePerfilScreen extends Component {
    state = {
        profile: {
            titulo: '',
            descripcion: '',
            categoria: '',
            autor: '',
            likes: 0
        },
        voto: false
    }

    static navigationOptions = {
        title: 'Ver reporte',
    };

    getReportProfile = () => {
        const { clave } = this.props.navigation.state.params;
        db.child("Reporte").child(clave).on("value", (reporte) => {
            let profile = {
                titulo: reporte.val().titulo,
                descripcion: reporte.val().descripcion,
                categoria: reporte.val().categoria,
                autor: reporte.val().autor,
                likes: reporte.val().likes
            };
            this.setState({profile});
        });
    }
    addLike = () => {
        const { clave } = this.props.navigation.state.params;
        if(!this.state.voto){
            db.child("Reporte").child(clave).update({
                likes: this.state.profile.likes+1
            });
            this.setState({
                voto: true
            });
        }
    }
    render(){
        if(this.state.profile.titulo===''){
            this.getReportProfile();
        }
        const {profile} = this.state;
        return(
            <View>
                <Text>{profile.titulo}</Text>
                <Text>{profile.descripcion}</Text>
                <Text>Reportado por: {profile.autor}</Text>
                <Text>Personas que apoyan esta idea: {profile.likes}</Text>
                <Button 
                title="Tiene mi apoyo" 
                onPress={this.addLike}
                />
            </View>
        );
    }
}