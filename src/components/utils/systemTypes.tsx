import {Dayjs} from "dayjs";

export type datosDeSalud2Type =  {
    id: number | null;
    id_persona: number | null;
    tieneAfeccionADrogras: boolean | null;
    tieneAfeccionADrogas_modificado: false;
    grupo_sanguineo: null | null;
    grupo_sanguineo_modificado: boolean | null;
    vacunas_recibidas_modificada: boolean | null;
    presion_arterial: string | null;
    presion_arterial_modificada: boolean | null;
    frecuencia_cardiaca: null;
    frecuencia_cardiaca_modificada: boolean | null;
    frecuencia_respiratoria: string | null;
    frecuencia_respiratoria_modificada: boolean | null;
    temperatura: string | null;
    temperatura_modificada: boolean | null;
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
    fecha_parto: string | null;
    fecha_parto_modificada: boolean | null;
    saludMental: {
        id: number | null;
        sigue_tratamiento_salud_mental: null;
        sigue_tratamiento_mental_modificado: boolean | null;
        tiene_antecedentes_de_lesiones_autoinflingidas: boolean | null;
        tiene_antecedentes_de_lesiones_autoinflingidas_modificado: boolean | null;
        ha_estado_internado_en_hospital_psiquiatrico: boolean | null;
        ha_estado_internado_en_hospital_psiquiatrico_modificado: boolean | null;
        reporta_abuso_de_droga_previo_al_ingreso: boolean | null;
        reporta_abuso_de_droga_previo_al_ingreso_modificado: boolean | null;
        medicacion_actual: [string | null] | [];
        medicacion_actual_modificada: boolean | null;
        tiene_afeccion_severa_por_estupefacientes: false;
        tiene_afeccion_severa_por_estupefaciente_modificado: false
    } | null ;
    saludFisica: {
        id: number | null;
        discapacidad_fisica: string | null;
        discapacidad_modificada: boolean | null;
        explicacion_discapacidad_fisica: string | null;
    } | null;
    limitacionesIdiomaticas: {
        id: number | null;
        necesitaInterprete: boolean | null
        necesitaInterprete_modificado: boolean | null
        tieneDificultadParaLeerYEscribir: boolean | null;
        tieneDificultadParaLeerYEscribir_modificado: boolean | null
    } | null;
}

export const datosDeSalud2Initial =  {
    id: null,
    id_persona: null,
    tieneAfeccionADrogras: null,
    tieneAfeccionADrogas_modificado: null,
    grupo_sanguineo: null,
    grupo_sanguineo_modificado: null,
    vacunas_recibidas_modificada: null,
    presion_arterial: null,
    presion_arterial_modificada: null,
    frecuencia_cardiaca: null,
    frecuencia_cardiaca_modificada: null,
    frecuencia_respiratoria: null,
    frecuencia_respiratoria_modificada: null,
    temperatura: null,
    temperatura_modificada: null,
    peso: null,
    peso_modificado: null,
    talla: null,
    talla_modificado: null,
    imc: null,
    imc_modificado: null,
    vdrl: null,
    vdrl_modificado: null,
    vih: null,
    vih_modificado: null,
    tb: null,
    tb_modificado: null,
    gestacion: null,
    gestacion_modificado: null,
    tiempo_gestacion: null,
    tiempo_gestacion_modificado: null,
    fecha_parto: null,
    fecha_parto_modificada: null,
    saludMental: {
        id: null,
        sigue_tratamiento_salud_mental: null,
        sigue_tratamiento_mental_modificado: null,
        tiene_antecedentes_de_lesiones_autoinflingidas: null,
        tiene_antecedentes_de_lesiones_autoinflingidas_modificado: null,
        ha_estado_internado_en_hospital_psiquiatrico: null,
        ha_estado_internado_en_hospital_psiquiatrico_modificado: null,
        reporta_abuso_de_droga_previo_al_ingreso: null,
        reporta_abuso_de_droga_previo_al_ingreso_modificado: null,
        medicacion_actual: [],
        medicacion_actual_modificada: null,
        tiene_afeccion_severa_por_estupefacientes: null,
        tiene_afeccion_severa_por_estupefaciente_modificado: false
    },
    saludFisica: {
        id: null,
        discapacidad_fisica: null,
        discapacidad_modificada: null,
        explicacion_discapacidad_fisica: null,
    },
    limitacionesIdiomaticas: {
        id: null,
        necesitaInterprete: null,
        necesitaInterprete_modificado: null,
        tieneDificultadParaLeerYEscribir: null,
        tieneDificultadParaLeerYEscribir_modificado: null
    }
}


