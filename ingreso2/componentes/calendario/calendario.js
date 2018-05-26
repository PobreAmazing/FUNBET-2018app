import { StyleSheet, View } from 'react-native';
import React, { Component } from 'react';
import { Button, ScrollView, Container, Header, Content,List, ListItem, Text, Radio, Right, Left, Label, Item, Input } from 'native-base';

import Bd from '../bd';
import { LigaScreen, equipoScreen } from '../../Screennames';

export default class Calendario extends React.Component {

    constructor(props){
      super(props)
  
      this.state=({
        lista:[],
        user:'',
        seleccion1:'',
        seleccion2:'',
        detalle:'',
        resultado1:'',
        resultado2:''
      })
    }

    static navigationOptions = {
      title: 'Calendario'
    };

    listenForItems = (itemsRef) => {
      itemsRef.on('value', (snap) => {
  
        // get children as an array
        var lista = [];
        snap.forEach((child) => {
          lista.push({
            detalle: child.val().detalle,
            //pago: child.val().pago,
           // done: child.val().done,  
            id: child.key
            //alert(id+" "+nombre);
          });
          //alert(lista);
        });
  
        this.setState({
          lista: lista
        });
  
      });
    }

  componentDidMount() {
      let fb = new Bd();
      const itemsRef = fb.mostrar('partidos');
      this.listenForItems(itemsRef);
     // this.refs['ligas'].showPicker(true);
    }

    render(){
        return(
            <Container>           
            <Content>
            { this.state.lista.map((item, key)=>(
            <List>
            
                <ListItem itemDivider>
                  <Text>{item.detalle}</Text>
                </ListItem>                    
                <ListItem >
                  <Text>Aaron Bennet</Text>
                </ListItem>         
              </List>
               ))}
            </Content>
          </Container>
        );
    }

}