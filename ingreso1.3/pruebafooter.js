import React, { Component } from 'react';
import { Container, Content, Footer, FooterTab, Button, Icon, Text, Badge } from 'native-base';

export default class footer extends React.Component {
  render() {
    return (
      <Container style={{backgroundColor:"#b71c1c"}}>
        <Content />
        <Footer>
          <FooterTab>
            <Button vertical>
             <Icon name="apps"/>
              <Text>Noticias</Text>
            </Button>
            <Button vertical>
              <Icon name="calendar"/>
              <Text>Calendario</Text>
            </Button>
            <Button vertical>
               <Icon name="person" />
              <Text>Mi cuenta</Text>
            </Button>
            </FooterTab>
        </Footer>
      </Container>
    );
  }
}