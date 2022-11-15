import { Text, View, Image } from '@react-pdf/renderer'

import styles from './header.module.js'

export default function Header(props) {
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.subcontainerL}>
          <Text style={{paddingLeft: "10%"}}>D I O C E S I S</Text>
          <Text>de _______________________</Text>
          <Text style={{paddingLeft: "10%"}}>CHILE</Text>
        </View>
        <View style={styles.subcontainerR}>
          <Text>Confirmación</Text>
          <Text>(Can 895)</Text>
        </View>
      </View>
      <View style={styles.container}>
          <View style={styles.subcontainerL}>
            <Text>PARROQUIA</Text>
            <Text>_____________________________________</Text>
            <Text>_____________________________________</Text>
          </View>
          <View style={styles.subsubcontainerR}>
            <Text>N°___________________________</Text>
          </View>
        </View>
    </View>
  )
}