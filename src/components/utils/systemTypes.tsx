import {Dayjs} from "dayjs";

export type datosDeSalud2Type =  {
    id: number | null;
    id_persona: number | null;
    tieneAfeccionADrogras: boolean | null;
    tieneAfeccionADrogas_modificado: boolean | null;
    grupo_sanguineo: {id: number | null, nombre: string |null};
    grupo_sanguineo_modificado: boolean | null;
    vacunas_recibidas:  Array<{ id: number; nombre: string }>;
    vacunas_recibidas_modificado: boolean | null;
    presion_arterial: string | null;
    presion_arterial_modificado: boolean | null;
    frecuencia_cardiaca: null;
    frecuencia_cardiaca_modificado: boolean | null;
    frecuencia_respiratoria: string | null;
    frecuencia_respiratoria_modificado: boolean | null;
    temperatura: string;
    temperatura_modificado: boolean | null;
    peso: string;
    peso_modificado: boolean | null;
    talla: string;
    talla_modificado: boolean | null;
    imc: string | null;
    imc_modificado: boolean | null;
    vdrl: boolean | null;
    vdrl_modificado: boolean | null;
    vih: boolean | null;
    vih_modificado: boolean | null;
    tb: boolean | null;
    tb_modificado: boolean | null;
    gestacion: boolean | null;
    gestacion_modificado: boolean | null;
    tiempo_gestacion: number | null;
    tiempo_gestacion_modificado: boolean | null;
    fecha_parto: Dayjs | string | null;
    fecha_parto_modificado: boolean;
    saludMental: saludMentalType;
    saludFisica: saludFisicaType;
    limitacionesIdiomaticas: limitacionesIdiomaticasType;
}

export const datosDeSalud2Initial: datosDeSalud2Type =  {
    id: null,
    id_persona: null,
    tieneAfeccionADrogras: false,
    tieneAfeccionADrogas_modificado: false,
    grupo_sanguineo: {id: 0, nombre: null},
    grupo_sanguineo_modificado: false,
    vacunas_recibidas: [],
    vacunas_recibidas_modificado: false,
    presion_arterial: null,
    presion_arterial_modificado: false,
    frecuencia_cardiaca: null,
    frecuencia_cardiaca_modificado: false,
    frecuencia_respiratoria: null,
    frecuencia_respiratoria_modificado: false,
    temperatura: '0',
    temperatura_modificado: false,
    peso: '0',
    peso_modificado: false,
    talla: '0',
    talla_modificado: false,
    imc: null,
    imc_modificado: false,
    vdrl: false,
    vdrl_modificado: false,
    vih: false,
    vih_modificado: false,
    tb: false,
    tb_modificado: false,
    gestacion: false,
    gestacion_modificado: false,
    tiempo_gestacion: null,
    tiempo_gestacion_modificado: false,
    fecha_parto: null,
    fecha_parto_modificado: false,
    saludMental: {
        id: null,
        sigue_tratamiento_mental: false,
        sigue_tratamiento_mental_modificado: false,
        tiene_antecedentes_de_lesiones_autoinflingidas: false,
        tiene_antecedentes_de_lesiones_autoinflingidas_modificado: false,
        ha_estado_internado_en_hospital_psiquiatrico: false,
        ha_estado_internado_en_hospital_psiquiatrico_modificado: false,
        reporta_abuso_de_droga_previo_al_ingreso: false,
        reporta_abuso_de_droga_previo_al_ingreso_modificado: false,
        medicacion_actual: [],
        medicacion_actual_modificado: false,
        tiene_afeccion_severa_por_estupefacientes: false,
        tiene_afeccion_severa_por_estupefacientes_modificado: false
    },
    saludFisica: {
        id: null,
        discapacidad_fisica: 'ninguna',
        discapacidad_fisica_modificado: true,
        explicacion_de_discapacidad: null,
        explicacion_de_discapacidad_modificado: false,
    },
    limitacionesIdiomaticas: {
        id: null,
        necesitaInterprete: false,
        necesitaInterprete_modificado: false,
        tieneDificultadParaLeerYEscribir: false,
        tieneDificultadParaLeerYEscribir_modificado: false
    }
}

