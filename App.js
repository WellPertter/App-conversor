// Deus é incrível e Deus, obrigado por me acompanhar em todo o momento, obrigado! 

import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, Text, View, ActivityIndicator } from 'react-native';
import { Button } from './src/components/Button';
import { styles } from './App.styles';
import { currencies } from './src/constants/currencies';
import { Input } from './src/components/Input';
import { ResultCard } from './src/components/ResultCard';
import { exchangeRateApi } from './src/services/Api';
import { useState } from 'react';
import { convertCurrency } from './src/Utils/convertCurrency';

export default function App() {
  const [amount, setAmount] = useState(0)
  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('BRL')
  const [result, SetResult] = useState('')
  const [loading, Setloading] = useState(false)
  const [exchangerate, SetExchangerate] = useState(null)






  async function fetchExchangeRate() {

    try {
      Setloading(true)

      if (!amount) return null

      const data = await exchangeRateApi(fromCurrency)
      const rate = data.conversion_rates[toCurrency]
      const convertedAmount = convertCurrency(amount, rate)

      SetExchangerate(rate)

      console.log(convertedAmount)

      SetResult(convertedAmount)
    } catch (err) {
      alert('Erro, tente novamente')
    } finally {
      Setloading(false)
    }



  }


  function swapCurrency() {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
    SetResult('')
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <StatusBar style="light" />

          <View style={styles.header}>
            <Text style={styles.title}>Conversor de Moedas</Text>
            <Text style={styles.subTitle}>Conversar o valor entre diferentes moedas</Text>
          </View>

          <View style={styles.card} > 
            <Text style={styles.label} >De:</Text>
            <View style={styles.currencyGrid} >
              {currencies.map(currency => (
                <Button 
                key={currency.code}
                variantText={currency.code}
                onPress={() => setFromCurrency(currency.code)}
                isSelected={(fromCurrency===currency.code)}
                >
                </Button>
              ))}
              
            </View>
            
            <Input variantText="Valor:" value={amount} onChangeText={setAmount}></Input>

            <TouchableOpacity 
            style={styles.swapButton}
            onPress={swapCurrency}
            >
                <Text style={styles.swapButtonText}>
                    ↑↓
                </Text>
            </TouchableOpacity>

            <Text style={styles.label} >Para:</Text>
            <View style={styles.currencyGrid} >
              {currencies.map(currency => (
                <Button 
                variant='secundary'
                key={currency.code}
                variantText={currency.code}
                onPress={() => setToCurrency(currency.code)}
                isSelected={(toCurrency===currency.code)}  
                >
                </Button>
              ))}
              
            </View>
          </View>

          <TouchableOpacity 
          style={[styles.convertButton, (!amount || loading) &&  styles.convertButtonDisable]}
          onPress={fetchExchangeRate}
          disabled={!amount || loading}
          >
            {

            loading ? (
              <ActivityIndicator color='white'/>

            ) : (
              <Text style={styles.swapButtonText}>
                  Converter
              </Text>
            )

            }

          </TouchableOpacity>

          <ResultCard
            exchangerate={exchangerate}
            result={result}
            fromCurrency={fromCurrency}
            toCurrency={toCurrency}
            currencies={currencies}
              
          />

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );

}
