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
    alignItems: "flex-end",
    padding: "5% 0 0 52%",
    lineHeight:"1.5pt",
    fontFamily: "Raleway-regular",
    fontSize: "2.4vw",
    fontWeight: "800"
  },
  subcontainerL: {
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "5% 0 0 10%",
    lineHeight:"1.5pt",
    fontFamily: "Raleway-regular",
    fontSize: "2.4vw",
    fontWeight: "800"
  },
  container: {
    flexDirection: "row"
  },
  title:{
    padding: "5% 0 0 17%",
    fontFamily: "Raleway-regular",
    fontSize: "3.7vw",
    fontWeight: "800"
  }
})
export default styles