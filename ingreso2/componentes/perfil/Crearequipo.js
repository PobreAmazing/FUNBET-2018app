import { StyleSheet, View } from 'react-native';
import React, { Component } from 'react';
import {pagoScreen} from '../../Screennames';
import { Picker, Container, Header, Content, ListItem, Text, Radio, Right, Left, Label, Item, Input, Button } from 'native-base';
//import {Picker} from 'react-native-dynamic-picker';

import bd from '../bd';

export default class Crearequipo extends React.Component {

    constructor(props){
      super(props)
  
      this.state=({
        lista: [
            {nombre:'',
            id: null}
        ],

        valor: 'Seleccionar',
        nombre: '',       
        punteo:0,
        pago:0
      })
    }

    

    static navigationOptions = {
      title: 'Crear equipo',
    };
     
    validar=(n)=>{
      if(n==''){
        alert('Ingrese un nombre');}
      else{
        /*const val= this.state.valor;
        let nuevo=this.state.nuevo;
        let fb= new bd();
        nuevo={nombre:n,punteo:this.state.punteo}
        fb.agregarItem(nuevo,'liga/'+val+'/equipos');*/
        //alert(nuevaclave);
        this.props.navigation.navigate('pagoScreen',{valor:this.state.valor,nombre:this.state.nombre})
      }
    }

    listenForItems = (itemsRef) => {
        itemsRef.on('value', (snap) => {
    
          // get children as an array
          var lista = [];
          snap.forEach((child) => {
            lista.push({
              nombre: child.val().nombre,
              pago: child.val().pago,
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
              
            <Picker
            selectedValue={this.state.valor}
 
            onValueChange={(itemValue, itemIndex) => this.setState({valor: itemValue})} >
             <Picker.Item label="Seleccionar" value="Seleccionar"  />
            { this.state.lista.map((item, key)=>(
            <Picker.Item label={item.nombre} value={item.id}  />)
            )}
    
          </Picker>

            <Item floatingLabel>
                <Label>Nombre del equipo</Label>
                <Input autoCorrect={false}
                 autoCapitalize="none"
                 onChangeText={(nombre)=>this.setState({nombre})}
                 />            
            </Item>

                <Button style={{marginTop: 10}}full success 
                       onPress={()=>this.validar(this.state.nombre)} /*this.props.navigation.navigate('pagoScreen',{val:this.state.valor,nom:this.state.nombre}) }*/>
                          <Text > Generar pago</Text>
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