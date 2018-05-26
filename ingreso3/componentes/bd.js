import React from 'react';
import * as firebase from 'firebase';
//import Liga from './Crearliga';
//import {LigaScreen} from '../Screennames';

const firebaseConfig = {
  apiKey: "AIzaSyABLK8pBAkULeoUiaESv2i7BaltenVJD-M",
  authDomain: "autenticacion-8c15b.firebaseapp.com",
  databaseURL: "https://autenticacion-8c15b.firebaseio.com",
  projectId: "autenticacion-8c15b",
  storageBucket:""
};
firebase.initializeApp(firebaseConfig);

export default class bd extends React.Component {

  constructor(props){
    super(props)
    this.state=({
      errorMessage: null
    })
  }

obtenerusuario=()=>{
  const user=firebase.auth().currentUser.uid;
  return user;
}

confirmar = ()=>{
  firebase.auth().onAuthStateChanged((user)=>{
    if(user!=null){
      console.log(user)
    }
  })
}

signUpUser = (email,password) => {
    try{            

      firebase.auth().createUserWithEmailAndPassword(email,password);
      ()=> this.props.navigation.push('League');
  
    }catch(error) {
      console.log(error.toString())
    }
  }

  loginUser = (email,password) => {
      
      
       firebase.auth().signInWithEmailAndPassword(email,password)
       .then(
        //alert('Bienvenido'+user);
        ()=>this.props.navigation.navigate('LigaScreen'))
           
      .catch(error=> this.setState({errorMessage:error.message}))
        
        
      }

  mostrar=(items) =>{
    const mostrar=firebase.database().ref(items);
    //alert(mostrar);
    return mostrar;
  }

  encontrar=(items,table)=>{
    const encontrar=firebase.database().ref(items).child(table);
    alert(encontrar);
    return encontrar;
  }

  actualizar = (item) => {
    //let updates = {};
    //updates['/items/' + item.id] = null;
    firebase.database().ref().update(item);

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

  agregarItem = (nuevo,tabla,key) => {
    var ingresa='';
    var clave='';
    //let cadena = this.state.nuevo
    //cadena = {name:nuevo};
    if(key==0){
    ingresa=firebase.database().ref(tabla).push(nuevo);
    clave=ingresa.key;
     }
   // alert(ingresa.key);
   else{
    ingresa=firebase.database().ref(tabla).child(key).set(nuevo);
    clave=key;}
    
    return clave;
   // this.state.lista.push(nuevo);
   // this.setState({lista: this.state.lista}); 
    //console.log(nuevo);
}
}