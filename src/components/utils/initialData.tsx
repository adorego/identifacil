import { IdentificationResponse } from "@/model/respuesta-identificacion";

export const initialDataForm = {
    id: 0,
    nroCausa: '',
    ano: '',
    fechaAprension: '',
    caratula: '',
    hechoPunible: '',
    situacionProcesal: '',
    condenado: '',
    tiempoDeCondenaAnos: 0,
    compurgamiento: '',
    tiempoDeCondenaMeses: 0,
    anosExtrasDeCondenaPorMedidaDeSeguridad: false,
    anosDeCondenaPorMedidasDeSeguridad: 0,
    mesesDeCondenaPorMedidasDeSeguridad: 0,
    sentenciaDefinitiva: '',
    sentenciaDescripcion: '',
    fechaCompurgamientoCalculada: '',
    circunscripcion: '',
    secretaria: '',
    fechaHecho: '',
    juzgadoDeEjecucionOSentencia: '',
    nombreDelFamiliar: '',
    telefonoDelFamiliar: '',
    lugarHecho: '',
    linkDeNoticia: '',
    defensor: '',
    nombreDelDefensor: '',
    telefonoDelDefensor: ''

};


export const initialResponse: IdentificationResponse = {
    numeroDeIdentificacion: "",
    nombres: "",
    apellidos: "",
    esPPL: false
}