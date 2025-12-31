import {Text, View, TextInput} from 'react-native';
import { styles } from './styles';

export function Input({variantText='', value, onChangeText}){
    return (
        <View style={styles.container}>  
            <Text style={styles.label}>
                {variantText}
            </Text>
            <TextInput style={styles.input}
            placeholder='0.00'
            placeholderTextColor="#94a3b8"
            value={value}
            onChangeText={onChangeText}
            keyboardType='numeric'

            >

            </TextInput>


        </View>
    )
}

