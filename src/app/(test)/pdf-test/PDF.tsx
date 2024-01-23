import {
    Document,
    Text,
    Page,
    StyleSheet,
    Image,
    View
} from '@react-pdf/renderer'
import Logo from '@/common/images/logo-sippy.png'

const styles =  StyleSheet.create({
    page:{
        backgroundColor: "#f0f0f0",
        padding: 10
    },
    section:{
        display: "flex",
        flexDirection: "row",
        margin: 10,
        padding: 10,
        felxGrow: 1

    }
})

export default function PDF(){

    return(
        <Document>
            <Page style={styles.page}>
                <Text>
                    Hello world
                </Text>
                <View style={styles.section}>
                    <Text>
                       asdasdasdadsd
                    </Text>
                    <Text>
                        Lorem Impsum
                    </Text>
                </View>
                <View >
                    <Text render={({pageNumber, totalPages})=> `${pageNumber}/${totalPages}`} />
                </View>
            </Page>
        </Document>
    )
}