import { StyleSheet, View, Button, Text } from 'react-native';
import { useState, useEffect, useCallback, memo } from 'react';
import "react-native-get-random-values"
import "@ethersproject/shims"
import { ethers } from "ethers";
import MyAccount from "./account"

const Register = memo(({ navigation }) => {
  const handleNext = useCallback(()=> {
    navigation.navigate("Register")
  }, [navigation])

  return (
    <View style={styles.subCoiner}>
      <Text style={styles.fontSize}>歡迎來到 Chrissy Wallet.</Text>
      <Button title='開始使用' onPress={handleNext}></Button>
    </View>
  )
})

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
  
  const getBalance = useCallback((addr) => {
    const getingBalance = async () => {
      try {
        const provider = new ethers.providers.JsonRpcProvider("https://rinkeby.infura.io/v3/ab0bba1edd7c44b28fdf159193f938f2");
        const b = await provider.getBalance(addr) //fetch the balance
        const x = ethers.utils.formatEther(b)
        if(x<1) setBalance(x.slice(0, 9))
        else setBalance(x)
      } 
      catch(err) {
        console.log(err)
      }
    }
    getingBalance()
  }, [])

  return (
    <View style={styles.container}>
      { page=="register" && <Register navigation={navigation} /> }
      { page=="account" && <MyAccount address={address} balance={balance} mnemonic={mnemonic} setSendTx={setSendTx} /> }
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
  subCoiner: {
    flex:1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  fontSize: {
    fontSize: 19
  },
});