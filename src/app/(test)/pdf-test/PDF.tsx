import {
    Document,
    Text,
    Page,
    StyleSheet,
    Image,
    View
} from '@react-pdf/renderer'
import Logo from '@/common/images/logo-sippy.png'
import {useEffect, useState} from "react";
import TableHeaderPDF from "@/app/(test)/pdf-test/table/TableHeaderPDF";

const styles =  StyleSheet.create({
    page:{
        backgroundColor: "#f0f0f0",
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
        height: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    paragraph:{
        fontSize: '11px',
    },
    title:{
        textTransform: 'uppercase',
        marginTop: '10px',
        fontWeight: 'extrabold',
        fontSize: '14px'
    }
})

// @ts-ignore
export default function PDF({data}){
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
                <View style={{textAlign: 'center', width: '100%'}}>
                    <Image src={Logo.src}  style={styles.imgContainer} />.
                    <Text style={styles.title}>
                        Parte diario - Población penal
                    </Text>
                </View>
                <View style={{marginTop: '40px', marginLeft: 10, marginRight: 10}}>

                    <Text style={styles.paragraph}>
                        Establecimiento:
                    </Text>
                    <Text style={{fontWeight: 'bold', fontSize: '11px'}}>
                        {state.establecimiento}
                    </Text>


                    <Text style={[styles.paragraph, {marginTop: '10px'}]}>
                        Fecha:
                    </Text>
                    <Text style={{fontWeight: 'bold', fontSize: '11px'}}>
                        {state.fecha}
                    </Text>

                </View>



                { state.datos ? <TableHeaderPDF datos={state.datos}/>
                    : '' }

                {/*<View style={{textAlign: 'center'}}>
                    <Text render={({pageNumber, totalPages})=> `${pageNumber}/${totalPages}`} />
                </View>*/}
            </Page>
        </Document>
    )
}