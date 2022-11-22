import { Text, View, Image } from '@react-pdf/renderer'

import styles from './body.module.js'
import Footer from '../footer/footer.jsx'

export default function Body(props) {
    const data = props.actual
    const date = new Date()
    let bautizoDate = ""
    let cumpleDate = ""
    let mesBautizo = ""
    let mesCumple = ""
    console.log(data)
    if (data[0] !== undefined){
        if (data[0] !== ""){
            cumpleDate = data[0].birth.replace("?","1").split("-")
            mesCumple = new Date(data[0].birth.replace("?","1"))
            console.log(mesCumple)
        }
        if (data[1] !== ""){
            bautizoDate = data[1].Bautismo.b_date.replace("?","1").split("-")
            mesBautizo = new Date(data[1].Bautismo.b_date.replace("?","1"))
        }
    }

    return (
        <View>
            {data[1] === "" ? (
            <View style={styles.container}>
                <Text>CERTIFICO que en el Libro N° ________ de matrimonios, página _________</Text>
                <Text>se encuentra la siguiente partida:</Text>
                <Text>En____________________________________________________________________</Text>
                <Text>Parroquia ____________________________________________________________</Text>
                <Text>a ______________________________ de _______________ de _______________</Text>
                <Text>_____________________________________ las tres moniciones de derecho y</Text>
                <Text>_________________________________ impedimentos_________, ante_________</Text>
                <Text>______________________________________________________________________</Text>
                <Text>______________________________________________________________________</Text>
                <Text>Don __________________________________________________________________</Text>
                <Text>de estado ____________________________________________________________</Text>
                <Text>Hijo de ______________________________________________________________</Text>
                <Text>______________________________________________________________________</Text>
                <Text>de _______________ años de edad, bautizado en la Parroquia ________________</Text>
                <Text>__________________________________________ Libro ________ Pág. ________</Text>
                <Text>contrajo matrimonio según el Orden de Nuestra Santa Madre Iglesia con _______</Text>
                <Text>______________________________________________________________________</Text>
                <Text>de estado ____________________________________________________________</Text>
                <Text>Hija de ______________________________________________________________</Text>
                <Text>______________________________________________________________________</Text>
                <Text>de _______________ años de edad, bautizada en la Parroquia ________________</Text>
                <Text>siendo testigos ________________________________________________________</Text>
                <Text>La velación _______________ se verificó __________________________ Doy fe</Text>
                <Text>_____________________________________________________________ Párroco</Text>
                <Text>Concuerda con el original citado, y para constancia sello y firmo en _______</Text>
                <Text>______________________________________________________________________</Text>
                <Text>a ____________ de ______________________________ de 20 ____________</Text>
                <Footer>
                </Footer>
            </View>
            ) : (
            <View style={styles.container} wrap={false} >
                {data[0].Tomo === "" ? (<></>) : (
                <View style={{flexDirection: "column", paddingBottom: "1%"}}>
                    <Text style={{flex: 1 ,padding: "0 0 0 52%"}}>{data[0].Tomo} </Text>
                    <Text style={{flex: 1, padding: "0 0 0 80%"}}>{data[0].Pag} </Text>
                </View>
                )}
                <Text>CERTIFICO que en el Libro N° ________ Página _________ de</Text>
                <Text>Bautismo se encuentra la siguiente partida:</Text>
                <Text>En la Parroquia SANTO TORIBIO DE MOGROVEJO, LAS CONDES</Text>
                {bautizoDate[0] === "" ? (<></>) : (
                <View style={{flexDirection: "column", paddingBottom: "1%"}}>
                    <Text style={{flex: 1, padding: "0 0 0 6%"}}>{bautizoDate[2]}</Text>
                    <Text style={{flex: 1, padding: "0 0 0 26%"}}>{new Intl.DateTimeFormat('es-ES', {month: "long"}).format(mesBautizo)}</Text>
                    <Text style={{flex: 1, padding: "0 0 0 62%"}}>{bautizoDate[0]}</Text>
                </View>
                )}
                <Text>a ________ de ______________ del año _________ se bautizó</Text>
                <View style={{flexDirection: "column", paddingBottom: "1%"}}>
                    <Text style={{flex: 1, padding: "0 0 1% 6%"}}>{data[0].name} {data[0].lastname}</Text>
                </View>
                <Text>a _____________________________________________________________</Text>
                {data[0].rut === "" ? (<></>) : (
                <View style={{flexDirection: "column", paddingBottom: "1%"}}>
                    <Text style={{flex: 1, padding: "0 0 0 10%"}}>{data[0].rut}</Text>
                </View>
                )}
                <Text>RUT.:__________________________</Text>
                {cumpleDate[0] === "" ? (<></>) : (
                <View style={{flexDirection: "column", paddingBottom: "1%"}}>
                    <Text style={{flex: 1, padding: "0 0 0 20%"}}>{cumpleDate[2]} de {new Intl.DateTimeFormat('es-ES', {month: "long"}).format(mesCumple)} del año {cumpleDate[0]}, {data[0].birthplace}</Text>
                </View>
                )}
                <Text>nacido/a el ____________________________________________________</Text>
                {data[1].parent_Data.p_father === "" ? (<></>) : (
                <View style={{flexDirection: "column", paddingBottom: "1%"}}>
                    <Text style={{flex: 1, padding: "0 0 0 15%"}}>{data[1].parent_Data.p_father}</Text>
                </View>
                )}
                <Text>Hij__ de _______________________________________________________</Text>
                {data[1].parent_Data.p_mother === "" ? (<></>) : (
                <View style={{flexDirection: "column", paddingBottom: "1%"}}>
                    <Text style={{flex: 1, padding: "0 0 0 9%"}}>{data[1].parent_Data.p_mother}</Text>
                </View>
                )}
                <Text>y de __________________________________________________________</Text>
                <Text>Padrinos _______________________________________________________</Text>
                {data[1].Bautismo.b_padrino === "" ? (<></>) : (
                <View style={{flexDirection: "column", paddingBottom: "1%"}}>
                    <Text style={{flex: 1, padding: "0 0 0 2%"}}>{data[1].Bautismo.b_padrino} y</Text>
                </View>
                )}
                <Text>_______________________________________________________________</Text>
                {data[1].Bautismo.b_madrina === "" ? (<></>) : (
                <View style={{flexDirection: "column", paddingBottom: "1%"}}>
                    <Text style={{flex: 1, padding: "0 0 0 2%"}}>{data[1].Bautismo.b_madrina}.</Text>
                </View>
                )}
                <Text>_______________________________________________________________</Text>
                <Text>doy fe _________________________________________________________</Text>
                <Text>En constancia, sello y firmo en _____________________________________</Text>
                <View style={{flexDirection: "column", paddingBottom: "1%"}}>
                    <Text style={{flex: 1, padding: "0 0 0 7%"}}>{date.getDate()}</Text>
                    <Text style={{flex: 1, padding: "0 0 0 30%"}}>{new Intl.DateTimeFormat('es-ES', {month: "long"}).format(date)}</Text>
                    <Text style={{flex: 1, padding: "0 0 0 80%"}}>{date.getFullYear() - 2000}</Text>
                </View>
                <Text>El _______ de ________________________ de 20 __________________</Text>
                <Footer>
                </Footer>
            </View>
            )}
            
        </View>
    )
}