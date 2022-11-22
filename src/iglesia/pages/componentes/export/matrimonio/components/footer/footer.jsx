import { Text, View, Image } from '@react-pdf/renderer'

import styles from './footer.module.js'

export default function Footer(props) {
  return (
    <View>
      <View style={{flexDirection: "row"}}>
        <View style={{flexDirection: "column"}}>
          <View style={styles.container}>
              <Text>___________________________________</Text>
              <Text style={{paddingLeft: "11vw"}}>PARROCO</Text>
          </View>
          <View style={styles.container2}>
              <Text> Derechos $_________________________</Text>
          </View>
        </View>
        <View style={styles.sello}>
            <Text>SELLO</Text>
            <Text>PARROQUIAL</Text>
        </View>
      </View>
    </View>
  )
}