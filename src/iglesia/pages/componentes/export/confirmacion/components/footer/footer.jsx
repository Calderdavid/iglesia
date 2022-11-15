import { Text, View, Image } from '@react-pdf/renderer'

import styles from './footer.module.js'

export default function Footer(props) {
  return (
    <>
      <View style={styles.masterContainer}>
          <View style={styles.sello}>
              <Text style={{paddingLeft: "18%"}}>SELLO</Text>
              <Text>PARROQUIAL</Text>
          </View>
          <View style={styles.container}>
              <Text>________________________________</Text>
              <Text>PARROCO</Text>
          </View>
      </View>
      <View style={styles.masterContainer}>
        <View style={styles.Nota}>
          <Text>NOTA:</Text>
        </View>
        <View style={styles.notaContents}>
          <Text>El confirmado —o su padrino (madrina)— entregará esta ficha al ministro</Text>
          <Text>que acompaña al Obispo (o su Delegado) en el momento de la imposición</Text>
          <Text>de las manos, pronunciando en voz alta su nombre de pila.</Text>
          <Text>Después de la Celebración, esta boleta debe enviarse al lugar del bautismo</Text>
          <Text>para su notificación.</Text>
        </View>
      </View>
    </>
  )
}