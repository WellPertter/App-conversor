import {Text, TouchableOpacity} from 'react-native';
import { styles } from './styles';

export function Button({variant = "primary", variantText="Clique aqui", onPress, isSelected}){
    return (
        <TouchableOpacity 
        style={[
            styles.button,
            isSelected && (variant === "primary" ? styles.buttonPrimary : styles.buttonSecondary)
        ]} 
        onPress={onPress}>
            <Text style={styles.buttonText}>{variantText}</Text>
        </TouchableOpacity>
    )
}

