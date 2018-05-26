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
    title: 'Calendario'
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
    const fa = this.state.fechaseleccionada;
    itemsRef.on('value', (snap) => {

      // get children as an array
      var lista = [];
      snap.forEach((child) => {
        //if(child.val().fecha==fa){
        lista.push({
          detalle: child.val().detalle,
          resultado1: child.val().resultado1,
          resultado2: child.val().resultado2,
          seleccion1: child.val().seleccion1,
          seleccion2: child.val().seleccion2,
          dia: child.val().dia,
          mes: child.val().mes,
          estado: child.val().estado,
          hora: child.val().hora,
          minuto: child.val().minuto,
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

  componentWillMount() {

    this.tiempo();
    let fb = new Bd();
    const itemsRef = fb.mostrar('partidos');
    this.listenForItems(itemsRef);
    //alert(f);
    // alert(horaactual+" "+minutoactual);
    // this.refs['ligas'].showPicker(true);
  }

  componentDidUpdate(){
    /*const ha = this.state.horaactual;
    const mina = this.state.minutoactual;
    const da = this.state.diaactual;
    const ma = this.state.mesactual;*/

   // alert(ha+":"+mina);
   const hora=new Date().getHours();
   const minuto=new Date().getMinutes();
   const dia=new Date().getDate();
   const mes=new Date().getMonth()+1;
   const contador=0;
    let fb= new Bd();
    const partidos=fb.mostrar('partidos');
    alert(hora+":"+minuto);
    let update={};
    //var llave=this.state.id;
    //console.log(llave);
    partidos.on('value', (snap) => {

      // get children as an array
     // var lista = [];
      snap.forEach((child) => {
         min=parseInt(child.val().minuto);
         if(child.val().hora==hora && min==minuto && child.val().dia==dia && child.val().mes==mes){
           //alert("comienza un nuevo juego");
           update['partidos/'+child.key+'/estado']="en juego";
           //contador=contador+1;
           //contador++;
         }
        });
        
      });
      fb.actualizar(update);
      //if(contador>0)
       //alert("Comienza partido(s)");
    
  }

  render() {
    /* const f=this.state.diaactual;
     const m=this.state.mesactual;
     const fa= f+"/"+m+"/2018";*/
    //alert(fa);
    return (
      <Container>

        <Content>



          {this.state.lista.map((item, key) => (
            <List>

              <ListItem itemDivider>
                <Text>{item.detalle}  {item.dia}/{item.mes}/2018 {item.hora}:{item.minuto}</Text>
              </ListItem>
              <ListItem >
                <Text>{item.seleccion1} {item.resultado1} = {item.resultado2} {item.seleccion2}</Text>
              </ListItem>
              <ListItem>
                <Text>{item.estado}</Text>
              </ListItem>
              <Button style={{ marginTop: 10 }} full success
                onPress={() => this.validarvaticinio(item.dia, item.mes, item.hora, item.minuto, item.id, item.seleccion1, item.seleccion2, item.detalle)} >
                <Text > Vaticinar </Text>
              </Button>
            </List>
          ))}
        </Content>
        <Footer>
          <FooterTab>
            <Button vertical onPress={() => this.props.navigation.navigate('miPerfilStack')}>
              <Icon name="bluetooth" />
              <Text>Noticias</Text>
            </Button>
            <Button vertical onPress={() => this.props.navigation.navigate('calendarioStack')}>
              <Icon name="calendar" />
              <Text>Calendario</Text>
            </Button>
            <Button vertical active /*onPress={()=>this.props.navigation.navigate('pagoScreen')}*/>
              <Icon active name="person" />
              <Text>Mi perfil</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }

}