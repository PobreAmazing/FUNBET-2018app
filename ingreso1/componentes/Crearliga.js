
import { StyleSheet, View } from 'react-native';
import React, { Component } from 'react';
import { Container, Header, Content, ListItem, Text, Radio, Right, Left, Label, Item, Input, Button } from 'native-base';

import bd from './bd';

export default class Crearliga extends React.Component {

    constructor(props){
      super(props)
  
      this.state=({
        nuevo: '',
        tipo: '',
        pago: 0,
        nombre: ''
      })
    }

    static navigationOptions = {
      title: 'Crear Liga',
    };
     
    validar=(n,t,p)=>{
      if(n==''){
        alert('Ingrese un nombre');}
      else if(t==''){
        alert('Seleccione un tipo de liga');     
      } else{
        let nuevo=this.state.nuevo;
        let fb= new bd();
        nuevo={nombre:n,tipo:t,pago:p}
        fb.agregarItem(nuevo,'liga');
      }
    }


    render() {
        return (   
    
          <Container>
         <Content>
          
         <Item floatingLabel>
                <Label>Nombre de la liga</Label>
                <Input 
                 autoCorrect={false}
                  autoCapitalize="none" 
                  onChangeText={(nombre)=>this.setState({nombre})}
                 /*onChangeText={(nuevo)=>this.setState({nuevo})}*/ />
          </Item>


          <ListItem>
            <Text>Pago     </Text>
            <Right>
              <Radio selected={this.state.tipo=='pago'} onPress={()=>this.setState({tipo:'pago'})}/>
            </Right>
          </ListItem>
          <ListItem>
          <Text>Diversión</Text>
            <Right>
              <Radio selected={this.state.tipo=='diversion'} onPress={()=>this.setState({tipo:'diversion'})}/>
            </Right>
          </ListItem>

          <Item floatingLabel>
                <Label>Pago</Label>
                <Input 
                 autoCorrect={false}
                  autoCapitalize="none" 
                  onChangeText={(pago)=>this.setState({pago})}
                 /*onChangeText={(nuevo)=>this.setState({nuevo})}*/ />
          </Item>

          <Button style={{marginTop: 10}}full success 
              onPress={()=>this.validar(this.state.nombre,this.state.tipo,this.state.pago)}>
               <Text > Crear </Text>
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