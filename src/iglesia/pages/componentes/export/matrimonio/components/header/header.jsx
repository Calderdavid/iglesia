import { Text, View, Image } from '@react-pdf/renderer'

import styles from './header.module.js'

export default function Header(props) {
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.subcontainerL}>
          <Text>D I O C E S I S</Text>
          <Text> </Text>
          <Text style={{paddingLeft: "2vw"}}>CHILE</Text>
        </View>
        <View style={styles.subcontainerR}>
          <View style={{flexDirection: "column", paddingBottom: "2%"}}>
            <Text style={{flex: 1, padding: "0 0 1% 35%"}}>SANTO TORIBIO</Text>
            <Text>PARROQUIA__________________________________________</Text>
          </View>
        </View>
      </View>
      <View style={styles.title}>
        <Text>CERTIFICADO DE MATRIMONIO</Text>
      </View>
    </View>
  )
}