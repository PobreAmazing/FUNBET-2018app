import { StyleSheet, View } from 'react-native';
import React, { Component } from 'react';
import { Picker, Icon, Footer, FooterTab, Button, ScrollView, Container, Header, Content, List, ListItem, Text, Radio, Right, Left, Label, Item, Input } from 'native-base';

import Bd from '../bd';
import {vaticinioScreen, calendarioStack, miPerfilStack, noticiasStack } from '../../Screennames';

export default class Noticias extends React.Component {

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
    title: 'Noticias'
  };

  validarvaticinio = (dia, mes, hora, minuto, id, seleccion1, seleccion2, detalle) => {
    const diaactual= new Date().getDate();
    const mesactual= new Date().getMonth()+1;
    const horaactual= new Date().getHours();
    const minutoactual=new Date().getMinutes();
    //alert(horaactual+":"+minutoactual);
    var min=parseInt(minuto);
    var resta=0;

    if(mesactual<mes){
      this.props.navigation.navigate('vaticinioScreen',{id:id,seleccion1: seleccion1, seleccion2: seleccion2,detalle: detalle});
    }


    else if(mesactual==mes){
      if(diaactual==dia){

        if(horaactual==hora-1){               
          min=min+60;        
          resta=min-minutoactual;
          //alert(resta);
          if(resta>=15){
            this.props.navigation.navigate('vaticinioScreen',{id:id,seleccion1: seleccion1, seleccion2: seleccion2,detalle: detalle});
          }
          else{
            alert("No es posible generar un vaticinio para este partido");
          }
        }

        else if(horaactual<hora-1){
          this.props.navigation.navigate('vaticinioScreen',{id:id,seleccion1: seleccion1, seleccion2: seleccion2,detalle: detalle});
        }

        else if(horaactual==hora){
          if(minutoactual<=min){
            this.props.navigation.navigate('vaticinioScreen',{id:id,seleccion1: seleccion1, seleccion2: seleccion2,detalle: detalle});
          }
          else{
            alert("No es posible generar un vaticinio para este partido");
          }
        }

        else{
          alert("No es posible generar un vaticinio para este partido");
        }
      }
      else if(diaactual<dia){
        this.props.navigation.navigate('vaticinioScreen',{id:id,seleccion1: seleccion1, seleccion2: seleccion2,detalle: detalle});
      }
      else{
        alert("No es posible generar un vaticinio para este partido");
      }
    }


    else{
      alert("No es posible generar un vaticinio para este partido");
    }
  }
