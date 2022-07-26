import { StyleSheet, View, Button, TouchableOpacity, Text, Image } from 'react-native';
import { useState, useEffect } from 'react';
import "react-native-get-random-values"
import "@ethersproject/shims"
import { ethers } from "ethers";
import * as Clipboard from 'expo-clipboard';
import { MaterialIcons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';

export default function Account({ navigation, route }) {
  const [page, setPage] = useState("")
  const [balance, setBalance] = useState(0)
  const [address, setAddress] = useState('')

  useEffect(()=>{
    if(route.params == undefined) setPage("register")
    else {
      setAddress(route.params.addr)
      setPage('account')
      handleGetBalance(route.params.addr)
    } 
  }, [route])
  
  const handleGetBalance = async (addr) => {
    try {
      const provider = new ethers.providers.JsonRpcProvider("https://rinkeby.infura.io/v3/ab0bba1edd7c44b28fdf159193f938f2");
      const b = await provider.getBalance(addr) //fetch the balance
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
        <View style={{alignItems: 'center'}}>
          <Text style={{ marginRight: 1, fontSize: 28 }}>Account 1</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: 'flex-end', justifyContent: 'center', paddingBottom: 20, paddingTop: 10}}>
          <Text style={{ color: 'dimgray', fontSize: 16, marginRight: 3}}>{one}...{two}</Text>
          <TouchableOpacity onPress={handleCopy}>
            <Feather name="copy" size={19} color="dimgray" />
          </TouchableOpacity>
        </View>

        <View style={{ borderTopWidth: 1, borderColor: 'gray', paddingTop: 25, }}>
          <View style={styles.etherIcon}>
            <MaterialCommunityIcons name="ethereum" size={44} color="black" />
          </View>
          <Text style={styles.balanceText}>{balance==0 ? 0 : balance} RinkebyETH</Text>
          <View style={styles.iconContainer}>
            <View style={styles.iconBox}>
              <MaterialIcons name="file-download" size={38} color="#FFF" />
            </View>
            <View style={styles.iconBox}>
              <Feather name="arrow-up-right" size={38} color="#FFF" />
            </View>
            <View style={styles.iconBox}>
              <MaterialIcons name="swap-horiz" size={38} color="#FFF" />
            </View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <Text style={styles.iconText}>買</Text>
            <Text style={styles.iconText}>發送</Text>
            <Text style={styles.iconText}>交換</Text>
          </View>
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
    // flex: 1,
    // backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 10,
    // width: '50%',
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  etherIcon: {
    alignItems:'center', 
    paddingVertical: 11
  },
  balanceText: { 
    textAlign:'center', 
    fontSize: 28, 
    fontWeight: "500" 
  },
  iconContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-evenly', 
    paddingTop: 35,
    paddingBottom: 7, 
  },
  iconBox: {
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: "#2196F3", 
    borderRadius: 50, 
    height: 48, 
    width: 48, 
  },
  iconText: {
    color: '#2196F3',
    textAlign: 'center',
    width: 48, 
    fontWeight: '500',
    fontSize: 17
  },


});


