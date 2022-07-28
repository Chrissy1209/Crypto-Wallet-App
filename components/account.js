import { StyleSheet, View, TouchableOpacity, Text, TextInput, Button } from 'react-native';
import { MaterialIcons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import * as Clipboard from 'expo-clipboard';
import "react-native-get-random-values"
import "@ethersproject/shims"
import { ethers } from "ethers";


export default function Account({ address, mnemonic, balance }) {
  const [page, setPage] = useState('account')
  const [amount, setAmount] = useState('')
  var one = address.substring(0, 5)
  var two = address.substring(38, 42)

  const handleAmount = (e) => {
    if (e === '' || /^\d*\.?\d*$/.test(e)) setAmount(e)
  }
  const handleCopy = () => {
    Clipboard.setString(address);
  }
  const sendTransation = () => {
    // setPage("send")
  
    // let mnemonicWallet = ethers.Wallet.fromMnemonic(mnemonic)
    // console.log(mnemonicWallet.privateKey)

    // const provider = new ethers.providers.JsonRpcProvider("https://rinkeby.infura.io/v3/ab0bba1edd7c44b28fdf159193f938f2");
    // const wallet = new ethers.Wallet(mnemonicWallet.privateKey, provider)

    console.log("sendTransation")
  }

//----------

  const renderAccount = () => (
    <View>
      <View style={accStyles.titleContainer}>
        <Text style={{ fontSize: 28 }}>Account 1</Text>
        <TouchableOpacity onPress={handleCopy}>
          <View style={accStyles.addressBox}>
            <Text style={accStyles.address}>{one}...{two}</Text>
            <Feather name="copy" size={19} color="dimgray" />
          </View>
        </TouchableOpacity>
      </View>
      {/* ---------------- */}
      <View style={accStyles.subContainer}>
        <View style={accStyles.etherIcon}>
          <MaterialCommunityIcons name="ethereum" size={44} color="black" />
        </View>
        <Text style={accStyles.balanceText}>{balance==0 ? 0 : balance} RinkebyETH</Text>
        {/* ---------------- */}
        <View style={accStyles.iconContainer}>
          <View style={accStyles.iconBox}>
            <TouchableOpacity style={accStyles.icon}>
              <MaterialIcons name="file-download" size={38} color="#FFF" />
            </TouchableOpacity>
            <Text style={accStyles.iconText}>買</Text>
          </View>
          <View style={accStyles.iconBox}>
            <TouchableOpacity onPress={()=>{setPage("send")}} style={accStyles.icon}>
              <Feather name="arrow-up-right" size={38} color="#FFF" />
            </TouchableOpacity>
            <Text style={[accStyles.iconText]}>發送</Text>
          </View>
          <View style={accStyles.iconBox}>
            <TouchableOpacity style={accStyles.icon}>
              <MaterialIcons name="swap-horiz" size={38} color="#FFF" />
            </TouchableOpacity>
            <Text style={accStyles.iconText}>交換</Text>
          </View>
        </View>
        {/* ---------------- */}
      </View>
    </View> 
  )
  const renderSendTx = () => (
    <View style={{flex: 1}}>
      <Text style={sendTxStyles.titleText}>Send to</Text>
      <TextInput placeholder='搜尋公開地址(0x)' style={{width:"100%", backgroundColor: "#fff", padding: 10}} />
      <View style={{flex:1}}>
        <View style={[sendTxStyles.box, { marginTop: 50 }]}>
          <Text style={sendTxStyles.subTitle}>資產：</Text>
          <Text style={{ fontSize: 19 }}>{balance==0 ? 0 : balance} RinkebyETH</Text>
        </View>
        <View style={[sendTxStyles.box, { marginVertical: 30 }]}>
          <Text style={sendTxStyles.subTitle}>數量：</Text>
          <TextInput 
            keyboardType='numeric' 
            onChangeText={handleAmount}
            value={amount} 
            placeholder='0' 
            style={{ width:"10%", backgroundColor: "#fff", marginRight: 10}} 
          />
          <Text style={{ fontSize: 19 }}>RinkebyETH</Text>
        </View>
        { amount >= balance && <Text style={{color: 'red', textAlign: 'right'}}>資金不足</Text>}
      </View>
      <View style={sendTxStyles.btnContainer}>
        <TouchableOpacity style={sendTxStyles.btn}
          onPress={()=>{setPage('account')}} 
        >
          <Button
            onPress={()=>{setPage('account')}} 
            title='取消'
          />
        </TouchableOpacity>
        <TouchableOpacity style={[sendTxStyles.btn, {backgroundColor: '#007AFF'}]}
          onPress={sendTransation}
        >
          <Button 
            onPress={sendTransation}
            color={"#fff"} 
            title='確認' 
          />
        </TouchableOpacity>
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
  }
})
const accStyles = StyleSheet.create({
  titleContainer: { 
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
const sendTxStyles = StyleSheet.create({
  titleText: {
    fontSize: 23, 
    fontWeight: '500', 
    textAlign: 'center', 
    paddingBottom: 14,
  },
  box: {
    flexDirection:'row', 
    justifyContent: 'flex-end'
  },
  subTitle: { 
    fontWeight: '500', 
    fontSize: 20 
  },
  btnContainer: {
    flexDirection:'row', 
    justifyContent: 'space-between', 
    marginBottom: 20, 
  },
  btn: {
    borderColor:"#007AFF", 
    borderWidth: 1, 
    paddingHorizontal: 50, 
    borderRadius: 18,
},
});