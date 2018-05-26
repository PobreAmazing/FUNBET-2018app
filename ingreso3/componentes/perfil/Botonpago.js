import { StyleSheet, View } from 'react-native';
import React, { Component } from 'react';  
import {equipoScreen} from '../../Screennames';
import { Input, Label, Item, Button, Container, Content, List, ListItem, Text, Icon, Badge, Left, Body, Right, Switch, Picker } from 'native-base';
import Bd from '../bd';  



export default class Botonpago extends React.Component { 

    constructor(props){
        super(props)
    
        this.state=({
          lista: [             
          ],   
          nuevo:'',
          nombre: '',         
          punteo: 0,      
          pago:0,
          colocartarjeta:'',
          marca:'MasterCard',
          fechavencimiento: ''
        })
      }
    
    static navigationOptions = {
        title: 'Generar pago',
      };

      validar=()=>{
        const { navigation } = this.props; 
        const nombre = navigation.getParam('nombre','NO-NAME');
        const val = navigation.getParam('valor','NO-VALUE');
        const pago=this.state.pago;
        const tarjeta= this.state.tarjeta;
        const fechavencimiento= this.state.fechavencimiento;
        if(pago!=0 && (tarjeta==''||fechavencimiento=='')){
          alert('Llene todos los campos');
        }
        else if(pago!=0 && (tarjeta.length != 16)){
          alert('Número de tarjeta incorrecto');}
        else{
          //const val= this.state.valor;
          let nuevo=this.state.nuevo;
          const diafechavencimiento= '1-'+fechavencimiento;
          let fb= new Bd();
          const user = fb.obtenerusuario();
          nuevo={user:user,nombre:nombre,punteo:this.state.punteo,liga:val}
          const key=fb.agregarItem(nuevo,'equipos',0);
          alert('clave: '+key);
          nuevo={user:user,tarjeta:tarjeta,fechavencimiento:diafechavencimiento,pago:pago,marca:this.state.marca}
          const key2=fb.agregarItem(nuevo,'transacciones',key);
          alert('clave2: '+key2);
        }
      }

      listenForItems = (itemsRef) => {
        itemsRef.on('value', (snap) => {
         // alert(snap.val().pago);
          this.setState({pago:snap.val().pago});
          if(snap.val().pago==0){
            this.setState({colocartarjeta:'(no es necesario que escriba el número tarjeta de crédito)'});
          }
          else{
            this.setState({colocartarjeta:''});
          }
        });
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
              <Container style={styles.container}>
                  <Content>
                  <Text style={{color:'white'}}>Equipo: {JSON.stringify(nom)}{'\n'}</Text>
                  <Text style={{color:'white'}}>Monto a pagar: {this.state.pago}  {this.state.colocartarjeta}</Text>

                  <Item floatingLabel>
                <Label style={{color:'white'}}>Número de tarjeta</Label>
                <Input autoCorrect={false}
                 autoCapitalize="none"
                 style={{color:'white'}}
                 onChangeText={(tarjeta)=>this.setState({tarjeta})}
                /*onChangeText={(nuevo)=>this.setState({nuevo})}*/ />            
                </Item>

                 
                <Label style={{color:'white'}}>Marca</Label>
                <Picker selectedValue={this.state.marca} 
                 onValueChange={(itemValue, itemIndex) => this.setState({marca: itemValue})}>
                   <Picker.Item label="MasterCard" value="MasterCard" /> 
                   <Picker.Item label="Visa" value="Visa" /> 
                   <Picker.Item label="AmericanExpress" value="AmericanExpress" /> 
                 </Picker>        
               
                
                
                <Item floatingLabel>
                <Label style={{color:'white'}}>Fecha de vencimiento(MM-AAAA)</Label>
                <Input autoCorrect={false}
                 autoCapitalize="none"
                 style={{color:'white'}}
                 onChangeText={(fechavencimiento)=>this.setState({fechavencimiento})}
                /*onChangeText={(nuevo)=>this.setState({nuevo})}*/ />            
                </Item>

                  
                
                   
                    <Button style={{marginTop: 10}}full success
                       onPress={()=>this.validar()}>
                          <Text > Registrar equipo</Text>
                   </Button>  
                  </Content>
                </Container>             
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b71c1c',
    justifyContent: 'center',
    padding: 10
  },
});
