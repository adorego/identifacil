'use client'
import {
    Document,
    Text,
    Page,
    StyleSheet,
    Image,
    View
} from '@react-pdf/renderer'
import Logo from '@/common/images/logo-sippy.png'
import ministerioLogo from '@/common/images/ministerio-justicia-logo.png'
import {useEffect, useState} from "react";
import TableHeaderPDF from "@/app/(pdf)/reportes/table/TableHeaderPDF";
import dayjs from "dayjs";

const styles =  StyleSheet.create({
    page:{
        backgroundColor: "#FFF",
        padding: 10,
    },
    section:{
        display: "flex",
        flexDirection: "row",
        margin: 10,
        felxGrow: 1

    },
    imgContainer:{
        width: 42,
        height: 'auto'
    },
    imgContainerMinisterio:{
        width: 'auto',
        height: '50',

    },
    paragraph:{
        fontSize: '11px',
    },
    title:{
        textTransform: 'uppercase',
        marginTop: '30px',
        fontWeight: 'extrabold',
        fontSize: '14px',
        width: '100%',
        textAlign: 'center'
    }
})

// @ts-ignore
export default function IngresosPDF({data}){
    const [state, setState] = useState({
        establecimiento: '',
        fecha: '',
        datos: {}
    })

    useEffect(() => {
        if (data){
            setState(data);
        }
    }, [data]);

    return(
        <Document>
            <Page size='A4' style={styles.page} orientation='portrait'>
                <View style={
                    {
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderBottom: '1px solid lightgray',
                        paddingBottom: '10px'

                    }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img alt='Logo Ministerio' src={ministerioLogo.src}  style={styles.imgContainerMinisterio} />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img alt='Logo Sippy' src={Logo.src}  style={styles.imgContainer} />
                </View>
                <View>
                    <Text style={styles.title}>
                        Parte diario - Población penal
                    </Text>
                </View>
                <View style={
                    {
                        marginTop: '40px',
                        marginLeft: 'auto',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        width: '100%',
                        alignItems: 'baseline'
                    }}>
                    <View>
                        <Text style={styles.paragraph}>
                            Establecimiento:
                        </Text>
                        <Text style={{fontWeight: 'bold', fontSize: '11px'}}>
                            Minga Guazu
                        </Text>
                    </View>

                    <View>
                        <Text style={[styles.paragraph, {marginTop: '10px'}]}>
                            Fecha:
                        </Text>
                        <Text style={{fontWeight: 'bold', fontSize: '11px'}}>
                            {dayjs().format('DD/MM/YYYY')}
                        </Text>
                    </View>

                </View>



                { state ? <TableHeaderPDF datos={state}/>
                    : '' }


            </Page>
        </Document>
    )
}