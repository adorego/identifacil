
let i = 0;
export const dataBajas = ()=>{
    i = 0;
    return({
        header:[
            { id: 'id', label: 'ID' },
            { id: 'nroDocumento', label: 'Nro. OJ' },
            { id: 'fechaTraslado', label: 'Fecha Traslado' },
            { id: 'destino', label: 'Destino' },
        ],
        data:[
            {id: i++,  nroDocumento: '12201/2023', fechaTraslado: '01/01/2023', destino: 'tacumbu', url: '/movimientos/extradiciones'},
            {id: i++,  nroDocumento: '12202/2023', fechaTraslado: '01/01/2023', destino: 'tacumbu', url: '/movimientos/extradiciones'},
            {id: i++,  nroDocumento: '12203/2023', fechaTraslado: '01/01/2023', destino: 'tacumbu', url: '/movimientos/extradiciones'},
            {id: i++,  nroDocumento: '12204/2023', fechaTraslado: '01/01/2023', destino: 'tacumbu', url: '/movimientos/extradiciones'},
            {id: i++,  nroDocumento: '12205/2023', fechaTraslado: '01/01/2023', destino: 'tacumbu', url: '/movimientos/extradiciones'},
            {id: i++,  nroDocumento: '12206/2023', fechaTraslado: '01/01/2023', destino: 'tacumbu', url: '/movimientos/extradiciones'},
            {id: i++,  nroDocumento: '12207/2023', fechaTraslado: '01/01/2023', destino: 'tacumbu', url: '/movimientos/extradiciones'},
            {id: i++,  nroDocumento: '12208/2023', fechaTraslado: '01/01/2023', destino: 'tacumbu', url: '/movimientos/extradiciones'},
            {id: i++,  nroDocumento: '12209/2023', fechaTraslado: '01/01/2023', destino: 'tacumbu', url: '/movimientos/extradiciones'},
            {id: i++,  nroDocumento: '12210/2023', fechaTraslado: '01/01/2023', destino: 'tacumbu', url: '/movimientos/extradiciones'},
            {id: i++,  nroDocumento: '12211/2023', fechaTraslado: '01/01/2023', destino: 'tacumbu', url: '/movimientos/extradiciones'},
        ]
    })
}

export const dataSalidasEspeciales = ()=>{
    i = 0;
    return({
        header:[
            { id: 'id', label: 'ID' },
            { id: 'tipoSalida', label: 'Tipo de salida' },
            { id: 'momentoSalida', label: 'Fecha y hora de salida' },
            { id: 'momentoEntrada', label: 'Fecha Traslado' },
            { id: 'destino', label: 'Destino' },
        ],
        data:[
            {id: i++, tipoSalida: 'Salida Familiar', momentoSalida: '01/01/2023 09:00 am', momentoEntrada: '01/01/2023 09:00 am', destino: 'Tacumbu', url: '/movimientos/salidaTransitoria'},
            {id: i++, tipoSalida: 'Salida Familiar', momentoSalida: '01/01/2023 09:00 am', momentoEntrada: '01/01/2023 09:00 am', destino: 'Tacumbu', url: '/movimientos/salidaTransitoria'},
            {id: i++, tipoSalida: 'Salida Familiar', momentoSalida: '01/01/2023 09:00 am', momentoEntrada: '01/01/2023 09:00 am', destino: 'Tacumbu', url: '/movimientos/salidaTransitoria'},
            {id: i++, tipoSalida: 'Salida Familiar', momentoSalida: '01/01/2023 09:00 am', momentoEntrada: '01/01/2023 09:00 am', destino: 'Tacumbu', url: '/movimientos/salidaTransitoria'},
            {id: i++, tipoSalida: 'Salida Familiar', momentoSalida: '01/01/2023 09:00 am', momentoEntrada: '01/01/2023 09:00 am', destino: 'Tacumbu', url: '/movimientos/salidaTransitoria'},
            {id: i++, tipoSalida: 'Salida Familiar', momentoSalida: '01/01/2023 09:00 amIntima', momentoEntrada: '01/01/2023 09:00 am', destino: 'Tacumbu', url: '/movimientos/salidaTransitoria'},
            {id: i++, tipoSalida: 'Salida Familiar', momentoSalida: '01/01/2023 09:00 amIntima', momentoEntrada: '01/01/2023 09:00 am', destino: 'Tacumbu', url: '/movimientos/salidaTransitoria'},
            {id: i++, tipoSalida: 'Salida Familiar', momentoSalida: '01/01/2023 09:00 amIntima', momentoEntrada: '01/01/2023 09:00 am', destino: 'Tacumbu', url: '/movimientos/salidaTransitoria'},
            {id: i++, tipoSalida: 'Salida Familiar', momentoSalida: '01/01/2023 09:00 am', momentoEntrada: '01/01/2023 09:00 am', destino: 'Tacumbu', url: '/movimientos/salidaTransitoria'},
            {id: i++, tipoSalida: 'Salida Familiar', momentoSalida: '01/01/2023 09:00 am', momentoEntrada: '01/01/2023 09:00 am', destino: 'Tacumbu', url: '/movimientos/salidaTransitoria'},
            {id: i++, tipoSalida: 'Salida Familiar', momentoSalida: '01/01/2023 09:00 am', momentoEntrada: '01/01/2023 09:00 am', destino: 'Tacumbu', url: '/movimientos/salidaTransitoria'},
        ]
    })
}


