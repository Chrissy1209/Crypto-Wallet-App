import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import 'react-native-get-random-values'
import '@ethersproject/shims'
import { ethers } from 'ethers';

export function CreateScreen({ navigation }) {
  const [declaratoin, setDeclaration] = useState(false)
  const [phrase, setPhrase] = useState('')
  const [address, setAddress] = useState('')

  //---------------

  useEffect(() => {
    const action = () => {
      const wallet = ethers.Wallet.createRandom()
      console.log(wallet)
      console.log('address:', wallet.address)
      setAddress(wallet.address)
      console.log('mnemonic:', wallet.mnemonic.phrase)
      setPhrase(wallet.mnemonic.phrase)
      console.log('privateKey:', wallet.privateKey)
    }
    action()
  }, [])

  const handleNext = useCallback(() => {
    navigation.push('Create2', { phrase: phrase, address: address })
  }, [phrase, address])
  const handleDeclaration = useCallback(() => {
    setDeclaration(true)
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>Your Secret Recovery Phrase</Text>
      </View>
      <View style={styles.subContainer}>
        <Text style={styles.fontSize}>註記詞將可協助您用更簡單的方式備份帳戶資訊。{'\n\n'}警告：絕對不要洩漏您的註記詞。{'\n'}任何人得知註記詞代表他可以竊取您所有的代幣。{'\n'}</Text>
        <View style={styles.phraseContainer}>
          {
            declaratoin ? <Text style={styles.phraseText}>{phrase}</Text>
              : <Text style={styles.nonPhraseText}>{phrase}</Text>
          }
        </View>
        <View style={styles.btn}>
          {
            declaratoin ? <Button onPress={handleNext} title="下一步" />
              : <Button onPress={handleDeclaration} title="我明白了" />
          }
        </View>
      </View>
    </View>
  );
}

export function CreateScreen2({ navigation, route }) {
  const phrase = route.params.phrase.split(' ')
  const [check, setCheck] = useState([])
  const [errMes, setErrMes] = useState(false)

  //---------------

  return (
    <View style={[styles.container, styles2.container]}>
      <View style={styles2.title}>
        {
          errMes ? <Text style={[styles2.titleText, { color: 'red' }]}>註記詞錯誤</Text>
            : <Text style={styles2.titleText}>確認您已經備份的註記詞</Text>
        }
      </View>
      <View style={[styles2.boxContainer, styles2.checkBoxCtner]}>
        {
          check.map((e, index) => (
            <View key={index} style={[styles2.phraseBox, styles2.checkBox]}>
              <Button
                title={e}
                onPress={() => {
                  const one = check.slice(0, check.indexOf(e))
                  const two = check.slice(check.indexOf(e) + 1, check.length)
                  setCheck(() => [...one, ...two])
                  setErrMes(false)
                }}
              />
            </View>
          ))
        }
      </View>
      <View style={[styles2.boxContainer, styles2.phraseBoxCtner]}>
        {
          phrase.map((e, index) => {
            if (check.indexOf(e) !== -1) {
              return (
                <View key={index} style={styles2.phraseBox}>
                  <Button disabled title={e} />
                </View>
              )
            }
            return (
              <View key={index} style={styles2.phraseBox}>
                <Button
                  title={e}
                  onPress={() => {
                    setCheck((pre) => [...pre, e])
                  }}
                />
              </View>
            )
          })

        }
      </View>
      <View style={styles.btn}>
        {
          check.length === phrase.length
            ? (
              <Button
                onPress={() => {
                  if (check.every((e, index) => e !== phrase[index])) setErrMes(true)
                  else {
                    navigation.goBack()
                    navigation.goBack()
                    navigation.navigate('Home', { addr: route.params.address, mnem: route.params.phrase })
                  }
                }}
                title="完成"
              />
            )
            : <Button disabled title="完成" />
        }
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
  fontSize: {
    fontSize: 19,
  },
  subContainer: {
    flex: 4,
    paddingTop: 28,
  },
  phraseContainer: {
    flex: 4,
    justifyContent: 'center',
  },
  phraseText: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    color: 'gray',
    textAlign: 'center',
    fontSize: 20,
    borderRadius: 10,
    borderWidth: 1,
  },
  nonPhraseText: {
    color: '#EDEDED',
    padding: 20,
    fontSize: 20,
  },
  btn: {
    flex: 1,
    paddingVertical: 14,
  },
})
const styles2 = StyleSheet.create({
  container: {
    paddingHorizontal: 40,
  },
  title: {
    flex: 1,
    alignItems: 'center',
  },
  titleText: {
    fontWeight: '500',
    fontSize: 24,
  },
  boxContainer: {
    flex: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginHorizontal: -30,
  },
  checkBoxCtner: {
    flexWrap: 'wrap',
  },
  checkBox: {
    backgroundColor: '#EDEDED',
    borderColor: '#2196F3',
    borderWidth: 1,
  },
  phraseBoxCtner: {
    flexWrap: 'wrap-reverse',
  },
  phraseBox: {
    backgroundColor: '#fff',
    borderRadius: 8,
    width: '30%',
    margin: 4,
  },
})
