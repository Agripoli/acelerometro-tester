import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import * as Clipboard from 'expo-clipboard';

export default function App() {
  let array = []

  const copyToClipboard = async (texto) => {
    await Clipboard.setStringAsync(texto);
  };

  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [subscription, setSubscription] = useState(null);
  const [texto, setTexto] = useState('')

  const _slow = () => {
    Accelerometer.setUpdateInterval(1000);
  };

  const _fast = () => {
    Accelerometer.setUpdateInterval(100);
  };

  const [inclinacao1,  setInclinacao1] = useState(0)
  const [inclinacao2,  setInclinacao2] = useState(0)
  const [inclinacao3,  setInclinacao3] = useState(0)

  const [records, setRecords] = useState('')

  const _subscribe = () => {
    setSubscription(
      Accelerometer.addListener(accelerometerData => {

        let x = Math.round(accelerometerData.x * 100) / 100
        let y = Math.round(accelerometerData.y * 100) / 100
        let z = Math.round(accelerometerData.z * 100) / 100
        
        setInclinacao1(Math.atan(Math.round(
          (x
          /
          (Math.sqrt(
              Math.pow(y,2)
              + Math.pow(z, 2)
            ))) * 100
          )/100))
        setInclinacao2(Math.atan(
          Math.round(
            (y/
            (Math.sqrt(Math.pow(x,2) + Math.pow(z, 2)))) * 100
          )/100
        ))
        setInclinacao3(
          Math.atan(Math.round((Math.sqrt(Math.pow(x,2) + Math.pow(y,2))/z) * 100) / 100)
        )

        array.push(`${inclinacao1 * 180 / Math.PI} ${inclinacao2 * 180 / Math.PI} ${inclinacao3 * 180 / Math.PI}`)
        setRecords(array.join(','))
        })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    return () => _unsubscribe();
  }, []);

  function gravar () {
    setRecords(array.join(','))
    console.log(records)
  }

  function resetar () {
    setRecords('')
  }

  return (
    <View>
      <Text></Text>
      <Text></Text>

      <Text></Text>

      <Text></Text>

      <Text></Text>

      <Text></Text>

      <Text></Text>

      <Text></Text>


      <Text>Accelerometer: (in Gs where 1 G = 9.81 m s^-2)</Text>
      
      <View>
        <TouchableOpacity onPress={subscription ? _unsubscribe : _subscribe}>
          <Text style={{fontSize: 30}}>{subscription ? 'On' : 'Off'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={_slow}>
          <Text>1 Hz</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={_fast}>
          <Text>10 Hz</Text>
        </TouchableOpacity>

        <Text>Rotação 1: {inclinacao1 * 180 / Math.PI}°</Text>
        <Text>Rotação 2: {inclinacao2 * 180 / Math.PI}°</Text>
        <Text>Rotação 3: {inclinacao3 * 180 / Math.PI}°</Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        {/* <TextInput style={{ backgroundColor: 'rgba(0, 255, 0, 0.3)',height: '30%', width: '90%'}}>{records}</TextInput> */}
        <View style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-evenly' }}>
            <TouchableOpacity onPress={gravar}>
              <Text style={{fontSize: 30}}>Gravar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={resetar}>
              <Text style={{fontSize: 30}}>Resetar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {copyToClipboard(records)}}>
              <Text style={{fontSize: 30}}>Copiar</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}