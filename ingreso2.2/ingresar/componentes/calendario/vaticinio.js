import { StyleSheet, View } from 'react-native';
import React, { Component } from 'react';
import { Picker, Icon, Footer, FooterTab, Button, ScrollView, Container, Header, Content, List, ListItem, Text, Radio, Right, Left, Label, Item, Input } from 'native-base';

import Bd from '../bd';
//import { LigaScreen, equipoScreen, calendarioStack, miPerfilStack } from '../../Screennames';

export default class Vaticinio extends React.Component {

  constructor(props) {
    super(props)

    this.state = ({
      lista: [],
      nuevo:'',
      user: '',
      seleccion1: '',
      seleccion2: '',
      detalle: '',
      resultado1: '',
      resultado2: '',
      dia:'',
      mes:'',
      hora: '',
      minuto: '',
      horaactual: '',
      diaactual: '',
      mesactual: '',
      anio: '2018',
      minutoactual: '',
      estado: '',
      useractual:'',
      valor: 'Seleccionar'
    })
  }

  static navigationOptions = {
    title: 'Vaticinio'
  };

  validarvaticinio = (id,seleccion1,seleccion2) => {
    let fb= new Bd();
    const r1= this.state.resultado1;
    const r2= this.state.resultado2;
    const val= this.state.valor;
    //const user = fb.obtenerusuario();
    if(val=='Seleccionar')
      alert('Seleccione un equipo registrado para realizar la apuesta');
    if(r1==''||r2=='')
     alert("Llene los 2 campos de marcador.");
    else{
     let nuevo=this.state.nuevo;
     nuevo={seleccion1:seleccion1,resultado1:r1,seleccion2:seleccion2,resultado2:r2};
     const key=fb.agregarItem(nuevo,'vaticinios/'+id,val);
    }
  }

  listenForItems = (itemsRef,user) => {
      //const useractual="";
    itemsRef.on('value', (snap) => {

      // get children as an array
      var lista = [];
      snap.forEach((child) => {
        // useractual=child.val().user;
         if(child.val().user==user){
        //alert(useractual); 
        lista.push({
          nombre: child.val().nombre,
          //pago: child.val().pago,
         // done: child.val().done,  
          id: child.key
          //alert(id+" "+nombre);
        });}
        //alert(lista);
      });

      this.setState({
        lista: lista
      });

    });
  }

  componentWillMount() {
    let fb= new Bd();
    const user = fb.obtenerusuario();
    const itemsRef = fb.mostrar('equipos');
    this.listenForItems(itemsRef,user);
  }


  render() {
    const { navigation } = this.props; 
      const id = navigation.getParam('id','NO-ID');
      const detalle= navigation.getParam('detalle','NO-DETAIL');
      const seleccion1= navigation.getParam('seleccion1','NO-S1');
      const seleccion2= navigation.getParam('seleccion2','NO-S2');
    return (
      <Container>

        <Content>          
                <Text>{JSON.stringify(detalle)}</Text>

            <Label> Seleccione un equipo </Label>

            <Picker
            selectedValue={this.state.valor}
 
            onValueChange={(itemValue, itemIndex) => this.setState({valor: itemValue})} >
             <Picker.Item label="Seleccionar" value="Seleccionar"  />
            { this.state.lista.map((item, key)=>(
            <Picker.Item label={item.nombre} value={item.id}  />)
            )}
    
          </Picker>
        
          <Label>Resultado:</Label>
          
          <Text>{JSON.stringify(seleccion1)}</Text>
          <Item floatingLabel>
                <Label>Marcador</Label>
                <Input autoCorrect={false}
                 autoCapitalize="none"
                 onChangeText={(resultado1)=>this.setState({resultado1})}
                /*onChangeText={(nuevo)=>this.setState({nuevo})}*/ />            
                </Item>

            <Text>{JSON.stringify(seleccion2)}</Text>
          <Item floatingLabel>
                <Label>Marcador</Label>
                <Input autoCorrect={false}
                 autoCapitalize="none"
                 onChangeText={(resultado2)=>this.setState({resultado2})}
                /*onChangeText={(nuevo)=>this.setState({nuevo})}*/ />            
                </Item>

             
              <Button style={{ marginTop: 10 }} full success
                onPress={() => this.validarvaticinio(id,seleccion1,seleccion2)} >
                <Text > Guardar Vaticinio</Text>
              </Button>           
        </Content>
        
      </Container>
    );
  }

}