export type saludMentalType = {
    id: number | null;
    sigue_tratamiento_mental: boolean | null;
    sigue_tratamiento_mental_modificado: boolean | null;
    tiene_antecedentes_de_lesiones_autoinflingidas: boolean | null;
    tiene_antecedentes_de_lesiones_autoinflingidas_modificado: boolean | null;
    ha_estado_internado_en_hospital_psiquiatrico: boolean | null;
    ha_estado_internado_en_hospital_psiquiatrico_modificado: boolean | null;
    reporta_abuso_de_droga_previo_al_ingreso: boolean | null;
    reporta_abuso_de_droga_previo_al_ingreso_modificado: boolean | null;
    medicacion_actual: [];
    medicacion_actual_modificado: boolean | null;
    tiene_afeccion_severa_por_estupefacientes: boolean | null;
    tiene_afeccion_severa_por_estupefacientes_modificado: boolean | null;
};

export type saludFisicaType = {
    id: number | null;
    discapacidad_fisica: "fisica" | "motora" | "ninguna" | "intelectual" | "visual" | "auditivas" | "otros" | string;
    discapacidad_fisica_modificado: boolean;
    explicacion_de_discapacidad: string | null;
    explicacion_de_discapacidad_modificado: boolean;
};

export type limitacionesIdiomaticasType = {
    id: number | null;
    necesitaInterprete: boolean | null
    necesitaInterprete_modificado: boolean | null
    tieneDificultadParaLeerYEscribir: boolean | null;
    tieneDificultadParaLeerYEscribir_modificado: boolean | null
};




export type datosSeguridadType = {
    id: number | null;
    id_persona:number|null;
    riesgoParaPersonal: boolean;
    riesgoParaPersonal_modificado: boolean;
    riesgoParaPersonalRespuesta: string;
    riesgoParaPersonalRespuesta_modificado: boolean;
    riesgoParaReclusos: boolean;
    riesgoParaReclusos_modificado: boolean;
    riesgoParaReclusosRespuesta: string;
    riesgoParaReclusosRespuesta_modificado: boolean;
    riesgoDeSufrirLesionPorOtrosReclusos: boolean;
    riesgoDeSufrirLesionPorOtrosReclusos_modificado: boolean;
    riesgoDeSufrirLesionPorOtrosReclusosRespuesta: string;
    riesgoDeDanharLaPropiedad: boolean;
    riesgoDeDanharLaPropiedad_modificado: boolean;
    riesgoDeDanharLaPropiedadRespuesta: string;
    miembroDeGrupoQueConstituyeAmenazaParaSeguridad: boolean;
    miembroDeGrupoQueConstituyeAmenazaParaSeguridad_modificado: boolean;
    miembroDeGrupoQueConstituyeAmenazaParaSeguridadRespuesta: string;
    tieneEntrenamientoMilitarPrevio: boolean;
    tieneEntrenamientoMilitarPrevio_modificado: boolean;
    tieneEntrenamientoMilitarPrevioRespuesta: string;
    eraFuncionarioPublico: boolean;
    eraFuncionarioPublico_modificado: boolean;
    eraFuncionarioPublicoRespuesta: string;
}


