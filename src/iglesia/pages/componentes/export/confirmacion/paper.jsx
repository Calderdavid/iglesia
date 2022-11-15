import React from 'react'

import { Page, Document, View } from '@react-pdf/renderer'

import Header from './components/header/header'
import Body from './components/body/body'

export default function Paper(props) {
    const data = props.actual
    return(
        <Document>
            <Page size="LEGAL">
                    <View style={{flexDirection: "row", height: "1008px"}}> 
                        <View style={{flexDirection: "column"}}>
                            <Header></Header>
                            <Body actual={data}></Body>
                        </View>
                        <View style={{paddingRight: "10%", width: "1%", height: "100%", backgroundColor: "white"}}></View>
                    </View>
            </Page>
        </Document>
    )
}