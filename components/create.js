import { StyleSheet, Text, View, SafeAreaView, Button, Modal, TextInput } from 'react-native';
import { useState, useEffect } from 'react';
import "react-native-get-random-values"
import "@ethersproject/shims"
import { ethers } from "ethers";


export const CreateScreen = ({ navigation }) => {
  const [declaratoin, setDeclaration] = useState(false)
  const [phrase, setPhrase] = useState('')
  const [address, setAddress] = useState('')

//---------------

  useEffect(()=>{
    console.log("useEffect . . .")
    action()
  }, [])
  const action = async () => {
    const wallet = ethers.Wallet.createRandom()
    console.log(wallet)
    console.log('address:', wallet.address)
    setAddress(wallet.address)
    console.log('mnemonic:', wallet.mnemonic.phrase)
    setPhrase(wallet.mnemonic.phrase)
    console.log("My phrase = " + phrase)
    console.log('privateKey:', wallet.privateKey)
  }

//---------------

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>Your Secret Recovery Phrase</Text>
      </View>
      <View style={{ flex: 4, paddingTop: 28 }}>
        <Text style={{ fontSize: 19 }}>註記詞將可協助您用更簡單的方式備份帳戶資訊。{"\n\n"}警告：絕對不要洩漏您的註記詞。{"\n"}任何人得知註記詞代表他可以竊取您所有的代幣。{"\n"}</Text>
        <View style={{ flex:4, justifyContent: "center" }}>
        {
          declaratoin ? 
            <Text style={styles.phraseText}>{phrase}</Text>
          :
            <Text style={styles.nonPhraseText}>{phrase}</Text>
        }
        </View>
        <View style={{ flex:1, paddingVertical: 14 }}>
        {
          declaratoin ? 
            <Button 
              onPress={() => navigation.push('Create2', {phrase: phrase, address: address})} 
              title="下一步" 
            />
          :
            <Button 
              onPress={() => setDeclaration(true)} 
              title="我明白了" 
            />
        }
        </View>
      </View>
    </View>
  );
}

export const CreateScreen2 = ({ navigation, route }) => {
  console.log('test');
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {/* <Text style={{ fontSize: 30 }}>{route.params.phrase}</Text> */}
      <Button 
        onPress={() => {
          navigation.goBack() 
          navigation.goBack()
          navigation.navigate("Account", {addr: route.params.address})
        }} 
        title="Close" 
      />
    </View>
  )
}

export const CreateScreen3 = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 30 }}>創建錢包3</Text>
      <Button 
        onPress={() => {
          // navigation.goBack()
          // navigation.goBack() 
          // navigation.navigate("Account")
          navigation.navigate("Home")
        }} 
          title="Close" 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40, 
    backgroundColor: "#EDEDED", 
  },
  title: { 
    flex: 1, 
    justifyContent: "flex-end", 
  },
  titleText: { 
    fontWeight: "500", 
    fontSize: 32 
  },
  phraseText: { 
    padding: 20,
    backgroundColor:"#fff",
    color: "gray",
    textAlign:'center',
    fontSize: 20,
    borderRadius:10,
    borderWidth: 1,
  },
  nonPhraseText: { 
    color: "#EDEDED", 
    padding: 20, 
    fontSize: 20 
  },
  
})