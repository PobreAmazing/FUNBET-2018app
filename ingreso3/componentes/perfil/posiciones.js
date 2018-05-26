import { StyleSheet, View } from 'react-native';
import React, { Component } from 'react';
import { Picker, Icon, Footer, FooterTab, Button, ScrollView, Container, Header, Content, List, ListItem, Text, Radio, Right, Left, Label, Item, Input } from 'native-base';

import Bd from '../bd';
import {vaticinioScreen, calendarioStack, miPerfilStack } from '../../Screennames';

export default class Posiciones extends React.Component {

  constructor(props) {
    super(props)

    this.state = ({
      lista: [],
      listapartidos:[],
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
      puntos: 0,
      iniciado: 0
    })
  }

  static navigationOptions = {
    title: 'Posiciones'
  };


  listar = (itemsRef,usuario) => {
   // const fa = this.state.fechaseleccionada;
    itemsRef.on('value', (snap) => {

      // get children as an array
      var lista = [];
      snap.forEach((child) => {
        //if(child.val().fecha==fa){
          if(usuario==child.val().user){
        lista.push({
          nombre: child.val().nombre,
          punteo: child.val().punteo,
          //pago: child.val().pago,
          // done: child.val().done,  
          id: child.key
          //alert(id+" "+nombre);
        });
      }
        //}
        //alert(lista);
      });

      this.setState({
        lista: lista
      });

    });
  }

  actualizarpunteoequipo=(id,puntos)=>{
    let fb=new Bd();
    let update={};
    var acumulado=0;
    
    const puntaje=fb.mostrar('equipos/'+id);

    puntaje.on('value',(snap)=>{
      acumulado=snap.val().punteo;
      acumulado=acumulado+puntos;
      update['equipos/'+snap.key+'/punteo']=acumulado;
    });
    fb.actualizar(update);
   // alert("ya actualizamos "+id);
    //alert("ya actualizamos "+id);
  }

  comparar=(id,r1,r2)=>{
    //alert("va aca");
    let fb=new Bd();
    var vaticinio1=0;
    var vaticinio2=0;
    var puntos=0;
    var llave="";
    let update={};
    const vaticinios=fb.mostrar('vaticinios/'+id);

    vaticinios.on('value', (snap) => {
       
        
      // get children as an array
      var lista = [];
      snap.forEach((child) => {
      
      vaticinio1=child.val().resultado1;
      vaticinio2=child.val().resultado2;
      llave=child.key;
      
      //resultado exacto
      if(r1==vaticinio1 && r2==vaticinio2){
        puntos=3;
      }

      //resultado con acierto (empate)
      else if(r1==r2 && vaticinio1==vaticinio2){      
          puntos=1;
      }
      
      else if(r1>r2 && vaticinio1>vaticinio2){
        puntos=1;
      }

      else if (r1<r2 && vaticinio1<vaticinio2){
        puntos=1;
      }

      //resultado adverso
      else{
        puntos=0;
      }
     // alert("puntos: "+puntos);
      this.actualizarpunteoequipo(llave,puntos);
      });

    });
  }

  terminarpartidos=(itemsRef)=>{
    let fb= new Bd();
    //let update={};
    var key="";
    itemsRef.on('value', (snap) => {

      // get children as an array
      var lista = [];
      snap.forEach((child) => {
         key=child.key;
         if(child.val().estado=="finalizado"){
          // alert('hay uno terminado');
           this.comparar(child.key,child.val().resultado1,child.val().resultado2);
          // update['partidos/'+child.key+'/estado']="finalizado";
         }
        });
       // fb.actualizar(update);
      });
  }

  reiniciar = (itemsRef) =>{
    let fb= new Bd();
    let update={};
   // var key="";
    itemsRef.on('value', (snap) => {

      
      var lista = [];
      snap.forEach((child) => {
         //key=child.key;
         
          
         update['equipos/'+child.key+'/punteo']=0;
          
         
        });
       
      });

      fb.actualizar(update);
  }

componentDidMount() {
    let fb= new Bd();
    const reiniciar = fb.mostrar('equipos');
    this.reiniciar(reiniciar);
    this.reiniciar(reiniciar);
    const itemsRef = fb.mostrar('partidos');
    this.terminarpartidos(itemsRef);
    const tabla=fb.mostrar('equipos');
    const usuario=fb.obtenerusuario();
    this.listar(tabla,usuario);
    //alert("hola");
  }


  render() {
    /* const f=this.state.diaactual;
     const m=this.state.mesactual;
     const fa= f+"/"+m+"/2018";*/
    //alert(fa);
    return (
      <Container style={styles.container}>

        <Content>



          {this.state.lista.map((item, key) => (
            <List>

              <ListItem itemDivider>
                <Text>{item.nombre}  {item.punteo}</Text>
              </ListItem>
            </List>
          ))}
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