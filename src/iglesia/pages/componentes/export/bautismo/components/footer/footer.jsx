import { Text, View, Image } from '@react-pdf/renderer'

import styles from './footer.module.js'

export default function Footer(props) {
  return (
    <View>
        <View style={styles.container}>
            <Text>______________________________________</Text>
            <Text>PARROCO</Text>
        </View>
        <View style={styles.sello}>
            <Text>SELLO</Text>
            <Text>PARROQUIAL</Text>
        </View>
    </View>
  )
}