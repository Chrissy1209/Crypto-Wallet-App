import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { MaterialIcons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useState, useCallback } from 'react';
import * as Clipboard from 'expo-clipboard';
import MyTransaction from './sendTx'

const RenderAccount = React.memo(({ address, balance, setPage }) => {
  var one = address.substring(0, 5)
  var two = address.substring(38, 42)
  console.log("RenderAccount")
  
  const handleCopy = useCallback(() => {
    Clipboard.setString(address);
  }, [])
  const handlePage = useCallback(() => {
    setPage("send")
  }, [])

  return (
    <View>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Account 1</Text>
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
            <TouchableOpacity onPress={handlePage} style={styles.icon}>
              <Feather name="arrow-up-right" size={38} color="#FFF" />
            </TouchableOpacity>
            <Text style={styles.iconText}>發送</Text>
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
})

export default function Account({ address, mnemonic, balance, setSendTx }) {
  const [page, setPage] = useState('account')
  console.log("Account")
  return (
    <View style={styles.container}>
      { page=="account" && <RenderAccount address={address} balance={balance} setPage={setPage} /> }
      { page=="send" && <MyTransaction address={address} balance={balance} mnemonic={mnemonic} setPage={setPage} setSendTx={setSendTx} /> }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  titleContainer: { 
    alignItems: 'center' 
  },
  titleText: { 
    fontSize: 28 
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