export const datosSeguridadInicial: datosSeguridadType = {
    id: null,
    id_persona:null,
    riesgoParaPersonal: false,
    riesgoParaPersonal_modificado: false,
    riesgoParaPersonalRespuesta: "",
    riesgoParaPersonalRespuesta_modificado: false,
    riesgoParaReclusos: false,
    riesgoParaReclusos_modificado: false,
    riesgoParaReclusosRespuesta: "",
    riesgoParaReclusosRespuesta_modificado: false,
    riesgoDeSufrirLesionPorOtrosReclusos: false,
    riesgoDeSufrirLesionPorOtrosReclusos_modificado: false,
    riesgoDeSufrirLesionPorOtrosReclusosRespuesta: "",
    riesgoDeDanharLaPropiedad: false,
    riesgoDeDanharLaPropiedad_modificado: false,
    riesgoDeDanharLaPropiedadRespuesta: "",
    miembroDeGrupoQueConstituyeAmenazaParaSeguridad: false,
    miembroDeGrupoQueConstituyeAmenazaParaSeguridad_modificado: false,
    miembroDeGrupoQueConstituyeAmenazaParaSeguridadRespuesta: "",
    tieneEntrenamientoMilitarPrevio: false,
    tieneEntrenamientoMilitarPrevio_modificado: false,
    tieneEntrenamientoMilitarPrevioRespuesta: "",
    eraFuncionarioPublico: false,
    eraFuncionarioPublico_modificado: false,
    eraFuncionarioPublicoRespuesta: "",
}

export type datosEducacionType = {
    id: number | null;
    id_persona: number|null;
    nivelAcademico: "ninguna" | "primaria" | "secundaria" | "terciaria" ;
    nivelAcademico_modificado: boolean;
    institucionEducativa: string;
    institucionEducativa_modificado: boolean;
    tieneOficio: boolean;
    tieneOficio_modificado: boolean;
    nombreOficio: string;
    nombreOficio_modificado: boolean;
    ultimoTrabajo: string;
    ultimoTrabajo_modificado: boolean;
}

export const datosEducacionInicial : datosEducacionType = {
    id: null,
    id_persona: null,
    nivelAcademico: "primaria",
    nivelAcademico_modificado: false,
    institucionEducativa: "",
    institucionEducativa_modificado: false,
    tieneOficio: false,
    tieneOficio_modificado: false,
    nombreOficio: "",
    nombreOficio_modificado: false,
    ultimoTrabajo: "",
    ultimoTrabajo_modificado: false
}


export type familiar = {
    nombre: string;
    apellido: string;
    vinculo: string;
    lugar: string;

}
export const familiarInicial: familiar = {
    nombre: "",
    apellido: "",
    vinculo: "",
    lugar: ""
}
export interface datosConcubino {
    id: number | null;
    nombres: string| null;
    apellidos: string| null;
    numeroDeIdentificacion: string| null;

}

export const datosConcubinoInicial = {
    id: null,
    numeroDeIdentificacion: "",
    nombres: "",
    apellidos: ""
}

export type datosFamiliaresType = {
    id: number | null;
    id_persona: number|null;
    esCabezaDeFamilia: boolean;
    esCabezaDeFamilia_modificado: boolean;
    tieneCirculoFamiliar: boolean;
    tieneCirculoFamiliar_modificado: boolean;
    familiares: Array<familiar> | null;
    familiares_modificado: boolean;
    tieneConcubino: boolean;
    tieneConcubino_modificado: boolean;
    concubino: datosConcubino | null;
    concubino_modificado: boolean;
}

export const datosFamiliaresInicial : datosFamiliaresType = {
    id: null,
    id_persona: null,
    esCabezaDeFamilia: false,
    esCabezaDeFamilia_modificado: false,
    tieneCirculoFamiliar: false,
    tieneCirculoFamiliar_modificado: false,
    familiares: [],
    familiares_modificado: false,
    tieneConcubino: false,
    tieneConcubino_modificado: false,
    concubino: null,
    concubino_modificado: false,
}

interface oficio_tipo{
    numeroDeDocumento:string;
    fechaDeDocumento:Dayjs | null;
    documento:File | null;

}

interface resolucion_tipo{
    numeroDeDocumento:string;
    fechaDeDocumento:Dayjs | null;
    documento:File | null;
}

