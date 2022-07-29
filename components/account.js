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
  const [addressTo, setAddressTo] = useState('')
  const [verify, setVerify] = useState("null")
  var one = address.substring(0, 5)
  var two = address.substring(38, 42)

  const handleTest = (e) => {
    setAddressTo(e)
    if(e=='') setVerify("null")
    else {
      try {
        // ethers.utils.getAddress(e);
        setVerify("true")
      } 
      catch(err) { 
        setVerify("false") 
      }
    } 
  }
  const handleAmount = (e) => {
    if (e === '' || /^\d*\.?\d*$/.test(e)) setAmount(e)
  }
  const handleCopy = () => {
    Clipboard.setString(address);
  }
  const sendTransation = async () => {
    // let mnemonicWallet = ethers.Wallet.fromMnemonic(mnemonic)
    // console.log(mnemonicWallet.privateKey)

    // const provider = new ethers.providers.JsonRpcProvider("https://rinkeby.infura.io/v3/ab0bba1edd7c44b28fdf159193f938f2");
    // const wallet = new ethers.Wallet(mnemonicWallet.privateKey, provider)

    // const tx = await wallet.sendTransation({
    //   to: addressTo,
    //   value: ethers.utils.parseEther(amount)
    // })

    // await tx.wait()
    // console.log(tx)
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
    <View style={{ flex: 1 }}>
      <Text style={sendTxStyles.titleText}>Send to</Text>
      { 
        verify=="true" ? 
        <View style={{ flex:1, paddingBottom: 10 }}>
          <View style={sendTxStyles.addressBox}>
            <Text style={{ flex:1, paddingRight: 10 }}>{address}</Text>
            <Text onPress={()=>setVerify("null")}>X</Text>
          </View>
          <Text style={{ color: '#36BF36' }}>偵測到錢包位址！</Text> 
          <View style={{ flex:1 }}>
            <View style={[sendTxStyles.box, { marginTop: 50 }]}>
              <Text style={sendTxStyles.subTitle}>資產：</Text>
              <Text style={{ fontSize: 19 }}>{balance==0 ? 0 : balance}  RinkebyETH</Text>
            </View>
            <View style={[sendTxStyles.box, { marginTop: 30, marginBottom: 10 }]}>
              <Text style={sendTxStyles.subTitle}>數量：</Text>
              <TextInput 
                keyboardType='numeric' 
                onChangeText={handleAmount}
                value={amount} 
                placeholder='0' 
                style={sendTxStyles.amountText} 
              />
              <Text style={{ fontSize: 19 }}>RinkebyETH</Text>
            </View>
            { amount >= balance && <Text style={{ color: 'red', textAlign:'right' }}>資金不足</Text>}
          </View>
          <View style={sendTxStyles.btnContainer}>
            <TouchableOpacity 
              style={sendTxStyles.btn} 
              onPress={()=> {
                setVerify("null")
                setPage('account')
              }}
            >
              <Text style={{ color:'#007AFF', fontSize: 18 }}>取消</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[sendTxStyles.btn, { backgroundColor: '#007AFF' }]}
              onPress={sendTransation}
            >
              <Text style={{ color:'#fff', fontSize: 18 }}>確認</Text>
            </TouchableOpacity>
          </View>
        </View>
        :
        <View>
          <TextInput
            onChangeText={handleTest}
            value={addressTo}
            placeholder='搜尋公開地址(0x)' 
            style={[sendTxStyles.addressBox, { width: "100%" }]}
          />
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex:1 }}>
              { verify=="false" && <Text style={{ color: 'red' }}>接收位址錯誤</Text> }
            </View>
            <Text onPress={()=>setPage("account")} style={sendTxStyles.cancelBtn}>取消</Text>
          </View>
        </View>
      }
    </View>
  )

  return (
    <View style={accStyles.container}>
      { page=="account" && renderAccount() }
      { page=="send" && renderSendTx() }
    </View>
  )
}

const accStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
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
  addressBox: {
    flexDirection:'row', 
    alignItems:'center', 
    backgroundColor: '#fff', 
    paddingVertical: 5, 
    paddingHorizontal: 8, 
    marginBottom: 10,
  },
  box: {
    flexDirection:'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subTitle: { 
    fontWeight: '500', 
    fontSize: 20 
  },
  amountText: { 
    textAlign:'center', 
    fontSize: 17,
    width:"45%", 
    marginRight: 10, 
    borderBottomWidth: 1, 
    borderColor: "gray",
  },
  btnContainer: {
    flexDirection:'row', 
    justifyContent: 'space-between', 
    marginBottom: 20, 
  },
  btn: {
    borderColor:"#007AFF", 
    borderWidth: 1, 
    paddingHorizontal: 58, 
    paddingVertical: 8,
    borderRadius: 18,
    justifyContent: 'center',
  },
  cancelBtn: {
    textAlign: 'right', 
    color: '#007AFF', 
    paddingVertical: 10, 
    paddingLeft: 20
  },
});