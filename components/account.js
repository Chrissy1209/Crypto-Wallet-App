// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button, TouchableOpacity, Text, Image } from 'react-native';
import { useState, useEffect } from 'react';
import "react-native-get-random-values"
import "@ethersproject/shims"
import { ethers } from "ethers";
import * as Clipboard from 'expo-clipboard';

export default function Account({ route }) {
  const [balance, setMyBalance] = useState(0)
  const address = route.params.addr
  // var address = '0xEEAcB1028aF12C84609edd581Bd6cAdBB7d28280'

  useEffect(()=>{
    console.log("useEffect . . .")
    action()
  }, [])
  
  const action = async () => {
    const provider = new ethers.providers.JsonRpcProvider("https://rinkeby.infura.io/v3/ab0bba1edd7c44b28fdf159193f938f2");
    const b = await provider.getBalance(address) //fetch the balance
    console.log("----------\n" +b)
    setMyBalance(ethers.utils.formatEther(b))   
  }

  const handleCopy = () => {
    Clipboard.setString(address);
  }

  var one = address.substring(0, 5)
  var two = address.substring(38, 42)

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, alignItems: 'flex-end', flexDirection: "row" }}>
        <Text style={{ marginRight: 1, fontSize: 18, fontWeight: "400" }}>{one}...{two}</Text>
        <TouchableOpacity onPress={handleCopy}>
          <Image style={{ height:20, width: 20, }} source={require('../assets/copy.png')}></Image>
        </TouchableOpacity>
      </View>
      <Text style={{ fontSize: 18, paddingVertical: 10, }}>-------------------</Text>
      <View style={{ flex: 2 }}>
        <Text style={{ fontSize: 28, fontWeight: "500" }}>{balance==0 ? 0 : balance} RinkebyETH</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    // width: '50%',
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    justifyContent: 'center',
    // alignItems: 'flex-start',
  },
});


