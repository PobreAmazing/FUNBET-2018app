import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import {Container,Content,Header,Form,Input,Item,Button,Label} from 'native-base';
import Liga from './Crearliga';
import bd from './bd';
import {miPerfilStack} from '../Screennames';
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
       ()=>this.props.navigation.navigate('miPerfilStack'))          
     .catch(error=> this.setState({errorMessage:error.message}))         
     }

     async loginWithFacebook(){
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
                <Label>Email</Label>
                <Input autoCorrect={false}
                 autoCapitalize="none"
                 onChangeText={(email)=>this.setState({email})}
                /*onChangeText={(nuevo)=>this.setState({nuevo})}*/ />            
                </Item>
    
              <Item floatingLabel>
                <Label>Password</Label>
                <Input 
                 secureTextEntry={true}
                 autoCorrect={false}
                  autoCapitalize="none" 
                  onChangeText={(password)=>this.setState({password})}
                 /*onChangeText={(nuevo)=>this.setState({nuevo})}*/ />
              </Item>
    
              <Button style={{marginTop: 10}}full success 
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
              primary
              onPress={()=>this.loginWithFacebook()} >
              
              
               <Text style={{color:'white'}}> Facebook </Text>
              </Button>
               
          
    
            </Form>
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