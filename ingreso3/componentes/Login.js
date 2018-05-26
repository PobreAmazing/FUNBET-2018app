import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import {Icon,Container,Content,Header,Form,Input,Item,Button,Label} from 'native-base';
//import Liga from './Crearliga';
import bd from './bd';
import {miPerfilStack,calendarioStack,noticiasStack} from '../Screennames';
import * as firebase from 'firebase';



export default class Login extends React.Component {

    constructor(props){
      super(props)
      this.state=({
        email: '',
        password: '',
        nuevo: '',
        tabla: '',
        usuario:'',
        errorMessage: null
      })
    }

    static navigationOptions = {
      title: 'Login',
    };

    loginUser = (email,password) => {
      
      const credential=firebase.auth.EmailAuthProvider.credential(email,password)

      firebase.auth().signInAndRetrieveDataWithCredential(credential)
      .then(this.setState({usuario:firebase.auth().currentUser.uid}),
       alert('Bienvenido'+this.state.usuario),
       alert('Bienvenido'+this.state.usuario),     
       this.props.navigation.navigate(/*'miPerfilStack'*/'noticiasStack'))          
     .catch(error=> this.setState({errorMessage:error.message}))         
     }

     async loginWithFacebook(){
      const {type,token} = await Expo.Facebook.logInWithReadPermissionsAsync
      ('1060081197484362',{permissions: ['public_profile']})
  
      if (type == 'success'){
  
      const credential=firebase.auth.FacebookAuthProvider.credential(token)
  
      firebase.auth().signInAndRetrieveDataWithCredential(credential)
      .then( this.setState({usuario:firebase.auth().currentUser.displayName}),
      alert('Bienvenido'+this.state.usuario),this.props.navigation.navigate(/*'miPerfilStack'*/'noticiasStack'))
      .catch((error) =>{ console.log(error)})
    }
    }

    async loginWithGoogle(){
      const {type,token} = await Expo.Facebook.logInWithReadPermissionsAsync
      ('1060081197484362',{permissions: ['public_profile']})
  
      if (type == 'success'){
  
      const credential=firebase.auth.FacebookAuthProvider.credential(token)
  
      firebase.auth().signInAndRetrieveDataWithCredential(credential)
      .then( this.setState({usuario:firebase.auth().currentUser.displayName}),
      alert('Bienvenido'+this.state.usuario),this.props.navigation.navigate('miPerfilStack'))
      .catch((error) =>{ console.log(error)})
    }
    }


    

    componentDidMount(){
        let fb = new bd();
        fb.confirmar();
      }

    render() {
         let fb = new bd();
        return (  
          
          <Container style={styles.container}>
          
            <Form>
              <Item floatingLabel>
                <Label style={{color:'white'}}>Email</Label>
                <Input autoCorrect={false}
                style={{color:'white'}}
                 autoCapitalize="none"
                 onChangeText={(email)=>this.setState({email})}
                /*onChangeText={(nuevo)=>this.setState({nuevo})}*/ />            
                </Item>
    
              <Item floatingLabel>
                <Label style={{color:'white'}}>Password</Label>
                <Input 
                 secureTextEntry={true}
                 autoCorrect={false}
                  autoCapitalize="none"
                  style={{color:'white'}} 
                  onChangeText={(password)=>this.setState({password})}
                 /*onChangeText={(nuevo)=>this.setState({nuevo})}*/ />
              </Item>
    
              <Button style={{marginTop: 10, backgroundColor:"#ffff"}}full  
              onPress={()=>this.loginUser(this.state.email,this.state.password)}>
               <Text > Login </Text>
              </Button>
    
               <Button style={{marginTop: 10}}
              full        
              primary
              onPress={()=>fb.signUpUser(this.state.email,this.state.password)}>
              
              
               <Text style={{color:'white'}}> Sign Up </Text>
              </Button>
    
              <Button style={{marginTop: 10}}
              full        
              primary/*iconRight
              light*/
              onPress={()=>this.loginWithFacebook()} >
              
              
               <Text style={{color:'white'}}>Iniciar Sesión con Facebook</Text>
              </Button>
               
          
    
            </Form>
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