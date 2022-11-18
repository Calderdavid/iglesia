import { useEffect, useState } from 'react'
import { Box } from '@chakra-ui/react'
import Sidebar from './componentes/Sidebar/Sidebar';
import { PDFViewer } from '@react-pdf/renderer'
import Paper from './componentes/export/bautismo/paper';
import iglesiaApi from '../../api/iglesiaApi';

export const ExportBaptism = () => {
    const [isClient, setIsClient] = useState(false)
    const [hasData, setHasData] = useState(true)
    const [documento, setDocumento] = useState("")
    const [adDocumentos, setadDocumentos] = useState("")
    const RequestData = async (trim) => {
        const peticion = await iglesiaApi.post('/getdocument', {selectValue: "exportPackage", search: trim})
        setDocumento(peticion.data.documents[0])
        const getbautismo = await iglesiaApi.post('/getadjacentdocuments', {Bautismo: peticion.data.documents[0].Bautismo, Confirmacion: "", Matrimonio: "", parent_Data: peticion.data.documents[0].parent_Data, export:true})
        setadDocumentos(getbautismo.data)
        //setHasData(true)
    }
    useEffect(() => {
        setHasData(true)
    }, [adDocumentos])
    useEffect(() => {
        if (window.location.href.includes('/ExportBaptism?View=true&') === true) {
            setIsClient(true)
            setHasData(false)
            const value = window.location.href.search('&')
            const trim = window.location.href.slice(value + 1)
            RequestData(trim)
            window.history.replaceState(null, '', '/ExportBaptism')
          } else {
            //window.location.href = '/ExportBaptism'
            setIsClient(true)
          }
    }, [])
  return (
    <Box>
      <Sidebar actual={"default"}/>
      <Box marginLeft="18vw" h="100vh" style={{ display: hasData ? 'block' : 'none' }}>
        {isClient && (
          <PDFViewer position="absolute" width="100%" height="100%">
            <Paper actual={[documento, adDocumentos]}></Paper>
          </PDFViewer>
        )}
      </Box>
    </Box>
  )
}