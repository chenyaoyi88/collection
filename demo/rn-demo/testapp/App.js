/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  NativeModules
} from 'react-native';

import RNReactNativeBaifuPos from './src/lib/react-native-baifu-pos';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js111
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
        <Button title="测试调用原生方法" onPress={() => this.printMsg() }></Button>
        <Text style={styles.instructions}>
          ~~~
        </Text>
        <Button title="测试调用原生方法回调" onPress={() => this.getPrintStatus() }></Button>
      </View>
    );
  }

  printMsg() {
    RNReactNativeBaifuPos.printMsg('fuck you bitch!');
  }

  getPrintStatus() {
    RNReactNativeBaifuPos.getPrintStatus((data) => {
      console.warn(data);
    }, (err) => {
      console.warn(err);
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
