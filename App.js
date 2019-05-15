import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button, Alert } from 'react-native';


// ####### COMPONENTES ########
//Componentes Layout
class ImagemTopo extends Component {
  render() {

    return (
      <Image
        source={{ uri: this.props.url }}
        style={{ height: 50, alignSelf: 'stretch', marginTop: 5 }}
        resizeMode={'contain'}
      />
    );
  }
}

//Componente Relógio
class Relogio extends Component {
  constructor(props) {
    super(props);
    this.state = { hora: 0, minuto: 0, segundo: 0, textBtn: 'Iniciar Cronômetro', corBtn: 'green' };
    this.tempo = null;


    this.iniciarCronometro = this.iniciarCronometro.bind(this);
    this.resetarCronometro = this.resetarCronometro.bind(this);
    this.addMinuto = this.addMinuto.bind(this);
    this.addHora = this.addHora.bind(this);

    this.estilo_relogio = StyleSheet.create({
      relogioArea: {
        flex: 1
      },
      tituloArea: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, .3)',
        padding: 10,
        borderTopWidth: 3,
        borderBottomWidth: 3,
        borderColor: 'black'
      },
      timerArea: {
        flex: 2,
        borderBottomWidth: 3,
        borderColor: 'black'
      },
      titulo: {
        fontSize: 50,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'black',
        textTransform: 'uppercase',
      },
      timer: {
        flex: 1,
        flexDirection: 'row',
        margin: 10,
      },
      digitoArea: {
        flex: 1,
        margin: 20,
        flexDirection: 'row'
      },
      pontos: {
        color: 'black',
        fontWeight: 'bold',
        alignSelf: 'center',
        fontSize: 30
      },
      digito: {
        flex: 1,
        backgroundColor: 'white',
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black'
      },
      contador: {
        color: 'red',
        fontSize: 50
      }
    });

  }

  iniciarCronometro() {
    let s = this.state;

    if (this.tempo == null) {
      s.textBtn = 'Parar Cronômetro';
      s.corBtn = 'red';
      this.setState(s);
      this.tempo = setInterval(() => {
        s.segundo += 1;
        if (s.segundo == 60) {
          this.addMinuto(s);
          s.segundo = 0;
        }
        this.setState(s);
      }, 100);
    } else {
      clearInterval(this.tempo);
      s.textBtn = 'Continuar Cronômetro';
      s.corBtn = 'green';
      this.setState(s);
      this.tempo = null;
    }
  }

  resetarCronometro() {
    let s = this.state;

    clearInterval(this.tempo);
    this.tempo = null;
    s.textBtn = 'Iniciar Cronômetro';
    s.corBtn = 'green';
    s.segundo = 0;
    s.minuto = 0;
    s.hora = 0;

    this.setState(s);
  }

  addMinuto(s) {
    s.minuto += 15;
    if (s.minuto == 60) {
      this.addHora(s);
      s.minuto = 0;
    }
    this.setState(s);
  }

  addHora(s) {
    s.hora += 1;
    this.setState(s);
  }

  render() {


    return (
      <View style={this.estilo_relogio.relogioArea}>
        <View style={this.estilo_relogio.tituloArea}>
          <Text style={this.estilo_relogio.titulo}>Cronômetro</Text>
        </View >
        <View style={this.estilo_relogio.timerArea}>
          <View style={this.estilo_relogio.digitoArea}>
            <View style={this.estilo_relogio.digito}>
              <Text style={this.estilo_relogio.contador}>{("0" + this.state.hora).slice(-2)}</Text>
            </View>
            <Text style={this.estilo_relogio.pontos}>:</Text>
            <View style={this.estilo_relogio.digito}>
              <Text style={this.estilo_relogio.contador}>{("0" + this.state.minuto).slice(-2)}</Text>
            </View>
            <Text style={this.estilo_relogio.pontos}>:</Text>
            <View style={this.estilo_relogio.digito}>
              <Text style={this.estilo_relogio.contador}>{("0" + this.state.segundo).slice(-2)}</Text>
            </View>
          </View>
        </View>
        <View style={{ flex: 1 }} >
          <View style={{ flex: 1 }}>
            <Button
              onPress={this.iniciarCronometro}
              title={this.state.textBtn}
              color={this.state.corBtn}
            />
          </View>
          <View style={{ flex: 1, color: 'black' }}>
            <Button
              onPress={this.resetarCronometro}
              title="Resetar Cronômetro"
              color="blue"
            />
          </View>
        </View>
      </View>

    );
  }
}




// ####### APP ########
export default class App extends Component {

  render() {
    return (
      <View style={styles.container}>
        {/*<Objeto foto='2018/03/12/Boca65' />
        <Text style={styles.instructions}></Text>
        
        <Objeto foto='2018/12/13/escudo65' />*/}
        {/* ### TOPO ###*/}
        <View style={styles.topo}>
          <ImagemTopo url="https://www.pzmapp.com.br/pzmweb_solar/analytics/assets/img/logopzm.png" />
          <Text style={styles.nomeApp}>PZM MOBILE</Text>
        </View>
        {/* ### FIM TOPO ###*/}
        {/* ### MEIO ###*/}
        <View style={styles.meio}>
          <View style={{ flex: 2 }} >
            <Relogio></Relogio>
          </View>
          <View style={{ flex: 1 }} >

          </View>

        </View>
        {/* ### FIM MEIO ###*/}
        {/* ### RODAPE ###*/}
        <View style={styles.rodape}>
          <View style={styles.rodapeInterno}>
            <Text style={styles.textoRodape}>Desenvolvido com - </Text>
            <View style={{ width: 150, height: 50 }} >
              <Image source={{ uri: "https://facebook.github.io/react-native/img/header_logo.png" }} style={{ margin: 5, height: 35, width: 35, alignSelf: 'flex-start' }} resizeMode={'contain'} />
            </View>
          </View>
        </View>
        {/* ### FIM RODAPE ###*/}
      </View>
    );
  }
}


// ####### CSS ########
const styles = StyleSheet.create({
  textoRodape: {
    flex: 1,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    textTransform: 'uppercase',
    textAlignVertical: 'center',
    textAlign: 'right'

  },
  nomeApp: {
    flex: 1,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
    textAlignVertical: 'center',
    textAlign: 'center'
  },
  rodapeInterno: {
    flex: 1,
    flexDirection: 'row',
  },
  topo: {
    height: 120,
    backgroundColor: '#2f4050'
  },
  meio: {
    flex: 1,
    backgroundColor: '#DDD'
  },
  rodape: {
    height: 50,
    backgroundColor: 'gray',
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center"
  },
  container: {
    flex: 1
  },
  cronometro: {
    textAlign: 'center',
    color: '#333333',
    fontSize: 45,
  },
});
