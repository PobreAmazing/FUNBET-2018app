import { StyleSheet, View } from 'react-native';
import React, { Component } from 'react';
import { Button, ScrollView, Container, Header, Content,List, ListItem, Text, Radio, Right, Left, Label, Item, Input } from 'native-base';

import Bd from '../bd';
import { LigaScreen, equipoScreen } from '../../Screennames';

export default class Perfil extends React.Component {

    constructor(props){
      super(props)
  
      this.state=({
        lista:[ ],
        user:''
      })
    }

    static navigationOptions = {
      title: 'Mi perfil',
    };

    listenForItems = (itemsRef) => {
        itemsRef.on('value', (snap) => {
    
          // get children as an array
          var lista = [];
          snap.forEach((child) => {
            lista.push({
              liga: child.val().liga,
              equipo: child.val().equipo,  
              puntos: child.val().puntos
            });
          });
    
          this.setState({
            lista: lista
          });
    
        });
      }

    /*componentDidMount() {
        const itemsRef = Bd.mostrar('liga');
        this.listenForItems(itemsRef);
      }*/

    render() {
     // const { navigation } = this.props;
      let fb= new Bd(); 
      const user = fb.obtenerusuario(); 
      //alert(user);
      //this.setState({user:user});
        return (   
    
          <Container>       
        <Content>  
        <Text>Usuario: {JSON.stringify(user)}</Text>      
        <Label>Mis equipos</Label>       

        <Button style={{marginTop: 10}}
              full        
              primary
              onPress={()=>this.props.navigation.navigate('LigaScreen',{user:user})}>
              
              
               <Text style={{color:'white'}}> crear liga </Text>
              </Button>

        <Button style={{marginTop: 10}}
              full        
              primary
              onPress={()=>this.props.navigation.navigate('equipoScreen')}>
              
              
               <Text style={{color:'white'}}> añadir equipo </Text>
              </Button>
                  
        </Content>
      </Container>
        );
      }
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        padding: 10
      },
    });