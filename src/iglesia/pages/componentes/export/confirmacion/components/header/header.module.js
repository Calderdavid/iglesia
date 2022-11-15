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
  subcontainerR: {
    flexDirection: "column",
    alignItems: "center",
    padding: "9% 0 0 32%",
    lineHeight:"1.5pt",
    fontFamily: "Raleway-regular",
    fontSize: "2.4vw",
    fontWeight: "800"
  },
  subcontainerL: {
    flexDirection: "column",
    alignItems: "center",
    padding: "9% 0 0 10%",
    lineHeight:"2pt",
    fontFamily: "Raleway-regular",
    fontSize: "2.4vw",
    fontWeight: "800"
  },
  container: {
    flexDirection: "row"
  },
  subsubcontainerR: {
    flexDirection: "column",
    alignItems: "center",
    padding: "9% 0 0 12%",
    lineHeight:"1.5pt",
    fontFamily: "Raleway-regular",
    fontSize: "2.4vw",
    fontWeight: "800"
  },
})
export default styles