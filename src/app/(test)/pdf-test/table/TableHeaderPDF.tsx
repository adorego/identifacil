
import * as React from 'react'
import {
    Document,
    Text,
    Page,
    StyleSheet,
    Image,
    View
} from '@react-pdf/renderer'

const borderColor = '#90e5fc'
const borderColor2 = '#90e5fc'

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
        borderBottomColor: '#bff0fd',
        backgroundColor: '#bff0fd',
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
        borderBottomColor: '#bff0fd',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontStyle: 'bold',
        fontSize: '11px'
    },
    descriptionData: {
        width: '80%',
        textAlign: 'left',
        borderRightColor: borderColor2,
        borderRightWidth: 1,
        paddingLeft: 8,
    },
    qtyData: {
        width: '20%',
        borderRightColor: borderColor2,
        textAlign: 'right',
        paddingRight: 8,
    },
})


// @ts-ignore
export default function TableHeaderPDF({datos}){

    return(
        <View style={{margin:10, marginTop: '40px'}}>
            {/* Table Header */}
            <View style={styles.tableHeaderContainer}>
                <Text style={styles.description}>
                    Descripcion
                </Text>
                <Text style={styles.poblacion}>
                    Población
                </Text>
            </View>
            {/* Table Body*/}
            {Object.keys(datos).map((key) => (
                <View style={styles.rowData}  key={key}>
                    <Text style={[styles.descriptionData, {textTransform: 'capitalize'}]}>
                        {key}:
                    </Text>
                    <Text style={styles.qtyData}>
                        {datos[key]}
                    </Text>
                </View>
            ))}
        </View>

    )
}