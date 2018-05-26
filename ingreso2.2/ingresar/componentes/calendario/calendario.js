import { StyleSheet, View } from 'react-native';
import React, { Component } from 'react';
import { Picker, Icon, Footer, FooterTab, Button, ScrollView, Container, Header, Content, List, ListItem, Text, Radio, Right, Left, Label, Item, Input } from 'native-base';

import Bd from '../bd';
import {vaticinioScreen, calendarioStack, miPerfilStack } from '../../Screennames';

export default class Calendario extends React.Component {

  constructor(props) {
    super(props)

    this.state = ({
      lista: [],
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
      fecha: '',
      fechaseleccionada: 'Seleccionar'
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

  tiempo = () => {
    setInterval(() => {
      this.setState(
        {
          horaactual: new Date().getHours(),
          minutoactual: new Date().getMinutes()
        })
    }, 60000);
    const horaactual = this.state.horaactual;
    const minutoactual = this.state.minutoactual;
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

  /*componentDidUpdate(){
    let fb = new Bd();
    const itemsRef = fb.mostrar('partidos');
    this.listenForItems(itemsRef);
  }*/

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
              <Icon name="noticias" />
              <Text>Noticias</Text>
            </Button>
            <Button vertical onPress={() => this.props.navigation.navigate('calendarioStack')}>
              <Icon name="calendario" />
              <Text>Calendario</Text>
            </Button>
            <Button vertical active /*onPress={()=>this.props.navigation.navigate('pagoScreen')}*/>
              <Icon active name="perfil" />
              <Text>Mi perfil</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }

}