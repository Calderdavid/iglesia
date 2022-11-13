import { Text, View, Image } from '@react-pdf/renderer'

import styles from './header.module.js'

export default function Header(props) {
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.subcontainerL}>
          <Text>D I O C E S I S</Text>
          <Text>SANTIAGO</Text>
          <Text>CHILE</Text>
        </View>
        <View style={styles.subcontainerR}>
          <Text>P A R R O Q U I A</Text>
          <Text>SANTO TORIBIO</Text>
          <Text>LAS CONDES</Text>
        </View>
      </View>
      <View style={styles.title}>
        <Text>CERTIFICADO PARTIDA DE BAUTISMO</Text>
      </View>
    </View>
  )
}