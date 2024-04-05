
import * as React from 'react'
import {
    Document,
    Text,
    Page,
    StyleSheet,
    Image,
    View
} from '@react-pdf/renderer'

const borderColor = '#f4f6f8'
const tableColor = '#d5d6d6'

const styles =  StyleSheet.create({
    section:{
        display: "flex",
        flexDirection: "row",
        margin: 10,
        felxGrow: 1

    },
    tableHeaderContainer:{
        width: '100%',
        fontSize: '14px',
        flexDirection: 'row',
        borderBottomColor: '#f4f6f8',
        backgroundColor: '#f4f6f8',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontStyle: 'bold',
        flexGrow: 1,
    },
    description:{
        width: '80%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingLeft: 10
    },
    poblacion:{
        width: '20%',
        textAlign: 'right',
        paddingRight: 8,
        paddingLeft: 10
    },
    rowData: {
        flexDirection: 'row',
        borderBottomColor: '#f4f6f8',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontStyle: 'bold',
        fontSize: '11px'
    },
    descriptionData: {
        width: '80%',
        textAlign: 'left',
        borderRightColor: tableColor,
        borderRightWidth: 1,
        paddingLeft: 8,
    },
    qtyData: {
        width: '20%',
        borderRightColor: tableColor,
        textAlign: 'right',
        paddingRight: 8,
    },
    tableSection:{
        width: '100%',
        fontSize: '11px',
        display: "flex",
        flexDirection: "row",
    },
    tableBox:{
        border: `1px solid ${tableColor}`,
        padding: '8px 4px',
    },
    tableBoxHeader:{
        borderRight: '0',
        backgroundColor: tableColor,
    }
})


// @ts-ignore
export default function TableHeaderPDF({datos}){
    console.log(datos)

    return(
        <>
            <View style={{margin:'auto', marginTop: '40px', width: '80%'}}>
                {/* Cantidad general */}
                {/*<View style={styles.tableSection}>
                    <View style={[styles.tableBox, styles.tableBoxHeader, {width: '80%'}]}><Text>Capacidad total:</Text></View>
                    <View style={[styles.tableBox, {textAlign: 'right', width: '20%'}]}><Text>{datos.capacidad}</Text></View>
                </View>*/}
                <View style={[styles.tableSection, {marginTop: '30px'}]}>
                    <View style={[styles.tableBox, styles.tableBoxHeader, {width: '80%'}]}><Text>Poblacion total:</Text></View>
                    <View style={[styles.tableBox, {textAlign: 'right', width: '20%'}]}><Text>{datos.poblacion}</Text></View>
                </View>

                {/* Situacion Penal*/}
                <View style={[styles.tableSection, {marginTop: '30px'}]}>
                    <View style={[styles.tableBox, styles.tableBoxHeader, {width: '80%', borderBottom: '0'}]}><Text>Situacion penal</Text></View>
                    <View style={[styles.tableBox, styles.tableBoxHeader,  {textAlign: 'right', width: '20%'}]}><Text>Total</Text></View>
                </View>
                <View style={styles.rowData}>
                    <View style={[styles.descriptionData, {width: '80%'}]}><Text>Procesados</Text></View>
                    <View style={styles.qtyData}><Text>{datos.procesados}</Text></View>
                </View>
                <View style={styles.rowData}>
                    <View style={[styles.descriptionData, {width: '80%'}]}><Text>Condenados</Text></View>
                    <View style={styles.qtyData}><Text>{datos.condenados}</Text></View>
                </View>


                {/* Table Header */}
                <View style={[styles.tableSection, { marginTop: '30px', borderBottom: '0'}]} >
                    <View style={[styles.tableBox, styles.tableBoxHeader, {width: '70%'}]}><Text>Otros</Text></View>
                    <View style={[styles.tableBox, styles.tableBoxHeader,  {textAlign: 'right', width: '30%'}]}><Text>Total</Text></View>
                </View>
                {/* Table Body*/}
                {/*{Object.keys(datos).map((key) => (
                    <View style={styles.rowData}  key={key}>
                        <Text style={[styles.descriptionData, {textTransform: 'capitalize'}]}>
                            {key}:
                        </Text>
                        <Text style={styles.qtyData}>
                            {datos[key]}
                        </Text>
                    </View>
                ))}*/}
                <View style={styles.rowData}>
                    <Text style={[styles.descriptionData, {textTransform: 'capitalize'}]}>
                        Padecen problemas mentales:
                    </Text>
                    <Text style={styles.qtyData}>
                        {datos.salud_mental}
                    </Text>
                </View>


                <View style={styles.rowData}>
                    <Text style={[styles.descriptionData, {textTransform: 'capitalize'}]}>
                        Con dificultades idiomaticas:
                    </Text>
                    <Text style={styles.qtyData}>
                        {datos.limitaciones_idiomaticas}
                    </Text>
                </View>


                <View style={styles.rowData}>
                    <Text style={[styles.descriptionData, {textTransform: 'capitalize'}]}>
                        Pertenece a la comunidad LGBTI:
                    </Text>
                    <Text style={styles.qtyData}>
                        {datos.comunidad}
                    </Text>
                </View>

                <View style={styles.rowData}>
                    <Text style={[styles.descriptionData, {textTransform: 'capitalize'}]}>
                        Con VIH:
                    </Text>
                    <Text style={styles.qtyData}>
                        {datos.vih}
                    </Text>
                </View>
            </View>
        </>


    )
}