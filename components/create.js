import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
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
  const action = () => {
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
      <View style={styles.subTitle}>
        <Text style={{ fontSize: 19 }}>註記詞將可協助您用更簡單的方式備份帳戶資訊。{"\n\n"}警告：絕對不要洩漏您的註記詞。{"\n"}任何人得知註記詞代表他可以竊取您所有的代幣。{"\n"}</Text>
        <View style={{ flex:4, justifyContent: "center" }}>
        {
          declaratoin ? 
            <Text style={styles.phraseText}>{phrase}</Text>
          :
            <Text style={styles.nonPhraseText}>{phrase}</Text>
        }
        </View>
        <View style={styles.btn}>
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
  const phrase = route.params.phrase.split(" ")
  const [check, setCheck] = useState('')

  return (
    <View style={styles.container}>
      <View style={{flex: 2, alignItems:'center'}}>
        <Text style={[styles.titleText, {fontSize: 24}]}>確認您已經備份的註記詞</Text>
      </View>
      <View style={{ flex: 4, alignItems:'center', justifyContent:'flex-start'}}>
        <Text style={{ fontSize: 19, }}>{check}</Text>
      </View>
      <View style={styles.boxContainer}>
        {
          phrase.map((e, index)=>(
            <Text 
              onPress={() => {
                setCheck((pre) => [...pre, e])
              }}
              key={index}
              style={styles.box}
            >
            {e}</Text>
          ))
        }
      </View>
      <View style={styles.btn}>
        <Button 
          onPress={() => {
            navigation.goBack() 
            navigation.goBack()
            navigation.navigate("Account", {addr: route.params.address})
          }} 
          title="完成"
        />
      </View>
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
  subTitle: { 
    flex: 4, 
    paddingTop: 28 
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
  boxContainer: { 
    flex: 5, 
    justifyContent: 'center', 
    flexWrap: 'wrap-reverse', 
    flexDirection: 'row'
  },
  box: { 
    backgroundColor: "#fff", 
    borderColor: "gray", 
    borderRadius:4, 
    borderWidth: 1, 
    color:"#2196F3", 
    width: "45%", 
    paddingVertical: 3, 
    paddingHorizontal: 7, 
    margin: 3, 
    fontSize: 22, 
    textAlign: 'center' 
  },
  btn: { 
    flex:1, 
    paddingVertical: 14 
  },

})
