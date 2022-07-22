// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button, TouchableOpacity, Text, Image } from 'react-native';
import { useState, useEffect } from 'react';
import "react-native-get-random-values"
import "@ethersproject/shims"
import { ethers } from "ethers";
import * as Clipboard from 'expo-clipboard';

export default function Account({ navigation, route }) {
  const [page, setPage] = useState("")
  const [balance, setBalance] = useState(0)
  const [address, setAddress] = useState('')

  useEffect(()=>{
    console.log("------useEffect-------")
    
    if(route.params == undefined) setPage("register")
    else {
      setAddress(route.params.addr)
      setPage('account')
      handleGetBalance(address)
    } 

  }, [route])
  
  const handleGetBalance = async (add) => {
    try {
      const provider = new ethers.providers.JsonRpcProvider("https://rinkeby.infura.io/v3/ab0bba1edd7c44b28fdf159193f938f2");
      const b = await provider.getBalance(address) //fetch the balance
      console.log("----------" +b)
      setBalance(ethers.utils.formatEther(b))   
    } 
    catch(err)
    {
      console.log(err)
    }
  }

  const handleCopy = () => {
    Clipboard.setString(address);
  }

  //------------

  const renderRegister = () => {
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 19}}>歡迎來到 Chrissy Wallet.</Text>
        <Button title='開始使用' onPress={()=>{navigation.navigate("Register")}}></Button>
      </View>
    )
  }

  const renderAccount = () => {
    var one = address.substring(0, 5)
    var two = address.substring(38, 42)
    console.log("address = " + address)

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
    )
  }

  return (
    <View style={styles.container}>
      { page=="register" && renderRegister() }
      { page=="account" && renderAccount() }
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


