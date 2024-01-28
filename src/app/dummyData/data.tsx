
let i = 0;
export const dummyData = ()=>{

  return({
      headersCustom:[
          { id: 'id', label: 'ID' },
          { id: 'lastName', label: 'Apellido' },
          { id: 'firstName', label: 'Nombre' },
          { id: 'age', label: 'Age' },
      ],
      rowsCustom:        [
          { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
          { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
          { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
          { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
          { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
          { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
          { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
          { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
          { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
      ]
  })

}

// Para Informes
export const rangoEtarioData = ()=>{

    return({
        header:[
            { id: 'id', label: 'ID' },
            { id: 'ciudad', label: 'Ciudad' },
            { id: 'cantidad', label: 'Cantidad' },
        ],
        data:        [
            { id: 1, ciudad: 'Asuncion', cantidad: '20'},
            { id: 2, ciudad: 'Ciudad del Este', cantidad: '15'},
            { id: 3, ciudad: 'Encarnacion', cantidad: '12'},
            { id: 4, ciudad: 'Itagua', cantidad: '5'},

        ]
    })

}

export const masEstaditicasData = ()=>{

    return({
        header:[
            { id: 'id', label: 'ID' },
            { id: 'tipoDato', label: 'Tipo de dato' },
            { id: 'cantidad', label: 'Cantidad' },
        ],
        data:        [
            { id: 1, tipoDato: 'Personas que son cabeza de familia', cantidad: '20'},
            { id: 2, tipoDato: 'Cuentan con hijos menores de edad', cantidad: '15'},
            { id: 3, tipoDato: 'Reclusos con defensor', cantidad: '12'},
            { id: 4, tipoDato: 'Reclusos sin defensor', cantidad: '5'},

        ]
    })

}


export const lugarNacimientoExtended = ()=>{

    return({
        header:[
            { id: 'id', label: 'ID' },
            { id: 'ciudad', label: 'Ciudad' },
            { id: 'cantidad', label: 'Cantidad' },
        ],
        data:        [
            { id: i++, ciudad: 'Ciudad del Este', cantidad: '20'},
            { id: i++, ciudad: 'Asuncion', cantidad: '20'},
            { id: i++, ciudad: 'Encarnacion', cantidad: '20'},
            { id: i++, ciudad: 'Minga Guazu', cantidad: '20'},
            { id: i++, ciudad: 'San Lorenzo', cantidad: '20'},
            { id: i++, ciudad: 'Ciudad del Este', cantidad: '20'},
            { id: i++, ciudad: 'Asuncion', cantidad: '20'},
            { id: i++, ciudad: 'Encarnacion', cantidad: '20'},
            { id: i++, ciudad: 'Minga Guazu', cantidad: '20'},
            { id: i++, ciudad: 'San Lorenzo', cantidad: '20'},
            { id: i++, ciudad: 'Ciudad del Este', cantidad: '20'},
            { id: i++, ciudad: 'Asuncion', cantidad: '20'},
            { id: i++, ciudad: 'Encarnacion', cantidad: '20'},
            { id: i++, ciudad: 'Minga Guazu', cantidad: '20'},
            { id: i++, ciudad: 'San Lorenzo', cantidad: '20'},

        ]
    })

}

export const reclsusosData = ()=>{

    return({
        headersCustom:[
            { id: 'id', label: 'ID' },
            { id: 'nombre', label: 'Nombre y Apellido' },
            { id: 'alias', label: 'Alias' },
            { id: 'cantidad', label: 'Catnidad' },
        ],
        rowsCustom:        [
            { id: 1, nombre: 'Juan jose Perez', alias: 'N/D',  cantidad: 35 },
            { id: 2, nombre: 'Roberto Gonzalez', alias: 'N/D',  cantidad: 42 },
            { id: 3, nombre: 'Marcelo Peralta', alias: 'N/D',  cantidad: 45 },
            { id: 4, nombre: 'Fernando Rojas', alias: 'N/D',  cantidad: 16 },
            { id: 5, nombre: 'Daniel Martinez', alias: 'N/D',  cantidad: 14 },
            { id: 6, nombre: 'Mariano Moreno', alias: 'N/D',  cantidad: 150 },
            { id: 7, nombre: 'Patricio Portillo', alias: 'N/D',  cantidad: 44 },
            { id: 8, nombre: 'Carlos Cardozo', alias: 'N/D',  cantidad: 36 },
            { id: 9, nombre: 'Javier Jimenez', alias: 'N/D',  cantidad: 65 },
        ]
    })
}


export const motivosTrasladosData = ()=>{

    return({
        header:[
            { id: 'id', label: 'ID' },
            { id: 'tipos', label: 'Tipos de motivo' },
            { id: 'cantidad', label: 'Cantidad' },
        ],
        data:        [
            { id: i++, tipos: 'Acercamiento',  cantidad: 35 },
            { id: i++, tipos: 'Orden Judicial',  cantidad: 42 },
            { id: i++, tipos: 'Medidas cautelarias',  cantidad: 45 },
            { id: i++, tipos: 'Visitas Familiares',  cantidad: 16 },
            { id: i++, tipos: 'Acercamiento',  cantidad: 35 },
            { id: i++, tipos: 'Orden Judicial',  cantidad: 42 },
            { id: i++, tipos: 'Medidas cautelarias',  cantidad: 45 },
            { id: i++, tipos: 'Visitas Familiares',  cantidad: 16 },
            { id: i++, tipos: 'Acercamiento',  cantidad: 35 },
            { id: i++, tipos: 'Orden Judicial',  cantidad: 42 },
            { id: i++, tipos: 'Medidas cautelarias',  cantidad: 45 },
            { id: i++, tipos: 'Visitas Familiares',  cantidad: 16 },

        ]
    })
}


export const rangoTiempoData = ()=>{

    return({
        header:[
            { id: 'id', label: 'ID' },
            { id: 'causa', label: 'Por causa' },
            { id: 'cantidad', label: 'Cantidad' },
        ],
        data:        [
            { id: i++, causa: 'Hace 3 meses',  cantidad: 255 },
            { id: i++, causa: 'Hace 6 meses',  cantidad: 950 },
            { id: i++, causa: 'Hace un año',  cantidad: 2500 },
            { id: i++, causa: 'Hades dos años o mas',  cantidad: 5000 },

        ]
    })
}


export const destinosTrasladosData = ()=>{

    return({
        header:[
            { id: 'id', label: 'ID' },
            { id: 'ciudad', label: 'Por ciudad' },
            { id: 'cantidad', label: 'Cantidad' },
        ],
        data:        [
            { id: i++, ciudad: 'Tacumbu',  cantidad: 255 },
            { id: i++, ciudad: 'Emboscadas',  cantidad: 950 },
            { id: i++, ciudad: 'Minga Guazu',  cantidad: 2500 },
            { id: i++, ciudad: 'Buen Pastor',  cantidad: 5000 },

        ]
    })
}


export const visitaData = ()=>{

    return({
        header:[
            { id: 'id', label: 'ID' },
            { id: 'detalle', label: 'Detalle' },
            { id: 'cantidad', label: 'Cantidad' },
        ],
        data:        [
            { id: i++, detalle: 'A',  cantidad: 255 },
            { id: i++, detalle: 'B',  cantidad: 950 },
            { id: i++, detalle: 'C',  cantidad: 2500 },
            { id: i++, detalle: 'D',  cantidad: 5000 },
            { id: i++, detalle: 'F',  cantidad: 5000 },
            { id: i++, detalle: 'G',  cantidad: 5000 },
            { id: i++, detalle: 'H',  cantidad: 5000 },
            { id: i++, detalle: 'I',  cantidad: 5000 },
            { id: i++, detalle: 'J',  cantidad: 5000 },
            { id: i++, detalle: 'K',  cantidad: 5000 },
            { id: i++, detalle: 'L',  cantidad: 5000 },

        ]
    })
}


export const proximaAudienciaData = ()=>{

    return({
        header:[
            { id: 'id', label: 'ID' },
            { id: 'descripcion', label: 'Detalle' },
        ],
        data: [
            { id: 1, descripcion: 'Autorizacion de PPL para poder salir a trabajar' },
            { id: 2, descripcion: 'Autorizacion de PPL para poder salir a trabajar' },
            { id: 3, descripcion: 'Autorizacion de PPL para poder salir a trabajar' },
            { id: 4, descripcion: 'Autorizacion de PPL para poder salir a trabajar' },

        ]
    })
}