export const dataTraslados = ()=>{
    i = 0;
    return({
        header:[
            { id: 'id', label: 'ID' },
            { id: 'documento', label: 'Nro. documento' },
            { id: 'tipoTraslado', label: 'Tipo traslado' },
            { id: 'fechaTraslado', label: 'Fecha Traslado' },
            { id: 'destino', label: 'Destino' },
        ],
        data:[
            {id: i++, documento: '123456/1231', tipoTraslado: 'Acercamiento', fechaTraslado: '01/01/2023', destino: 'Tacumbu', url: '/movimientos/traslados'},
            {id: i++, documento: '123456/1232', tipoTraslado: 'Expulsion', fechaTraslado: '01/01/2023', destino: 'Tacumbu', url: '/movimientos/traslados'},
            {id: i++, documento: '123456/1233', tipoTraslado: 'Expulsion', fechaTraslado: '01/01/2023', destino: 'Tacumbu', url: '/movimientos/traslados'},
            {id: i++, documento: '123456/1234', tipoTraslado: 'Extradicion', fechaTraslado: '01/01/2023', destino: 'Tacumbu', url: '/movimientos/traslados'},
            {id: i++, documento: '123456/1235', tipoTraslado: 'Extradicion', fechaTraslado: '01/01/2023', destino: 'Tacumbu', url: '/movimientos/traslados'},
            {id: i++, documento: '123456/1236', tipoTraslado: 'Visita Intima', fechaTraslado: '01/01/2023', destino: 'Tacumbu', url: '/movimientos/traslados'},
            {id: i++, documento: '123456/1237', tipoTraslado: 'Visita Intima', fechaTraslado: '01/01/2023', destino: 'Tacumbu', url: '/movimientos/traslados'},
            {id: i++, documento: '123456/1238', tipoTraslado: 'Visita Intima', fechaTraslado: '01/01/2023', destino: 'Tacumbu', url: '/movimientos/traslados'},
            {id: i++, documento: '123456/1239', tipoTraslado: 'Acercamiento', fechaTraslado: '01/01/2023', destino: 'Tacumbu', url: '/movimientos/traslados'},
            {id: i++, documento: '123456/12310', tipoTraslado: 'Acercamiento', fechaTraslado: '01/01/2023', destino: 'Tacumbu', url: '/movimientos/traslados'},
            {id: i++, documento: '123456/12311', tipoTraslado: 'Acercamiento', fechaTraslado: '01/01/2023', destino: 'Tacumbu', url: '/movimientos/traslados'},
        ]
    })
}

