import { View, StyleSheet, TextInput, Text, Button } from 'react-native';
import { useState, useCallback } from 'react';
import 'react-native-get-random-values'
import '@ethersproject/shims'
import { ethers } from 'ethers';

export default function Import({ navigation }) {
  const [phrase, setPhrase] = useState('');
  const [errMes, setErrMes] = useState(false);

  //---------------

  const handleTextChange = useCallback((e) => {
    setErrMes(false)
    setPhrase(e)
  }, [])

  const handleSubmit = useCallback(() => {
    try {
      const mnemonic = 'insect clutch budget nominee consider cradle chef slam soap spoil man rotate'
      const mnemonicWallet = ethers.Wallet.fromMnemonic(phrase);

      navigation.goBack()
      navigation.navigate('Home', { addr: mnemonicWallet.address, mnem: mnemonic })
    } catch (err) {
      setErrMes(true)
    }
  }, [phrase, navigation])

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>Your Secret Recovery Phrase</Text>
      </View>
      <View style={styles.subContainer}>
        <Text style={styles.fontSize}>助記詞一般由 12、15、18、21 個{'\n'}英文單詞構成。{'\n\n'}輸入您的註記詞以恢復錢包。{'\n'}</Text>
        <View style={styles.phraseContainer}>
          <TextInput
            multiline
            style={styles.phraseBox}
            onChangeText={handleTextChange}
            value={phrase}
          />
          {
            errMes ? <Text style={styles.errMes}>Invalid Secret Recovery Phrase</Text>
              : <View style={styles.emptyBox} />
          }
        </View>
        <View style={styles.btnContainer}>
          {
            phrase === '' ? <Button disabled title="提交" />
              : <Button onPress={handleSubmit} title="提交" />
          }
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: '#EDEDED',
  },
  title: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  titleText: {
    fontWeight: '500',
    fontSize: 32,
  },
  subContainer: {
    flex: 4,
    paddingTop: 28,
  },
  fontSize: {
    fontSize: 19,
  },
  phraseContainer: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  phraseBox: {
    height: 150,
    width: '100%',
    marginTop: 10,
    padding: 20,
    backgroundColor: '#fff',
    color: 'gray',
    textAlign: 'center',
    fontSize: 20,
    borderRadius: 10,
    borderWidth: 1,
  },
  errMes: {
    color: 'red',
    fontSize: 15,
    marginTop: 10,
  },
  emptyBox: {
    marginTop: 28,
  },
  btnContainer: {
    flex: 1,
    paddingVertical: 14,
  },
});