export type datosSaludType = {
    id_persona:number | null;
    tieneAfeccionADrogas_modificado: boolean;
    tieneAfeccionADrogras: boolean;
    grupo_sanguineo: number;
    grupo_sanguineo_modificado: boolean;
    vacunas_recibidas: Array<{
        id: number,
        label: string
    }>;
    vacunas_recibidas_modificada: boolean;
    presion_arterial: number;
    presion_arterial_modificada: boolean;
    frecuencia_cardiaca: number;
    frecuencia_cardiaca_modificada: boolean;
    frecuencia_respiratoria: number;
    frecuencia_respiratoria_modificada: boolean;
    temperatura: number;
    temperatura_modificada: boolean;
    peso: number;
    peso_modificado: boolean;
    talla: number;
    talla_modificado: boolean;
    imc: number;
    imc_modificado: boolean;
    vdrl: boolean;
    vdrl_modificado: boolean;
    vih: boolean;
    vih_modificado: boolean;
    tb: boolean;
    tb_modificado: boolean;
    gestacion: boolean;
    gestacion_modificado: boolean;
    tiempo_gestacion: number;
    tiempo_gestacion_modificado: boolean;
    fecha_parto: Dayjs | null;
    fecha_parto_modificada: boolean;
    discapacidad_fisica: string;
    discapacidad_modificada: boolean;
    explicacion_discapacidad_fisica:string;
    explicacion_discapacidad_fisica_modificada:boolean;
    sigue_tratamiento_mental: boolean;
    sigue_tratamiento_mental_modificado: boolean;
    tiene_antecedentes_de_lesiones_autoinflingidas: boolean;
    tiene_antecedentes_de_lesiones_autoinflingidas_modificado: boolean;
    ha_estado_internado_en_hospital_psiquiatrico: boolean;
    ha_estado_internado_en_hospital_psiquiatrico_modificado: boolean;
    reporta_abuso_de_droga_previo_al_ingreso: boolean;
    reporta_abuso_de_droga_previo_al_ingreso_modificado: boolean;
    medicacion_actual: Array<string>;
    medicacion_actual_modificada: boolean;
    tiene_afeccion_severa_por_estupefacientes: boolean;
    tiene_afeccion_severa_por_estupefaciente_modificado: boolean;
    necesitaInterprete: boolean;
    necesitaInterprete_modificado: boolean;
    tieneDificultadParaLeerYEscribir: boolean;
    tieneDificultadParaLeerYEscribir_modificado: boolean;
}

export const datosSaludInicial: datosSaludType = {
    id_persona: null,
    tieneAfeccionADrogas_modificado: false,
    tieneAfeccionADrogras: false,
    grupo_sanguineo: 0,
    grupo_sanguineo_modificado: false,
    vacunas_recibidas: [],
    vacunas_recibidas_modificada: false,
    presion_arterial: 0,
    presion_arterial_modificada: false,
    frecuencia_cardiaca: 0,
    frecuencia_cardiaca_modificada: false,
    frecuencia_respiratoria: 0,
    frecuencia_respiratoria_modificada: false,
    temperatura: 0,
    temperatura_modificada: false,
    peso: 0,
    peso_modificado: false,
    talla: 0,
    talla_modificado: false,
    imc: 0,
    imc_modificado: false,
    vdrl: false,
    vdrl_modificado: false,
    vih: false,
    vih_modificado: false,
    tb: false,
    tb_modificado: false,
    gestacion: false,
    gestacion_modificado: false,
    tiempo_gestacion: 0,
    tiempo_gestacion_modificado: false,
    fecha_parto: null,
    fecha_parto_modificada: false,
    discapacidad_fisica: "",
    discapacidad_modificada: false,
    explicacion_discapacidad_fisica:"",
    explicacion_discapacidad_fisica_modificada:false,
    sigue_tratamiento_mental: false,
    sigue_tratamiento_mental_modificado: false,
    tiene_antecedentes_de_lesiones_autoinflingidas: false,
    tiene_antecedentes_de_lesiones_autoinflingidas_modificado: false,
    ha_estado_internado_en_hospital_psiquiatrico: false,
    ha_estado_internado_en_hospital_psiquiatrico_modificado: false,
    reporta_abuso_de_droga_previo_al_ingreso: false,
    reporta_abuso_de_droga_previo_al_ingreso_modificado: false,
    medicacion_actual: [],
    medicacion_actual_modificada: false,
    tiene_afeccion_severa_por_estupefacientes: false,
    tiene_afeccion_severa_por_estupefaciente_modificado: false,
    necesitaInterprete: false,
    necesitaInterprete_modificado: false,
    tieneDificultadParaLeerYEscribir: false,
    tieneDificultadParaLeerYEscribir_modificado: false,

}


export type datosSeguridadType = {
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
export interface datosConcubino {
    numeroDeIdentificacion: string;
    nombres: string;
    apellidos: string;

}

export const datosConcubinoInicial = {
    numeroDeIdentificacion: "",
    nombres: "",
    apellidos: ""
}

export type datosFamiliaresType = {
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
    id_persona: number | null;
    nombre: string | null;
    apellido: string | null;
    vinculo: string | null;
    relacion: number | null;
    establecimiento: number | null;
    edad_hijo: number | null ;
    numero_documento_concubino: string | null;
    lugar_donde_esta_hijo: string | null;
}
export const circuloFamiliarStateInitial = {
    id_persona: null,
    nombre: null,
    apellido: null,
    vinculo: null,
    relacion: null,
    establecimiento: null,
    edad_hijo: null,
    numero_documento_concubino: null,
    lugar_donde_esta_hijo: null
}