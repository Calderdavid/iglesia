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
    let confirmacionDate = ""
    let mesConfirmacion = ""

    //console.log(data)
    if (data[0] != undefined){
        if (data[0] !== ""){
            cumpleDate = data[0].birth.replace("?","1").split("-")
            mesCumple = new Date(data[0].birth.replace("?","1"))
            console.log(mesCumple)
        }
        if (data[1] !== ""){
            bautizoDate = data[1].Bautismo.b_date.replace("?","1").split("-")
            mesBautizo = new Date(data[1].Bautismo.b_date.replace("?","1"))
            confirmacionDate = data[1].Confirmacion.c_date.replace("?","1").split("-")
            mesConfirmacion = new Date(data[1].Confirmacion.c_date.replace("?","1"))
        }
    }
    return (
        <View>
            {data[1] === "" || data[1].Confirmacion === "" ? (
            <View style={styles.container}>
                <Text>Nombres _______________________________________________________</Text>
                <Text>Apellidos ______________________________________________________</Text>
                <Text>Hijo de ________________________________________________________</Text>
                <Text>y de ___________________________________________________________</Text>
                <Text>Bautizado en ___________________________________________________</Text>
                <Text>el _____________________________ Libro __________ Pág. __________</Text>
                <Text>ha sido confirmado en (lugar) ___________________________________</Text>
                <Text>el (fecha) _____________________________________________________</Text>
                <Text>por (ministro) ________________________________________________</Text>
                <Text>siendo padrino (madrina) _______________________________________</Text>
                <Footer>
                </Footer>
            </View>
            ) : (
            <View style={styles.container} wrap={false} >
                <View style={{flexDirection: "column", paddingBottom: "1%"}}>
                    <Text style={{flex: 1, padding: "0 0 0 16%"}}>{data[0].name}</Text>
                </View>
                <Text>Nombres _______________________________________________________</Text>
                <View style={{flexDirection: "column", paddingBottom: "1%"}}>
                    <Text style={{flex: 1, padding: "0 0 0 16%"}}>{data[0].lastname}</Text>
                </View>
                <Text>Apellidos ______________________________________________________</Text>
                {data[1].parent_Data.p_father === "" ? (<></>) : (
                <View style={{flexDirection: "column", paddingBottom: "1%"}}>
                    <Text style={{flex: 1, padding: "0 0 0 13%"}}>{data[1].parent_Data.p_father}</Text>
                </View>
                )}
                <Text>Hijo de ________________________________________________________</Text>
                {data[1].parent_Data.p_mother === "" ? (<></>) : (
                <View style={{flexDirection: "column", paddingBottom: "1%"}}>
                    <Text style={{flex: 1, padding: "0 0 0 9%"}}>{data[1].parent_Data.p_mother}</Text>
                </View>
                )}
                <Text>y de ___________________________________________________________</Text>
                {bautizoDate[0] === "" ? (<></>) : (
                <View style={{flexDirection: "column", paddingBottom: "1%"}}>
                    <Text style={{flex: 1, padding: "0 0 0 6%"}}>{bautizoDate[2]} de {new Intl.DateTimeFormat('es-ES', {month: "long"}).format(mesBautizo)} del año {bautizoDate[0]}</Text>
                    <Text style={{flex: 1 ,padding: "0 0 0 71%"}}>{data[0].Tomo} </Text>
                    <Text style={{flex: 1, padding: "0 0 0 93%"}}>{data[0].Pag} </Text>
                </View>
                )}
                <Text>el _____________________________ Libro __________ Pág. __________</Text>
                {data[1].Confirmacion.c_place2 === "" ? (<></>) : (
                <View style={{flexDirection: "column", paddingBottom: "1%"}}>
                    <Text style={{flex: 1, padding: "0 0 0 48%"}}>{data[1].Confirmacion.c_place1} {data[1].Confirmacion.c_place2}</Text>
                </View>
                )}
                <Text>ha sido confirmado en (lugar) ___________________________________</Text>
                {data[1].Bautismo.b_date === "" ? (<></>) : (
                <View style={{flexDirection: "column", paddingBottom: "1%"}}>
                    <Text style={{flex: 1, padding: "0 0 0 18%"}}>{confirmacionDate[2]} de {new Intl.DateTimeFormat('es-ES', {month: "long"}).format(mesConfirmacion)} del año {confirmacionDate[0]}</Text>
                </View>
                )}
                <Text>el (fecha) _____________________________________________________</Text>
                {data[1].Confirmacion.c_father === "" ? (<></>) : (
                <View style={{flexDirection: "column", paddingBottom: "1%"}}>
                    <Text style={{flex: 1, padding: "0 0 0 23%"}}>{data[1].Confirmacion.c_father}</Text>
                </View>
                )}
                <Text>por (ministro) ________________________________________________</Text>
                {data[1].Confirmacion.c_padrino !== "" ? (
                    data[1].Confirmacion.c_madrina !== "" ? (
                        <View >
                            <View style={{flexDirection: "column", paddingBottom: "1%"}}>
                                <Text style={{flex: 1, padding: "0 0 0 40%"}}>{data[1].Confirmacion.c_padrino}</Text>
                            </View>
                            <Text>siendo padrino (madrina) _______________________________________</Text>
                            <View style={{flexDirection: "column", paddingBottom: "1%"}}>
                                <Text style={{flex: 1, padding: "0 0 0 4%"}}> {data[1].Confirmacion.c_madrina}</Text>
                            </View>
                            <Text>y __________________________________________________________</Text>
                        </View>
                        ) : (
                        <>
                            <View style={{flexDirection: "column", paddingBottom: "1%"}}>
                                <Text style={{flex: 1, padding: "0 0 0 40%"}}>{data[1].Confirmacion.c_padrino}</Text>
                            </View>
                            <Text>siendo padrino (madrina) _______________________________________</Text>
                        </>
                )) : (
                    data[1].Confirmacion.c_madrina !== "" ? (
                        <>
                            <View style={{flexDirection: "column", paddingBottom: "1%"}}>
                                <Text style={{flex: 1, padding: "0 0 0 40%"}}>{data[1].Confirmacion.c_madrina}</Text>
                            </View>
                            <Text>siendo padrino (madrina) _______________________________________</Text>
                        </>
                    ) : (
                    <>
                        <Text>siendo padrino (madrina) _______________________________________</Text>
                    </>
                ))}
                <Footer>
                </Footer>
            </View>
            )}
            
        </View>
    )
}