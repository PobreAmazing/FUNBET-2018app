import { StyleSheet, View } from 'react-native';
import React, { Component } from 'react';  
import {equipoScreen} from '../Screennames';
import { Button, Container, Content, List, ListItem, Text, Icon, Badge, Left, Body, Right, Switch, Picker } from 'native-base';
import Bd from './bd';  



export default class Botonpago extends React.Component { 

    constructor(props){
        super(props)
    
        this.state=({
          lista: [             
          ],   
          nombre: '',               
          pago:0,
          colocartarjeta:'',
          marca:'MasterCard'
        })
      }
    
    static navigationOptions = {
        title: 'Generar pago',
      };

      listenForItems = (itemsRef) => {
        itemsRef.on('value', (snap) => {
          alert(snap.val().pago);
          this.setState({pago:snap.val().pago});
          if(snap.val().pago==0){
            this.setState({colocartarjeta:'(no es necesario que escriba el número tarjeta de crédito)'});
          }
          else{
            this.setState({colocartarjeta:''});
          }
        });
      }
   
validar=(p)=>{
  if(p>0){
    this.setState({colocartarjeta:'(no es necesario que escriba el número tarjeta de crédito)'});
  }
  else{
    this.setState({colocartarjeta:''});
  }
}
 
      
 componentDidMount(){
    const { navigation } = this.props; 
    const valor = navigation.getParam('valor','NO-ID');
    const nombre = navigation.getParam('nombre','NO-NAME');
    let fb=new Bd();
    const itemsRef=fb.encontrar('liga',valor);
    this.listenForItems(itemsRef);
    //this.textear();
 }

 render() {
    const { navigation } = this.props;
   // const pagorender = this.state.pago;
    const val = navigation.getParam('valor', 'NO-ID');
    const nom = navigation.getParam('nombre','NO-NAME');
    return (
              <Container>
                  <Content>
                  <Text>Equipo: {JSON.stringify(nom)}{'\n'}</Text>
                  <Text>Monto a pagar: {this.state.pago}  {this.state.colocartarjeta}</Text>

                  <Item floatingLabel>
                <Label>Número de tarjeta</Label>
                <Input autoCorrect={false}
                 autoCapitalize="none"
                 onChangeText={(tarjeta)=>this.setState({tarjeta})}
                /*onChangeText={(nuevo)=>this.setState({nuevo})}*/ />            
                </Item>

                 <Item floatingLabel>
                <Label>Marca</Label>
                <Picker selectedValue={this.state.marca} 
                 onValueChange={(itemValue, itemIndex) => this.setState({marca: itemValue})}>
                   <Picker.Item label="MasterCard" value="MasterCard" /> 
                   <Picker.Item label="Visa" value="Visa" /> 
                   <Picker.Item label="AmericanExpress" value="AmericanExpress" /> 
                 </Picker>        
                </Item>
                  
                
                   
                    <Button style={{marginTop: 10}}full success 
                       onPress={()=>validar(this.state.pago)}>
                          <Text > Registrar equipo</Text>
                   </Button>  
                  </Content>
                </Container>             
        );
    }
}

