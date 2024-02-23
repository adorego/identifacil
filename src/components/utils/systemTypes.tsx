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
    temperatura: string | null;
    temperatura_modificado: boolean | null;
    peso: string | null;
    peso_modificado: boolean | null;
    talla: string | null;
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
    grupo_sanguineo: {id: null, nombre: null},
    grupo_sanguineo_modificado: false,
    vacunas_recibidas: [],
    vacunas_recibidas_modificado: false,
    presion_arterial: null,
    presion_arterial_modificado: false,
    frecuencia_cardiaca: null,
    frecuencia_cardiaca_modificado: false,
    frecuencia_respiratoria: null,
    frecuencia_respiratoria_modificado: false,
    temperatura: null,
    temperatura_modificado: false,
    peso: null,
    peso_modificado: false,
    talla: null,
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
    discapacidad_fisica: "fisica" | "motora" | "ninguna" | "intelectual" | "visual" | "auditivas" | "otros";
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
    nivelAcademico: string;
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
    nivelAcademico: "",
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
export interface    datosConcubino {
    id: number | null;
    numeroDeIdentificacion: string| null;
    nombres: string| null;
    apellidos: string| null;

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
    concubino: {
        id: null,
        nombres: null,
        apellidos:null,
        numeroDeIdentificacion: null
    },
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

export type datosJudicialesType = {
    id_persona:number | null;
    numeroDeIdentificacion:string;
    situacionJudicial: string;
    situacionJudicial_modificado:boolean;
    primeraVezEnPrision: boolean;
    primeraVezEnPrision_modificado:boolean;
    cantidadDeIngresos: number;
    cantidadDeIngresos_modificado:boolean;
    causa: string;
    causa_modificado:boolean;
    oficio: string;
    oficio_modificado:boolean;
    ultimoTrabajo: string;
    ultimoTrabajo_modificado:boolean;
    oficioJudicial: oficio_tipo;
    oficioJudicial_modificado:boolean;
    resolucion: resolucion_tipo;
    resolucion_modificado:boolean;
    expediente: expediente_tipo;
    expediente_modificado:boolean;
    caratula: string;
    caratula_modificado:boolean;
    hechoPunible: string;
    hechoPunible_modificado:boolean;
    sentenciaDefinitiva?: string;
    sentenciaDefinitiva_modificado:boolean;
}

export const datosJudicialesInicial:datosJudicialesType = {
    id_persona:null,
    numeroDeIdentificacion:"",
    situacionJudicial: "",
    situacionJudicial_modificado:false,
    primeraVezEnPrision: false,
    primeraVezEnPrision_modificado:false,
    cantidadDeIngresos: 0,
    cantidadDeIngresos_modificado:false,
    causa:"",
    causa_modificado:false,
    oficio: "",
    oficio_modificado:false,
    ultimoTrabajo: "",
    ultimoTrabajo_modificado:false,
    oficioJudicial: {
        numeroDeDocumento:"",
        fechaDeDocumento:null,
        documento:null,
    },
    oficioJudicial_modificado:false,
    resolucion: {
        numeroDeDocumento:"",
        fechaDeDocumento:null,
        documento:null
    },
    resolucion_modificado:false,
    expediente: {
        numeroDeDocumento:"",
        fechaDeDocumento:null
    },
    expediente_modificado:false,
    caratula: "",
    caratula_modificado:false,
    hechoPunible: "",
    hechoPunible_modificado:false,
    sentenciaDefinitiva: "",
    sentenciaDefinitiva_modificado:false,
}

export type circuloFamiliarStateType = {
    id: number | null;
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