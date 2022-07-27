import { StyleSheet, Text, View, Button } from 'react-native';
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
  const [check, setCheck] = useState([])

  return (
    <View style={[styles.container, {paddingHorizontal: 40}]}>
      <View style={{flex: 1, alignItems:'center'}}>
        <Text style={[styles.titleText, {fontSize: 24}]}>確認您已經備份的註記詞</Text>
      </View>
      <View style={[styles.boxContainer, {marginTop: 15, flexWrap: 'wrap', alignItems:'center'}]}>
        {
          check.map((e, index) => ( 
            <Text
              key={index} 
              style={[
                styles.box, {
                color: '#2196F3',
                borderColor:'#2196F3', 
                borderWidth: 1,
                backgroundColor: "#EDEDED", 
                paddingVertical: 5
              }]}
              onPress={()=>{
                setCheck(check.slice(0, check.indexOf(e)))
                // setCheck(()=>{
                //   delete check[check.indexOf(e)]
                // })
              }}
            >{e}</Text>
          ))
        }
      </View>
      <View style={styles.boxContainer}>
        {
          phrase.map((e, index) => {
            if(check.indexOf(e) != -1) {
              return ( 
                <View key={index} style={styles.box}>
                  <Button
                    disabled
                    title={e}
                    onPress={() => {
                      setCheck((pre) => [...pre, e])
                    }}
                  />
                </View>  
              )
            } else {
              return ( 
                <View key={index} style={styles.box}>
                  <Button
                    title={e}
                    onPress={() => {
                      setCheck((pre) => [...pre, e])
                    }}
                  />
                </View>
              )
            }
          })
        }
      </View>
      <View style={styles.btn}>
        <Button 
          onPress={() => {
            navigation.goBack() 
            navigation.goBack()
            navigation.navigate("Home", {addr: route.params.address, mnem: route.params.phrase})
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
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    color: "gray",
    textAlign:'center',
    fontSize: 20,
    borderRadius: 10,
    borderWidth: 1,
  },
  nonPhraseText: { 
    color: "#EDEDED", 
    padding: 20, 
    fontSize: 20 
  },
  boxContainer: { 
    flex: 4,
    marginHorizontal: -30,
    justifyContent: 'center', 
    flexWrap: 'wrap-reverse', 
    flexDirection: 'row'
  },
  box: { 
    backgroundColor: "#fff", 
    borderRadius: 8,
    width: "30%", 
    margin: 4,
    fontSize: 18,
    textAlign: 'center' 
  },
  btn: { 
    flex:1, 
    paddingVertical: 14 
  },
})
