import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './componentes/Login';
import Crearliga from './componentes/Crearliga';
import Crearequipo from './componentes/Crearequipo';
import Pago from './componentes/Botonpago';
import Perfil from './componentes/Perfil';
import { createStackNavigator, createSwitchNavigator} from 'react-navigation';
import bd from './componentes/bd';


/*import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyABLK8pBAkULeoUiaESv2i7BaltenVJD-M",
  authDomain: "autenticacion-8c15b.firebaseapp.com",
  databaseURL: "https://autenticacion-8c15b.firebaseio.com",
  projectId: "autenticacion-8c15b",
  storageBucket:""
};
firebase.initializeApp(firebaseConfig);*/

import {Container,Content,Header,Form,Input,Item,Button,Label, Footer} from 'native-base';
import {LoginScreen,LigaScreen,equipoScreen,pagoScreen,bdScreen,perfilScreen,calendarioScreen,infoScreen,loginStack,miPerfilStack} from './Screennames';


const RootStack = createStackNavigator(
  {  
    LoginScreen: {screen:Login},
   // perfilScreen: {screen:Perfil}
   /* LigaScreen: {screen:Crearliga},
    bdScreen: {screen:bd},
    infoScreen:{screen:Crearequipo}*/
  }/*,
  {
    initialRouteName: 'LoginScreen'
  }*/
);

const perfilStack = createStackNavigator({
  perfilScreen: {screen:Perfil},
  LigaScreen: {screen:Crearliga},
  equipoScreen: {screen:Crearequipo},
  pagoScreen: {screen:Pago}
}
);

const cambioStack=createSwitchNavigator({
  loginStack: RootStack,
  miPerfilStack: perfilStack
})

/*const MenuStack = createStackNavigator(
  {
    perfilScreen: {screen:Perfil}
  }
);*/

    /*ingresar=()=>{
      
      alert('esta aqui');
      let fb=new bd();
      validado=()=>fb.loginUser(this.state.email,this.state.password,loggeado);
      if(validado){
        () => this.props.navigation.push('League');
        alert('validado');}
        else{
          alert('no validado');
        }
    }*/

  






export default createSwitchNavigator (
 { loginStack: RootStack,
  miPerfilStack: perfilStack},
  {
    initialRouteName: 'loginStack',
  }

);




/*
  componentDidMount(){
    firebase.auth().onAuthStateChanged((user)=>{
      if(user!=null){
        console.log(user)
      }
    })
  }

  signUpUser = (email,password) => {
    try{
                  

      firebase.auth().createUserWithEmailAndPassword(email,password);
    }
    catch(error) {
      console.log(error.toString())
    }
  }

  loginUser = (email,password) => {
      try{
       firebase.auth().signInWithEmailAndPassword(email,password)
       .then(function (user){
         console.log(error.toString())
       })
      }
      catch(error){
        console.log(error.toString())
      }
  }   
  
  async loginWithFacebook(){
    const {type,token} = await Expo.Facebook.logInWithReadPermissionsAsync
    ('1060081197484362',{permissions: ['public_profile']})

    if (type == 'success'){

    const credential=firebase.auth.FacebookAuthProvider.credential(token)

    firebase.auth().signInWithCredential(credential).catch((error) =>{
      console.log(error)
    })
  }
  }

  listenForItems = (itemsRef) => {
    itemsRef.on('value', (snap) => {

      // get children as an array
      //var lista = [];
      snap.forEach((child) => {    
        console.log(child.key+" "+child.val())
      });
    });
    }

  agregarItem = (nuevo,tabla) => {
    let cadena = this.state.nuevo
    cadena = {name:nuevo};
    const ingresa=firebase.database().ref(tabla).push(cadena);
    alert(ingresa.key);
   // this.state.lista.push(nuevo);
   // this.setState({lista: this.state.lista}); 
    console.log(nuevo);
}

componentDidMount() {
  const itemsRef = firebase.database().ref('items');
  this.listenForItems(itemsRef);
}*/

  
  
  /*( 
  

      <Container style={styles.container}>
        <Form>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input autoCorrect={false}
             autoCapitalize="none"
            // onChangeText={(email)=>this.setState({email})}
            onChangeText={(nuevo)=>this.setState({nuevo})}/>            
            </Item>

          <Item floatingLabel>
            <Label>Password</Label>
            <Input 
             secureTextEntry={true}
             autoCorrect={false}
              autoCapitalize="none" 
             // onChangeText={(password)=>this.setState({password})}
             onChangeText={(nuevo)=>this.setState({nuevo})} />
          </Item>

          <Button style={{marginTop: 10}}full success 
          onPress={()=>this.loginUser(this.state.email,this.state.password)}>
           <Text > Login </Text>
          </Button>

           <Button style={{marginTop: 10}}
          full        
          primary
          //onPress={()=>this.signUpUser(this.state.email,this.state.password)}>
          onPress={()=>this.agregarItem(this.state.nuevo,'equipo')}>
          
           <Text style={{color:'white'}}> Insertar equipo </Text>
          </Button>

          <Button style={{marginTop: 10}}
          full        
          primary
          //onPress={()=>this.loginWithFacebook()} >
          onPress={()=>this.agregarItem(this.state.nuevo,'liga')}>
          
           <Text style={{color:'white'}}> Insertar liga </Text>
          </Button>
           
      

        </Form>
        </Container>*/
       
    
  


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 10
  },
});
