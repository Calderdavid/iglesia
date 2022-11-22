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
    fontSize: "1.5vw",
    padding: "15% 0 0 0",
    alignItems: "left",
    letterSpacing: ".8pt",
    lineHeight:"2pt",
  },
  container2: {
    flexDirection: "column",
    fontFamily: "Raleway-regular",
    fontSize: "1.5vw",
    padding: "8% 0 0 0",
    alignItems: "left",
    letterSpacing: ".8pt",
    lineHeight:"2pt",
  },
  sello: {
    margin: "2vw 0 0 33vw",
    fontSize: "1.4vw",
    fontWeight: "800",
    width: "16vw",
    height: "14vw",
    padding: "5% 0 0 0%",
    alignItems: "center",
    borderColor: "black",
    borderWidth: "2px"
  }
})
export default styles