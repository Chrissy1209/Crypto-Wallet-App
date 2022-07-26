import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { MaterialIcons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import * as Clipboard from 'expo-clipboard';
import "react-native-get-random-values"
import "@ethersproject/shims"
import { ethers } from "ethers";


export default function Account({ address, balance, mnemonic }) {
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
    let mnemonicWallet = ethers.Wallet.fromMnemonic(mnemonic)
    console.log(mnemonicWallet.privateKey)

    const provider = new ethers.providers.JsonRpcProvider("https://rinkeby.infura.io/v3/ab0bba1edd7c44b28fdf159193f938f2");
    const wallet = new ethers.Wallet(mnemonicWallet.privateKey, provider)

    console.log(wallet)

  }

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
          <TouchableOpacity onPress={sendTransation} style={styles.iconBox}>
            <Feather name="arrow-up-right" size={38} color="#FFF" />
          </TouchableOpacity>
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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 10,
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