/*
  iniciarpartidos=(itemsRef,hora,minuto,dia,mes)=>{
    //alert('llego');
    var min = 0;
    let fb= new Bd();
    let update={};
    itemsRef.on('value', (snap) => {

      // get children as an array
      var lista = [];
      snap.forEach((child) => {
         min=parseInt(child.val().minuto);
         if(child.val().hora==hora && min==minuto && child.val().dia==dia && child.val().mes==mes){
          // alert('hay uno');
           update['partidos/'+child.key+'/estado']="en juego";
         }
        });
        fb.actualizar(update);
      });
  }*/

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
  }

  comparar=(id,r1,r2)=>{
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

      this.actualizarpunteoequipo(llave,puntos);
      });

    });
  }

  terminarpartidos=(itemsRef)=>{
    let fb= new Bd();
    let update={};
    var key="";
    itemsRef.on('value', (snap) => {

      // get children as an array
      var lista = [];
      snap.forEach((child) => {
         key=child.key;
         if(child.val().estado==""){
           alert('hay uno terminado '+key);
           //this.comparar(child.key,child.val().resultado1,child.val().resultado2);
           update['partidos/'+child.key+'/estado']="finalizado";
         }
        });
        fb.actualizar(update);
      });
  }

  /*actualizarpunteoequipo=(id,puntos)=>{
    let fb=new Bd();
    let update={};
    var acumulado=0;
    const puntaje=fb.mostrar('equipos/'+id);

    puntaje.on('value',(snap)=>{
      acumulado=snap.val().punteo;
      console.log(acumulado);
      acumulado=acumulado+puntos;
      console.log(acumulado);
      update['equipos/'+snap.key+'/punteo']=acumulado;
    });
    fb.actualizar(update);
  }

  comparar=(itemsRef,r1,r2)=>{
    let fb=new Bd();
    //const r1=this.state.resultado1;
    //const r2=this.state.resultado2;
    var vaticinio1=0;
    var vaticinio2=0;
    //var puntos=0;
    var llave="";
    let update={};
    //const vaticinios=fb.mostrar('vaticinios/'+id);

    itemsRef.on('value', (snap) => {
       
        
      // get children as an array
      var lista = [];
      snap.forEach((child) => {
      
      vaticinio1=child.val().resultado1;
      vaticinio2=child.val().resultado2;
      llave=child.key;
      
      //resultado exacto
      if(r1==vaticinio1 && r2==vaticinio2){
        this.setState({puntos:3});
      }

      //resultado con acierto (empate)
      else if(r1==r2 && vaticinio1==vaticinio2){      
        this.setState({puntos:1});
      }
      
      else if(r1>r2 && vaticinio1>vaticinio2){
        this.setState({puntos:1});
      }

      else if (r1<r2 && vaticinio1<vaticinio2){
        this.setState({puntos:1});
      }

      //resultado adverso
      else{
        this.setState({puntos:0});
      }
      
      const points= this.state.puntos;
      console.log(llave+' puntos: '+points);
      //this.actualizarpunteoequipo(llave,puntos);
      });

    });
  }

   resultadosfinales=(itemsRef)=>{
   var contador=0;
   var llave="";
     itemsRef.on('value', (snap) => {

      // get children as an array
      var lista = [];
      snap.forEach((child) => {
        if(child.val().estado==""){
         contador++;
         this.setState({resultado1:child.val().resultado1,resultado2:child.val().resultado2,id:child.key});
         }
      });
        
    });

    alert(contador+" "+llave);
    //return llave;
  }*/
   
   iniciarpartidos=(itemsRef,hora,minuto,dia,mes)=>{
    //alert('llego');
    var min = 0;
    let fb= new Bd();
    let update={};
    //var llave=this.state.id;
    //console.log(llave);
    itemsRef.on('value', (snap) => {

      // get children as an array
     // var lista = [];
      snap.forEach((child) => {
         min=parseInt(child.val().minuto);
         if(child.val().hora==hora && min==minuto && child.val().dia==dia && child.val().mes==mes){
           //alert("comienza un nuevo juego");
           this.setState({id:child.key,iniciado:1});
           update['partidos/'+child.key+'/estado']="en juego";
           //const llave=this.state.id;
           //alert(llave);
         }

         /*else if(child.val().estado=="finalizado" && child.key==llave && iniciado==1){
           console.log("a comparar");
           const itemsRef = fb.mostrar('vaticinios/'+llave);
           this.comparar(itemsRef,child.val().resultado1,child.val().resultado2);
           this.setState({iniciado:0});
           //update['partidos/'+child.key+'/estado']="finalizado";
         }*/
        });
        
      });
      fb.actualizar(update);
  }


  tiempo = () => {
    setInterval(() => {
      this.setState(
        {
          horaactual: new Date().getHours(),
          minutoactual: new Date().getMinutes(),
          diaactual: new Date().getDate(),
          mesactual: new Date().getMonth()+1
        })
    }, 60000);
    
  }

  listenForItems = (itemsRef) => {
    
    itemsRef.on('value', (snap) => {

      // get children as an array
      var lista = [];
      snap.forEach((child) => {
        //if(child.val().fecha==fa){
        lista.push({

          titulo: child.val().titulo,
          fecha: child.val().fecha,
          contenido: child.val().contenido,
          //pago: child.val().pago,
          // done: child.val().done,  
          id: child.key
          //alert(id+" "+nombre);
        });
        //}
        //alert(lista);
      });

      this.setState({
        lista: lista
      });

    });
  }

  componentDidMount() {

    //this.tiempo();
    let fb = new Bd();
    const itemsRef = fb.mostrar('noticias');
    this.listenForItems(itemsRef);
    //alert(f);
    // alert(horaactual+" "+minutoactual);
    // this.refs['ligas'].showPicker(true);
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
                <Text>{item.titulo}: </Text>
              </ListItem>
              <ListItem >
                <Text style={{color:'white'}}>{item.fecha} </Text>
              </ListItem>
              <ListItem>
                <Text style={{color:'white'}}>{item.contenido}</Text>
              </ListItem>             
            </List>
          ))}
        </Content>
        <Footer>
          <FooterTab>
            <Button vertical onPress={() => this.props.navigation.navigate('noticiasStack')}>
              <Icon name="bluetooth" />
              <Text>Noticias</Text>
            </Button>
            <Button vertical onPress={() => this.props.navigation.navigate('calendarioStack')}>
              <Icon name="calendar" />
              <Text>Calendario</Text>
            </Button>
            <Button vertical active onPress={()=>this.props.navigation.navigate('miPerfilStack')}>
              <Icon active name="person" />
              <Text>Mi perfil</Text>
            </Button>
          </FooterTab>
        </Footer>
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