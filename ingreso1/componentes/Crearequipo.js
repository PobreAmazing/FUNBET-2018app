import { StyleSheet, View } from 'react-native';
import React, { Component } from 'react';
import ListComponent from './ListComponent';
import { Picker, Container, Header, Content, ListItem, Text, Radio, Right, Left, Label, Item, Input, Button } from 'native-base';
//import {Picker} from 'react-native-dynamic-picker';

import bd from './bd';

export default class Crearliga extends React.Component {

    constructor(props){
      super(props)
  
      this.state=({
        lista: [
            {nombre:'',
            id: null}
        ],

        valor: '',
        equipo:''
      })
    }

    

    static navigationOptions = {
      title: 'Crear equipo',
    };
     
    /*validar=(n,t,p)=>{
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
    }*/

    listenForItems = (itemsRef) => {
        itemsRef.on('value', (snap) => {
    
          // get children as an array
          var lista = [];
          snap.forEach((child) => {
            lista.push({
              nombre: child.val().nombre,
             // done: child.val().done,  
              id: child.key
              //alert(id+" "+nombre);
            });
            alert(lista);
          });
    
          this.setState({
            lista: lista
          });
    
        });
      }

    componentDidMount() {
        let fb = new bd();
        const itemsRef = fb.mostrar('liga');
        this.listenForItems(itemsRef);
       // this.refs['ligas'].showPicker(true);
      }


    render() {
        return (   
    
          <Container>
         <Content>
          
         
            <Label>liga</Label>
              
            <Picker selectedValue={this.state.valor} onValueChange={(itemValue, itemIndex) => this.setState({valor: itemValue})}> 
               
            { this.state.lista.map((item)=>(
            <Picker.Item label={item.nombre} value={item.id} />)
            )}

            </Picker>

            <Item floatingLabel>
                <Label>Nombre del equipo</Label>
                <Input autoCorrect={false}
                 autoCapitalize="none"
                 onChangeText={(equipo)=>this.setState({equipo})}
                /*onChangeText={(nuevo)=>this.setState({nuevo})}*/ />            
                </Item>

                <Button style={{marginTop: 10}}full success 
              /*onPress={()=>this.loginUser(this.state.email,this.state.password)}*/>
               <Text > Generar pago</Text>
              </Button>
           
                <Button style={{marginTop: 10}}full success 
              /*onPress={()=>this.loginUser(this.state.email,this.state.password)}*/>
               <Text > Guardar </Text>
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