import { Font, StyleSheet } from '@react-pdf/renderer'
import RalewayRegular from '../../../../../../../assets/fonts/raleway-v28-latin-regular.ttf'
import RalewayBold from '../../../../../../../assets/fonts/raleway-v28-latin-800.ttf'

Font.register({
    family: "Raleway-regular",
    fonts: [
        { src: RalewayRegular},
        { src: RalewayBold, fontWeight: 800},
    ]
})

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    fontFamily: "Raleway-regular",
    fontSize: "2.4vw",
    padding: "15% 0 0 10%",
    alignItems: "center",
    letterSpacing: "1pt",
    lineHeight:"2pt",
  },
  sello: {
    fontSize: "2vw",
    fontWeight: "800",
    padding: "5% 0 0 80%",
    alignItems: "center",
  }
})
export default styles