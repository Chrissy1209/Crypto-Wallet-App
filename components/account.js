import { StyleSheet, View, TouchableOpacity, Text, TextInput, Button } from 'react-native';
import { MaterialIcons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import * as Clipboard from 'expo-clipboard';
import "react-native-get-random-values"
import "@ethersproject/shims"
import { ethers } from "ethers";


export default function Account({ address, mnemonic, balance }) {
  const [page, setPage] = useState('account')
  var one = address.substring(0, 5)
  var two = address.substring(38, 42)

  useEffect(()=> {
    // let mnemonicWallet = ethers.Wallet.fromMnemonic(mnemonic)
    // console.log(mnemonicWallet.privateKey)

  })

  const handleCopy = () => {
    Clipboard.setString(address);
  }
  
  const sendTransation = () => {
    setPage("send")
  
    // let mnemonicWallet = ethers.Wallet.fromMnemonic(mnemonic)
    // console.log(mnemonicWallet.privateKey)

    // const provider = new ethers.providers.JsonRpcProvider("https://rinkeby.infura.io/v3/ab0bba1edd7c44b28fdf159193f938f2");
    // const wallet = new ethers.Wallet(mnemonicWallet.privateKey, provider)

    // console.log(wallet)

  }

//----------

  const renderAccount = () => (
    <View>
        <View style={styles.accoContainer}>
          <Text style={{ fontSize: 28 }}>Account 1</Text>
          <TouchableOpacity onPress={handleCopy}>
            <View style={styles.addressBox}>
              <Text style={styles.address}>{one}...{two}</Text>
              <Feather name="copy" size={19} color="dimgray" />
            </View>
          </TouchableOpacity>
        </View>
        {/* ---------------- */}
        <View style={styles.subContainer}>
          <View style={styles.etherIcon}>
            <MaterialCommunityIcons name="ethereum" size={44} color="black" />
          </View>
          <Text style={styles.balanceText}>{balance==0 ? 0 : balance} RinkebyETH</Text>
          {/* ---------------- */}
          <View style={styles.iconContainer}>
            <View style={styles.iconBox}>
              <TouchableOpacity style={styles.icon}>
                <MaterialIcons name="file-download" size={38} color="#FFF" />
              </TouchableOpacity>
              <Text style={styles.iconText}>買</Text>
            </View>
            <View style={styles.iconBox}>
              <TouchableOpacity onPress={sendTransation} style={styles.icon}>
                <Feather name="arrow-up-right" size={38} color="#FFF" />
              </TouchableOpacity>
              <Text style={[styles.iconText]}>發送</Text>
            </View>
            <View style={styles.iconBox}>
              <TouchableOpacity style={styles.icon}>
                <MaterialIcons name="swap-horiz" size={38} color="#FFF" />
              </TouchableOpacity>
              <Text style={styles.iconText}>交換</Text>
            </View>
          </View>
          {/* ---------------- */}
        </View>
    </View> 
  )

  const renderSendTx = () => (
    <View>
      <Text onPress={()=>{ setPage("account") }} style={{textAlign:'right', fontSize: 14, color: "#007AFF"}}>取消</Text>
      <Text style={{fontSize: 23, fontWeight: '500', textAlign: 'center', paddingBottom: 14}}>Send to</Text>
      <TextInput placeholder='搜尋公開地址(0x)' style={{width:"100%", backgroundColor: "#fff", padding: 10}}></TextInput>
      
      <View style={{flexDirection:'row', justifyContent: 'flex-end'}}>
        <Text style={{ fontWeight: '500', paddingVertical: 10, fontSize: 20, paddingTop: 50}}>資產：</Text>
        <Text style={{ paddingVertical: 10, fontSize: 19, paddingTop: 50}}>{balance==0 ? 0 : balance} RinkebyETH</Text>
      </View>
      <View style={{flexDirection:'row', marginVertical: 10, justifyContent: 'flex-end'}}>
        <Text style={{ fontWeight: '500', fontSize: 20, }}>數量：</Text>
        <TextInput placeholder='0' style={{ width:"10%", backgroundColor: "#fff", marginRight: 10}}></TextInput>
        <Text style={{ fontSize: 20, }}>RinkebyETH</Text>
      </View>
    </View>
  )

  return (
    <View style={styles.container}>
      { page=="account" && renderAccount() }
      { page=="send" && renderSendTx() }
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  accoContainer: { 
    alignItems: 'center' 
  },
  addressBox: { 
    flexDirection: "row", 
    paddingBottom: 20, 
    paddingTop: 10 
  },
  address: { 
    color: 'dimgray', 
    fontSize: 16, 
    marginRight: 3 
  },
  subContainer: { 
    borderTopWidth: 1, 
    borderColor: 'gray', 
    paddingTop: 25,
  },
  etherIcon: {
    alignItems:'center',
    paddingBottom: 11,
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
  },
  iconBox: { 
    width: 48,  
  },
  icon: {
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: "#007AFF", 
    borderRadius: 50, 
    height: 48, 
  },
  iconText: {
    color: '#007AFF', //2196F3
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 17,
    paddingTop: 7,
  },
});