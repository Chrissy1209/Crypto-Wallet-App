import { StyleSheet, View, Button, Text } from 'react-native';
import { useState, useEffect } from 'react';
import "react-native-get-random-values"
import "@ethersproject/shims"
import { ethers } from "ethers";
import MyAccount from "./account"

export default function Home({ navigation, route }) {
  const [page, setPage] = useState("")
  const [balance, setBalance] = useState(0)
  const [address, setAddress] = useState('')
  const [mnemonic, setMnemonic] = useState('')
  const [sendTx, setSendTx] = useState(false)

  useEffect(()=>{
    if(route.params == undefined) setPage("register")
    else {
      setAddress(route.params.addr)
      setMnemonic(route.params.mnem)
      setPage('account')
      getBalance(route.params.addr)
    } 
  }, [route, sendTx])
  
  const getBalance = async (addr) => {
    try {
      const provider = new ethers.providers.JsonRpcProvider("https://rinkeby.infura.io/v3/ab0bba1edd7c44b28fdf159193f938f2");
      const b = await provider.getBalance(addr) //fetch the balance
      const x = ethers.utils.formatEther(b)
      if(x<1) setBalance(x.slice(0, 9))
      else setBalance(x)
    } 
    catch(err)
    {
      console.log(err)
    }
  }

//------------

  const renderRegister = () => {
    return (
      <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontSize: 19}}>歡迎來到 Chrissy Wallet.</Text>
        <Button title='開始使用' onPress={()=>{navigation.navigate("Register")}}></Button>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      { page=="register" && renderRegister() }
      { page=="account" && <MyAccount address={address} balance={balance} mnemonic={mnemonic} setSendTx={setSendTx}/> }
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },

});