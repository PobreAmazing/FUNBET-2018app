import { StyleSheet, View } from 'react-native';
import React, { Component } from 'react';
import {Footer,FooterTab,Icon, Button, ScrollView, Container, Header, Content,List, ListItem, Text, Radio, Right, Left, Label, Item, Input } from 'native-base';

import Bd from '../bd';
import { LigaScreen, equipoScreen,calendarioStack,miPerfilStack, noticiasStack, loginStack, posicioneScreen } from '../../Screennames';

export default class Perfil extends React.Component {

    constructor(props){
      super(props)
  
      this.state=({
        lista:[ ],
        user:''
      })
    }

    static navigationOptions = {
      title: 'Mi perfil',
    };

    listenForItems = (itemsRef) => {
        itemsRef.on('value', (snap) => {
    
          // get children as an array
          var lista = [];
          snap.forEach((child) => {
            lista.push({
              liga: child.val().liga,
              equipo: child.val().equipo,  
              puntos: child.val().puntos
            });
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
        //alert("hola");
      }

    render() {
     // const { navigation } = this.props;
      let fb= new Bd(); 
      const user = fb.obtenerusuario(); 
      //alert(user);
      //this.setState({user:user});
        return (   
    
          <Container style={styles.container}>       
        <Content>  
              
        <Label style={{color:'white'}}>Mis equipos</Label>       

        <Button style={{marginTop: 10}}
              full        
              primary
              onPress={()=>this.props.navigation.navigate('LigaScreen',{user:user})}>
              
              
               <Text style={{color:'white'}}> crear liga </Text>
              </Button>

        <Button style={{marginTop: 10}}
              full        
              primary
              onPress={()=>this.props.navigation.navigate('equipoScreen')}>
              
              
               <Text style={{color:'white'}}> añadir equipo </Text>
              </Button>

        <Button style={{marginTop: 10}}
              full        
              primary
              onPress={()=>this.props.navigation.navigate('posicioneScreen')}>
              
              
               <Text style={{color:'white'}}> Ver puntaje </Text>
              </Button>

        <Button style={{marginTop: 10}}
              full        
              primary
              onPress={()=>this.props.navigation.navigate('loginStack')}>
              
              
               <Text style={{color:'white'}}> Cerrar Sesión </Text>
              </Button>
                  
        </Content>
        <Footer>
      <FooterTab>
        <Button vertical>
          <Icon name="bluetooth" onPress={()=>this.props.navigation.navigate('noticiasStack')}/>
          <Text>Noticias</Text>
        </Button>
        <Button vertical onPress={()=>this.props.navigation.navigate('calendarioStack')}>
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