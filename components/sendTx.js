import { StyleSheet, View, TouchableOpacity, Text, TextInput } from 'react-native';
import { useState, useEffect } from 'react';
import "react-native-get-random-values"
import "@ethersproject/shims"
import { ethers } from "ethers";


export default function renderSendTx ({ address, mnemonic, balance, setPage, setSendTx }) {
  const [addressTo, setAddressTo] = useState('')
  const [amount, setAmount] = useState('')
  const [verifyAddr, setVerifyAddr] = useState("null")
  const [transaction, setTransaction] = useState(false)

  const handleTest = (e) => {
    setAddressTo(e)
    if(e=='') setVerifyAddr("null")
    else {
      try {
        ethers.utils.getAddress(e);
        setVerifyAddr("true")
      } 
      catch(err) { 
        setVerifyAddr("false") 
      }
    } 
  }
  const handleAmount = (e) => {
    if (e === '' || /^\d*\.?\d*$/.test(e)) {
      if(e[0]=="." && e.length>1) setAmount("0"+e) // .1 = 0.1
      else if (e.length==2 && e=='00') setAmount('0') //00000 -> 0
      else if (e.length==2 && e[0]=='0' && e[1]!='0' && e[1]!='.') setAmount(e.slice(1,2)) //0123 -> 123     
      else setAmount(e)
    }
  }
  const sendTransaction = async () => {
    setTransaction(true)

    if(amount==""||amount=="."||amount=="0.") setAmount("0")

    let mnemonicWallet = ethers.Wallet.fromMnemonic(mnemonic)
    const provider = new ethers.providers.JsonRpcProvider("https://rinkeby.infura.io/v3/ab0bba1edd7c44b28fdf159193f938f2");
    const wallet = new ethers.Wallet(mnemonicWallet.privateKey, provider)
    
    try {
      const tx = await wallet.sendTransaction({
        to: "0x4F040609a8Fc36724CA9e17EC5D05eEB390087ad",
        value: ethers.utils.parseEther(amount)
      })
      await tx.wait()
      setSendTx(true)
      setTransaction(false)
      setPage('account')
      console.log(tx)  
    } 
    catch(err) { console.log(err) }
  }

  return (
    <View style={styles.flex}>
      <Text style={styles.titleText}>Send to</Text>
      { 
        verifyAddr=="true" ? 
        <View style={styles.flex}>
          <View style={styles.addressBox}>
            <Text style={styles.address}>{address}</Text>
            {/* <Text style={styles.address}>{addressTo}</Text> */}
            <Text onPress={()=>setVerifyAddr("null")}>X</Text>
          </View>
          <Text style={styles.greenColor}>偵測到錢包位址！</Text> 
          {/* ---------------- */}
          <View style={styles.flex}>
            <View style={[styles.box, { marginTop: 45 }]}>
              <Text style={styles.subTitle}>資產：</Text>
              <Text style={styles.fontSize}>{balance==0 ? 0 : balance}  RinkebyETH</Text>
            </View>
            <View style={[styles.box, { marginTop: 30, marginBottom: 10 }]}>
              <Text style={styles.subTitle}>數量：</Text>
              <TextInput 
                keyboardType='numeric' 
                onChangeText={handleAmount}
                value={amount} 
                placeholder='0' 
                style={styles.amountText} 
              />
              <Text style={styles.fontSize}>RinkebyETH</Text>
            </View>
            { amount >= balance && <Text style={styles.redColor}>資金不足</Text>}
          </View>
          {
            transaction &&
            <Text style={styles.processText}>交易處理中 . . .</Text>
          }
          {/* ---------------- */}
          <View style={styles.btnContainer}>
            <TouchableOpacity 
              style={styles.btn} 
              onPress={()=> {
                setVerifyAddr("null")
                setPage('account')
              }}
            >
              <Text style={[styles.fontSize, { color: '#007AFF' }]}>取消</Text>
            </TouchableOpacity>
            {
              amount >= balance || transaction ? null :
              <TouchableOpacity 
                style={[styles.btn, { backgroundColor: '#007AFF' }]}
                onPress={sendTransaction}
              >
                <Text style={[styles.fontSize, { color:'#fff' }]}>確認</Text>
              </TouchableOpacity>
            }
          </View>
        </View>
        :
        <View>
          <TextInput
            onChangeText={handleTest}
            value={addressTo}
            placeholder='搜尋公開地址(0x)' 
            style={styles.addressInputBox}
          />
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.flex}>
              { verifyAddr=="false" && <Text style={{ color: 'red' }}>接收位址錯誤</Text> }
            </View>
            <Text onPress={()=>setPage("account")} style={styles.cancelBtn}>取消</Text>
          </View>
        </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  fontSize: { 
    fontSize: 19 
  },
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
    padding: 8,
    marginBottom: 10,
    borderColor: "#4D80E6", 
    borderWidth:1, 
    borderRadius:8
  },
  address: { 
    flex:1, 
    paddingRight: 10, 
    color: '#4D80E6' ,
  },
  greenColor: { 
    color: '#36BF36',
  },
  redColor: { 
    color: 'red', 
    textAlign:'right' ,
  },
  processText: {
    flex:1,  
    textAlign:'right', 
    fontWeight: '500',  
    fontSize: 17,  
    color: 'dimgray'
  },
  addressInputBox: {
    flexDirection:'row', 
    alignItems:'center', 
    backgroundColor: '#fff', 
    padding: 8,
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