interface expediente_tipo{
    numeroDeDocumento:string;
    fechaDeDocumento:Dayjs | null;
}

export type datosIncialesJudiciales = {
    expediente_obj?: Object;
    flag?: boolean;
    id?: number;
    primera_vez_en_prision?: boolean;
    cantidad_de_veces_que_ingreso?: number;
    ingresos_a_prision?: Array<{
        celda: string;
        pabellon: string;
        fecha_ingreso: string|Dayjs|null;
        establecimiento_penitenciario: {
            id:number
        };
        expedienteJudicial:{
            id:number;
            condenado: boolean;
        }
        documentos_que_ordenan_prision?: Array<{
            id:number;
            numero_documento:string;
            ruta:string;
            tipo:string;
        }>
    }> | undefined;
}

export type datosJudicialesType = {
    key?: string | number | object;
    id?: number;
    flag?: boolean;
    id_persona:number;
    establecimiento_penitenciario:number;
    primeraVezEnPrision:boolean;
    cantidadDeIngresos:number;
    fecha_ingreso_a_establecimiento:Dayjs | null;
    pabellon:string;
    celda:string;
    expediente_id:number;
    oficioJudicial_numeroDeDocumento:string;
    oficioJudicial_fechaDeDocumento:Dayjs | null;
    oficioJudicial_documento: File | null;
    resolucion_numeroDeDocumento:string;
    resolucion_fechaDeDocumento:Dayjs | null;
    resolucion_documento: File | null;
    ingresos_a_prision?: Array<{
        fecha_ingreso:Dayjs|string|null;
        expedienteJudicial:{
            condenado: boolean;
        }
    }>;
}

export const datosJudicialesInicial:datosJudicialesType = {
    flag: false,
    id_persona: 0,
    establecimiento_penitenciario: 0,
    primeraVezEnPrision: true,
    cantidadDeIngresos: 0,
    fecha_ingreso_a_establecimiento: null,
    pabellon: '',
    celda: '',
    expediente_id: 0,
    oficioJudicial_numeroDeDocumento: '',
    oficioJudicial_fechaDeDocumento: null,
    oficioJudicial_documento: null,
    resolucion_numeroDeDocumento: '',
    resolucion_fechaDeDocumento: null,
    resolucion_documento: null,
}

export type circuloFamiliarStateType = {
    id: number | null;
    indexArray?: number;
    nombre: string | null;
    apellido: string | null;
    esFuncionario: boolean | null;
    vinculo: {
        id: number | null;
        nombre: string | null;
    };
    edad: number | null ;
    establecimiento: {
        id: number | null;
        nombre: string | null;
    };
    lugar_donde_esta_hijo: string | null;
}
export const circuloFamiliarStateInitial = {
    id_persona: null,
    nombre: null,
    apellido: null,
    vinculo: {},
    establecimiento: {},
    edad: null,
    lugar_donde_esta_hijo: null
}

export type datosPersonalesType = {
    id: number | null;
    estadoCivil: {
        id: number | null;
    };
    lugarDeNacimiento: string;
    direccion: string;
    barrioCompania: string;
    nacionalidad: {
        id: number | null;
    };
    numeroDeContacto: string;
    contactoDeEmergencia1: string;
    contactoDeEmergencia2: string;
    pueblosIndigenas: boolean;
    nombreEtnia: string;
    perteneceAComunidadLGTBI: boolean;
}
export const datosPersonalesInitial : datosPersonalesType = {
    id: null,
    estadoCivil: {
        id: null,
    },
    lugarDeNacimiento: "",
    direccion: "",
    barrioCompania: "",
    nacionalidad: {
        id: null,
    },
    numeroDeContacto: "",
    contactoDeEmergencia1: "",
    contactoDeEmergencia2: "",
    pueblosIndigenas: false,
    nombreEtnia: "",
    perteneceAComunidadLGTBI: false,
}