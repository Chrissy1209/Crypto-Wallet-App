import { View, StyleSheet, TextInput, Text, Button, Alert } from "react-native";
import { useState, useEffect } from 'react';
import "react-native-get-random-values"
import "@ethersproject/shims"
import { ethers } from "ethers";

export default function Import({ navigation }) {
  const [phrase, setPhrase] = useState("");
  const [errMes, setErrMes] = useState(false);

//---------------

  function HandleTextChange(e) {
    setErrMes(false)
    setPhrase(e)
    console.log(e);
  }

  const HandleSubmit = () => {
    try {
      let mnemonic = "insect clutch budget nominee consider cradle chef slam soap spoil man rotate"
      let mnemonicWallet = ethers.Wallet.fromMnemonic(mnemonic);
      
      navigation.goBack()
      navigation.navigate('Home', {addr: mnemonicWallet.address, mnem: mnemonic})
    }
    catch(err) {
      setErrMes(true)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>Your Secret Recovery Phrase</Text>
      </View>
      <View style={{ flex: 4, paddingTop: 28 }}>
        <Text style={{ fontSize: 19 }}>助記詞一般由 12、15、18、21 個{"\n"}英文單詞構成。{"\n\n"}輸入您的註記詞以恢復錢包。{"\n"}</Text>
        <View style={{ flex:4, justifyContent: "center", alignItems: 'center'}}>
          <TextInput
            multiline
            style={styles.phraseText}
            onChangeText={HandleTextChange}
            value={phrase}//number
            //keyboardType="numeric"
            // placeholder="insect clutch budget nominee consider cradle chef slam soap spoil man rotate"
          />
          {
            errMes ?
              <Text style={{ color: 'red', fontSize: 15, marginTop: 10}}>Invalid Secret Recovery Phrase</Text>
            :
              <Text style={{ color: "#EDEDED", fontSize: 15, marginTop: 10}}>Invalid Secret Recovery Phrase</Text>
          }
        </View>
        <View style={{ flex:1, paddingVertical: 14 }}>
          {
            phrase == "" ? 
              <Button title='提交' onPress={HandleSubmit} disabled/> 
            : 
              <Button title='提交' onPress={HandleSubmit}/>
          }
        </View>
      </View>
    </View>
  );
};

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
    height: 150,
    width: "100%",
    marginTop: 10,
    padding: 20,
    backgroundColor:"#fff",
    color: "gray",
    textAlign:'center',
    fontSize: 20,
    borderRadius:10,
    borderWidth: 1,
  },
});
