import {
    Autocomplete,
    AutocompleteChangeReason,
    AutocompleteRenderInputParams,
    Box,
    Button,
    Chip,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Radio,
    RadioGroup,
    Select,
    SelectChangeEvent,
    TextField
  } from "@mui/material"
  import { FC, ReactNode, SyntheticEvent, useContext, useReducer, useState } from "react";
  
  import CheckBoxIcon from '@mui/icons-material/CheckBox';
  import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
  import { DatePicker } from "@mui/x-date-pickers";
  import { Dayjs } from "dayjs";
  import { IndexKind } from "typescript";
  import { api_request } from "@/lib/api-request";
  import log from "loglevel";
  import {useGlobalContext} from "@/app/Context/store";
  
  interface datosSalud{
    numeroDeIdentificacion:string | null;
    tieneAfeccionADrogas_modificado:boolean;
    tieneAfeccionADrogras:boolean;
    grupo_sanguineo:number;
    grupo_sanguineo_modificado:boolean;
    vacunas_recibidas:Array<{id:number, label:string}>;
    vacunas_recibidas_modificada:boolean;
    presion_arterial:number;
    presion_arterial_modificada:boolean;
    frecuencia_cardiaca:number;
    frecuencia_cardiaca_modificada:boolean;
    frecuencia_respiratoria:number;
    frecuencia_respiratoria_modificada:boolean;
    temperatura:number;
    temperatura_modificada:boolean;
    peso:number;
    peso_modificado:boolean;
    talla:number;
    talla_modificado:boolean;
    imc:number;
    imc_modificado:boolean;
    vdrl:boolean;
    vdrl_modificado:boolean;
    vih:boolean;
    vih_modificado:boolean;
    tb:boolean;
    tb_modificado:boolean;
    gestacion:boolean;
    gestacion_modificado:boolean;
    tiempo_gestacion:number;
    tiempo_gestacion_modificado:boolean;
    fecha_parto:Dayjs|null;
    fecha_parto_modificada:boolean;
    discapacidad_fisica:string;
    discapacidad_modificada:boolean;
    sigue_tratamiento_mental:boolean;
    sigue_tratamiento_mental_modificado:boolean;
    tiene_antecedentes_de_lesiones_autoinflingidas:boolean;
    tiene_antecedentes_de_lesiones_autoinflingidas_modificado:boolean;
    ha_estado_internado_en_hospital_psiquiatrico:boolean;
    ha_estado_internado_en_hospital_psiquiatrico_modificado:boolean;
    reporta_abuso_de_droga_previo_al_ingreso:boolean;
    reporta_abuso_de_droga_previo_al_ingreso_modificado:boolean;
    medicacion_actual:Array<string>;
    medicacion_actual_modificada:boolean;
    tiene_afeccion_severa_por_estupefacientes:boolean;
    tiene_afeccion_severa_por_estupefaciente_modificado:boolean;
    necesitaInterprete:boolean;
    necesitaInterprete_modificado:boolean;
    tieneDificultadParaLeerYEscribir:boolean;
    tieneDificultadParaLeerYEscribir_modificado:boolean;
  }
  
  enum SALUD_ACTIONS{
    MODIFICAR_AFECCION_DROGA,
    MODIFICAR_GRUPO_SANGUINEO,
    MODIFICAR_VACUNAS_RECIBIDAS,
    MODIFICAR_PRESION_ARTERIAL,
    MODIFICAR_FRECUENCIA_CARDIACA,
    MODIFICAR_FRECUENCIA_RESPIRATORIA,
    MODIFICAR_TEMPERATURA,
    MODIFICAR_PESO,
    MODIFICAR_TALLA,
    MODIFICAR_IMC,
    MODIFICAR_VDRL,
    MODIFICAR_VIH,
    MODIFICAR_TB,
    MODIFICAR_GESTACION,
    MODIFICAR_TIEMPO_GESTACION,
    MODIFICAR_FECHA_PARTO,
    MODIFICAR_DISCAPACIDAD_FISICA,
    MODIFICAR_SIGUE_TRATAMIENTO_MENTAL,
    MODIFICAR_TIENE_ANTECEDENTES_LESIONES_AUTOINFLINGIDAS,
    MODIFICAR_HA_ESTADO_INTERNADO_EN_PSIQUIATRICO,
    MODIFICAR_REPORTA_ABUSO_DE_DROGA_PREVIO_AL_INGRESO,
    MODIFICAR_MEDICACION_ACTUAL,
    MODIFICAR_TIENE_AFECCION_SEVERA_POR_ESTUPEFACIENTE,
    MODIFICAR_NECESITA_INTERPRETE,
    MODIFICAR_TIENE_DIFICULTAD_PARA_LEER_Y_ESCRIBIR,
  
  }
  interface saludActions{
    type:SALUD_ACTIONS;
    payload:any;
  }
  const datosSaludInicial:datosSalud = {
    numeroDeIdentificacion:null,
    tieneAfeccionADrogas_modificado:false,
    tieneAfeccionADrogras:false,
    grupo_sanguineo:0,
    grupo_sanguineo_modificado:false,
    vacunas_recibidas:[],
    vacunas_recibidas_modificada:false,
    presion_arterial:0,
    presion_arterial_modificada:false,
    frecuencia_cardiaca:0,
    frecuencia_cardiaca_modificada:false,
    frecuencia_respiratoria:0,
    frecuencia_respiratoria_modificada:false,
    temperatura:0,
    temperatura_modificada:false,
    peso:0,
    peso_modificado:false,
    talla:0,
    talla_modificado:false,
    imc:0,
    imc_modificado:false,
    vdrl:false,
    vdrl_modificado:false,
    vih:false,
    vih_modificado:false,
    tb:false,
    tb_modificado:false,
    gestacion:false,
    gestacion_modificado:false,
    tiempo_gestacion:0,
    tiempo_gestacion_modificado:false,
    fecha_parto:null,
    fecha_parto_modificada:false,
    discapacidad_fisica:"",
    discapacidad_modificada:false,
    sigue_tratamiento_mental:false,
    sigue_tratamiento_mental_modificado:false,
    tiene_antecedentes_de_lesiones_autoinflingidas:false,
    tiene_antecedentes_de_lesiones_autoinflingidas_modificado:false,
    ha_estado_internado_en_hospital_psiquiatrico:false,
    ha_estado_internado_en_hospital_psiquiatrico_modificado:false,
    reporta_abuso_de_droga_previo_al_ingreso:false,
    reporta_abuso_de_droga_previo_al_ingreso_modificado:false,
    medicacion_actual:[],
    medicacion_actual_modificada:false,
    tiene_afeccion_severa_por_estupefacientes:false,
    tiene_afeccion_severa_por_estupefaciente_modificado:false,
    necesitaInterprete:false,
    necesitaInterprete_modificado:false,
    tieneDificultadParaLeerYEscribir:false,
    tieneDificultadParaLeerYEscribir_modificado:false,
  
  } 
  
  interface datosSaludSelect{
    grupos_sanguineos:Array<{id:number,label:string}>;
    vacunas_recibidas:Array<{id:number, label:string}>;
  
  }
  
  const datosSaludSelectInicial:datosSaludSelect = {
    grupos_sanguineos:[{id:1,label:"A"},{id:2,label:"A+"},{id:3,label:"A-"}],
    vacunas_recibidas:[{id:1, label:"Covid 1era dosis"},{id:2, label:"Covid 2da dosis"},{id:3, label:"Covid 3era dosis"}]
  }
  
  function reducer(state:datosSalud, action:saludActions) {
    switch(action.type){
      case (SALUD_ACTIONS.MODIFICAR_AFECCION_DROGA):
        return Object.assign({},{...state,drogasModificado:true,tieneAfeccionADrogras:(action.payload === "true")});
      case (SALUD_ACTIONS.MODIFICAR_GRUPO_SANGUINEO):
        return Object.assign({},{...state, grupo_sanguineo_modificado:true ,grupo_sanguineo:(action.payload.id)});
      case (SALUD_ACTIONS.MODIFICAR_VACUNAS_RECIBIDAS):
        return Object.assign({},{...state, vacunas_recibidas:action.payload, vacunas_recibidas_modificada:true });
      case (SALUD_ACTIONS.MODIFICAR_PRESION_ARTERIAL):
        return Object.assign({},{...state, presion_arterial:action.payload, presion_arterial_modificada:true});
      case (SALUD_ACTIONS.MODIFICAR_FRECUENCIA_CARDIACA):
        return Object.assign({},{...state,frecuencia_cardiaca:action.payload, frecuencia_cardiaca_modificada:true});
      case (SALUD_ACTIONS.MODIFICAR_FRECUENCIA_RESPIRATORIA):
        return Object.assign({}, {...state, frecuencia_respiratoria:action.payload, frecuencia_respiratoria_modificada:true});
      case (SALUD_ACTIONS.MODIFICAR_TEMPERATURA):
        return Object.assign({},{...state, temperatura:action.payload, temperatura_modificada:true});
      case (SALUD_ACTIONS.MODIFICAR_PESO):
        return Object.assign({}, {...state, peso:action.payload, peso_modificado:true});
      case (SALUD_ACTIONS.MODIFICAR_TALLA):
        return Object.assign({},{...state, talla:action.payload, talla_modificado:true});
      case (SALUD_ACTIONS.MODIFICAR_IMC):
        return Object.assign({},{...state, imc:action.payload, imc_modificado:true});
      case (SALUD_ACTIONS.MODIFICAR_VDRL):
        return Object.assign({},{...state, vdrl:action.payload, vdrl_modificado:true});
      case (SALUD_ACTIONS.MODIFICAR_VIH):
        return Object.assign({},{...state, vih:action.payload, vih_modificado:true});
      case (SALUD_ACTIONS.MODIFICAR_TB):
        return Object.assign({},{...state, tb:action.payload, tb_modificado:true});
      case (SALUD_ACTIONS.MODIFICAR_GESTACION):
        return Object.assign({},{...state, gestacion_modificado:true,gestacion:(action.payload === "true")});
      case (SALUD_ACTIONS.MODIFICAR_TIEMPO_GESTACION):
        return Object.assign({},{...state, tiempo_gestacion_modificado:true,tiempo_gestacion:action.payload});
      case (SALUD_ACTIONS.MODIFICAR_FECHA_PARTO):
        return Object.assign({},{...state,fecha_parto_modificada:true, fecha_parto:action.payload});
      case (SALUD_ACTIONS.MODIFICAR_DISCAPACIDAD_FISICA):
        return Object.assign({},{...state, discapacidad_modificada:true, discapacidad_fisica:action.payload});
      case (SALUD_ACTIONS.MODIFICAR_SIGUE_TRATAMIENTO_MENTAL):
        return Object.assign({}, {...state, sigue_tratamiento_mental_modificado:true, sigue_tratamiento_mental:(action.payload === "true")});
      case (SALUD_ACTIONS.MODIFICAR_TIENE_ANTECEDENTES_LESIONES_AUTOINFLINGIDAS):
        return Object.assign({},{...state, tiene_antecedentes_de_lesiones_autoinflingidas_modificado:true, tiene_antecedentes_de_lesiones_autoinflingidas:(action.payload === "true")});
      case (SALUD_ACTIONS.MODIFICAR_HA_ESTADO_INTERNADO_EN_PSIQUIATRICO):
        return Object.assign({},{...state, ha_estado_internado_en_hospital_psiquiatrico_modificado:true, ha_estado_internado_en_hospital_psiquiatrico:(action.payload === "true")});
      case (SALUD_ACTIONS.MODIFICAR_REPORTA_ABUSO_DE_DROGA_PREVIO_AL_INGRESO):
        return Object.assign({}, {...state, reporta_abuso_de_droga_previo_al_ingreso_modificado:true, reporta_abuso_de_droga_previo_al_ingreso:(action.payload === "true")});
      case (SALUD_ACTIONS.MODIFICAR_MEDICACION_ACTUAL):
        return Object.assign({}, {...state, medicacion_actual_modificada:true, medicacion_actual:action.payload})
      case (SALUD_ACTIONS.MODIFICAR_TIENE_AFECCION_SEVERA_POR_ESTUPEFACIENTE):
        return Object.assign({},{...state, tiene_afeccion_severa_por_estupefaciente_modificado:true, tiene_afeccion_severa_por_estupefacientes:(action.payload === 'true')})
      case (SALUD_ACTIONS.MODIFICAR_NECESITA_INTERPRETE):
        return Object.assign({},{...state, necesitaInterprete_modificado:true, necesitaInterprete:(action.payload === "true")});
      case (SALUD_ACTIONS.MODIFICAR_TIENE_DIFICULTAD_PARA_LEER_Y_ESCRIBIR):
          return Object.assign({},{...state, tieneDificultadParaLeerYEscribir_modificado:true, tieneDificultadParaLeerYEscribir:(action.payload === "true")});
        
      default:
        return state;
    }
  }
  
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  export interface BloqueSaludProps{
    numeroDeIdentificacion:string;
    datosAlmacenados?:datosSalud;
  }
  const BloqueSalud:FC<BloqueSaludProps> = ({numeroDeIdentificacion,datosAlmacenados = datosSaludInicial}) =>{
    const [datosSaludFormState, datosSaludDispatch] = useReducer(reducer,datosAlmacenados);
    const [datosSaludSelectState, setDatosSaludSeelect] = useState<datosSaludSelect>(datosSaludSelectInicial);
    const {openSnackbar} = useGlobalContext();
    // console.log("Estado:", datosSaludFormState);
  
    const onAffecionDrogaChange = (event:React.ChangeEvent<HTMLInputElement>  ) =>{
      // console.log("Handler:", event.currentTarget.value);
      
      datosSaludDispatch({type:SALUD_ACTIONS.MODIFICAR_AFECCION_DROGA,payload:event.currentTarget.value });
    }
  
    const onGrupoSanguineoSelect = (event:React.SyntheticEvent, value:any, reason:string) =>{
      // console.log(value);
      datosSaludDispatch({type:SALUD_ACTIONS.MODIFICAR_GRUPO_SANGUINEO, payload:value})
    }
  
    //Manejador de vacunas recibidas
    const onVacunasRecibidasAdd = (event:React.SyntheticEvent, value:Array<{id:number, label:string}>, reason:string) =>{
      // console.log(value);
      datosSaludDispatch({type:SALUD_ACTIONS.MODIFICAR_VACUNAS_RECIBIDAS, payload:value});
    }
  
    //Manejador de Presión Arterial
    const onPresionArterialChange = (event:React.ChangeEvent<HTMLInputElement>) =>{
      // console.log(event.currentTarget.value);
      datosSaludDispatch({type:SALUD_ACTIONS.MODIFICAR_PRESION_ARTERIAL, payload:event.currentTarget.value});
    }
  
    //Manejador de frecuencia cardiaca
    const onFrecuenciaCardiacaChange = (event:React.ChangeEvent<HTMLInputElement>) =>{
      // console.log(event.currentTarget.value);
      datosSaludDispatch({type:SALUD_ACTIONS.MODIFICAR_FRECUENCIA_CARDIACA, payload:event.currentTarget.value});
    }
  
    //Manejador de frecuencia respiratoria
    const onFrecuenciaRespiratoriaChange = (event:React.ChangeEvent<HTMLInputElement>) =>{
      // console.log(event.currentTarget.value);
      datosSaludDispatch({type:SALUD_ACTIONS.MODIFICAR_FRECUENCIA_RESPIRATORIA, payload:event.currentTarget.value});
    }
  
    //Manejador de temperatura
    const onTemperaturaChange = (event:React.ChangeEvent<HTMLInputElement>) =>{
      // console.log(event.currentTarget.value);
      datosSaludDispatch({type:SALUD_ACTIONS.MODIFICAR_TEMPERATURA, payload:event.currentTarget.value});
    }
  
    //Manejador de peso
    const onPesoChange = (event:React.ChangeEvent<HTMLInputElement>) =>{
      // console.log(event.currentTarget.value);
      datosSaludDispatch({type:SALUD_ACTIONS.MODIFICAR_PESO, payload:event.currentTarget.value});
    }
  
    //Manejador de talla
    const onTallaChange = (event:React.ChangeEvent<HTMLInputElement>) =>{
      // console.log(event.currentTarget.value);
      datosSaludDispatch({type:SALUD_ACTIONS.MODIFICAR_TALLA, payload:event.currentTarget.value});
    }
  
    //Manejador de IMC
    const onIMCChange = (event:React.ChangeEvent<HTMLInputElement>) =>{
      // console.log(event.currentTarget.value);
      datosSaludDispatch({type:SALUD_ACTIONS.MODIFICAR_IMC, payload:event.currentTarget.value});
    }
  
     //Manejador de IMC
     const onVDRLChange = (event:SelectChangeEvent) =>{
      // console.log(event.target.value);
      datosSaludDispatch({type:SALUD_ACTIONS.MODIFICAR_VDRL, payload:event.target.value === "Positivo"});
    }
  
    //Manejador de VIH
    const onVIHChange = (event:SelectChangeEvent) =>{
      // console.log(event.target.value);
      datosSaludDispatch({type:SALUD_ACTIONS.MODIFICAR_VIH, payload:event.target.value === "Positivo"});
    }
  
    //Manejador de TB
    const onTBChange = (event:SelectChangeEvent) =>{
      // console.log(event.target.value);
      datosSaludDispatch({type:SALUD_ACTIONS.MODIFICAR_TB, payload:event.target.value === "Positivo"});
    }
  
    //Manejador de Gestacion
    const onGestacionChange = (event:React.ChangeEvent<HTMLInputElement>) =>{
      // console.log(event.currentTarget.value);
      datosSaludDispatch({type:SALUD_ACTIONS.MODIFICAR_GESTACION, payload:event.currentTarget.value});
    }
    
  
    const onTiempoDeGestacionChange = (event:React.ChangeEvent<HTMLInputElement>) =>{
      // console.log(event.currentTarget.value);
      datosSaludDispatch({type:SALUD_ACTIONS.MODIFICAR_TIEMPO_GESTACION, payload:event.currentTarget.value});
  
    }
  
    const onFechaPartoChange = (value:Dayjs | null, context: any) =>{
      // console.log(value,context);
      datosSaludDispatch({type:SALUD_ACTIONS.MODIFICAR_FECHA_PARTO, payload:value})
    }
  
    const onDiscapacidadFisicaChange = (event:React.ChangeEvent<HTMLInputElement>) =>{
      // console.log(event.currentTarget.value);
      datosSaludDispatch({type:SALUD_ACTIONS.MODIFICAR_DISCAPACIDAD_FISICA, payload:event.currentTarget.value});
    }
  
    const onSigueTratamientoMentalChange = (event:React.ChangeEvent<HTMLInputElement>) =>{
      // console.log(event.currentTarget.value);
      datosSaludDispatch({type:SALUD_ACTIONS.MODIFICAR_SIGUE_TRATAMIENTO_MENTAL, payload:event.currentTarget.value});
    }
  
    const onTieneAntecedentesDeLesionesAutoinflingidasChange = (event:React.ChangeEvent<HTMLInputElement>) =>{
      datosSaludDispatch({type:SALUD_ACTIONS.MODIFICAR_TIENE_ANTECEDENTES_LESIONES_AUTOINFLINGIDAS, payload:event.currentTarget.value});
    }
  
    const onHaEstadoInternadoEnPsiquiatricoChange = (event:React.ChangeEvent<HTMLInputElement>) =>{
      datosSaludDispatch({type:SALUD_ACTIONS.MODIFICAR_HA_ESTADO_INTERNADO_EN_PSIQUIATRICO, payload:event.currentTarget.value});
    }
  
    const onReportaAbusoDeDrogaPrevioAlIngresoChange = (event:React.ChangeEvent<HTMLInputElement>) =>{
      datosSaludDispatch({type:SALUD_ACTIONS.MODIFICAR_REPORTA_ABUSO_DE_DROGA_PREVIO_AL_INGRESO, payload:event.currentTarget.value});
    }
  
    const onMedicacionActualChange = (event:SyntheticEvent<Element,Event>, value:any) =>{
      // console.log(value);
      datosSaludDispatch({type:SALUD_ACTIONS.MODIFICAR_MEDICACION_ACTUAL, payload:value});
    }
  
    const onTieneAfeccionSeveraPorEstupefacientes = (event:React.ChangeEvent<HTMLInputElement>) =>{
      console.log(event.currentTarget.value);
      datosSaludDispatch({type:SALUD_ACTIONS.MODIFICAR_TIENE_AFECCION_SEVERA_POR_ESTUPEFACIENTE, payload:event.currentTarget.value});
    }
  
    const onNecesitaInterpreteChange = (event:React.ChangeEvent<HTMLInputElement>) =>{
      console.log(event.currentTarget.value);
      datosSaludDispatch({type:SALUD_ACTIONS.MODIFICAR_NECESITA_INTERPRETE, payload:event.currentTarget.value});
    }
  
    const onTieneDificultadParaLeerYEscribirChange = (event:React.ChangeEvent<HTMLInputElement>) =>{
      console.log(event.currentTarget.value);
      datosSaludDispatch({type:SALUD_ACTIONS.MODIFICAR_TIENE_DIFICULTAD_PARA_LEER_Y_ESCRIBIR, payload:event.currentTarget.value});
    }
    const onDatosSaludSubmit = async (event:React.MouseEvent<HTMLButtonElement>) =>{
      event.preventDefault();
      
      const url = `${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/salud`;
      const datosDelFormulario:datosSalud = Object.assign({},datosSaludFormState);
      datosDelFormulario.numeroDeIdentificacion = numeroDeIdentificacion;
      const respuesta = await api_request(url,{
        method:'POST',
        body:JSON.stringify(datosDelFormulario),
        headers: {
            'Content-Type': 'application/json'
        }
  
      })
      if(respuesta.success){
        openSnackbar("Datos guardados correctamente","success")
      }else{
        openSnackbar(`Error al guardar los datos: ${respuesta.datos.message}`,`error`);
        log.error("Error al guardar los datos", respuesta.datos);
      }
  
      console.log("Respuesta:", respuesta);
    }
  
    
    return(
      <>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': {m: 1, width: '25ch'},
        }}
        noValidate
        autoComplete="off"
        mx={2}>
          <Grid mb={2}>
            <FormControl>
              <FormLabel id="gestioacion">Cuenta con alguna afección por el consumo excesivo de
                                  sustancias estupefacientes o drogas prohibidas.</FormLabel>
                <RadioGroup
                  value={datosSaludFormState.tieneAfeccionADrogras}
                  onChange={onAffecionDrogaChange}
                  row
                  name="consumoDroga-grupo">
                  <FormControlLabel 
                  value={true}
                  control={<Radio  /> } 
                  label="Si"/>
                  <FormControlLabel 
                  value={false}
                  control={<Radio  /> } 
                  label="No"/>
                </RadioGroup>
          </FormControl>
        </Grid>
        <Grid container  my={0}>
          <Grid item sm={6}>
            <FormControl fullWidth={true}>
              <Autocomplete 
                onChange={onGrupoSanguineoSelect}
                disablePortal
                // sx={{width: 300}}
                renderOption={(props, option) =>{
                  return(
                    <li {...props} key={option.id}>
                      {option.label}
                     </li>
                  )
                }}  
                renderInput={function (params: AutocompleteRenderInputParams): ReactNode {
                  return(
                    <TextField  ref={params.InputProps.ref} {...params} label="Grupo Sanguineo" variant="outlined"/>
                  )
                } } 
                options={datosSaludSelectState?.grupos_sanguineos}            
              
              />
                      
            </FormControl>
          </Grid>
          <Grid item sm={6}>
            <FormControl fullWidth={true}>
            <Autocomplete
              multiple
              onChange={onVacunasRecibidasAdd}
              id="id-vacunas-recibidas"
              options={datosSaludSelectState.vacunas_recibidas}
              disableCloseOnSelect
              getOptionLabel={(option) => option.label}
              style={{ width: 500 }}
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option.id}>
                    {option.label}
                  </li>
                );
              }}
              renderTags={(tagValue, getTagProps) => {
                return tagValue.map((option, index) => (
                  <Chip {...getTagProps({ index })} key={option.id} label={option.label} />
                ))
              }}
              renderInput={(params) => (
                <TextField ref={params.InputProps.ref} {...params}  variant="outlined" label="Vacunas recibidas" placeholder="Seleccionar" />
              )}
            />
                
            </FormControl>
          </Grid>
  
        </Grid>
        <Grid container spacing={2} my={2}>
                          <Grid item sm={12}>
                              <FormLabel sx={{ fontWeight: 'bold', textTransform: 'uppercase' }} id="demo-row-radio-buttons-group-label">Control de signos vitales</FormLabel>
                          </Grid>
                          <Grid item sm={1}>
                              <FormControl fullWidth={true}>
                                  <InputLabel htmlFor="pa">PA</InputLabel>
                                  <OutlinedInput
                                      name="pa"
                                      value={datosSaludFormState.presion_arterial}
                                      label="PA"
                                      onChange={onPresionArterialChange}
                                  />
                              </FormControl>
                          </Grid>
                          <Grid item sm={1}>
                              <FormControl fullWidth={true}>
                                  <InputLabel htmlFor="fc">FC</InputLabel>
                                  <OutlinedInput
                                      name="fc"
                                      value={datosSaludFormState.frecuencia_cardiaca}
                                      label="FC"
                                      onChange={onFrecuenciaCardiacaChange}
                                  />
                              </FormControl>
                          </Grid>
                          <Grid item sm={1}>
                              <FormControl fullWidth={true}>
                                  <InputLabel htmlFor="FR">FR</InputLabel>
                                  <OutlinedInput
                                      name="fr"
                                      value={datosSaludFormState.frecuencia_respiratoria}
                                      onChange={onFrecuenciaRespiratoriaChange}
                                      label="FR"
                                  />
                              </FormControl>
                          </Grid>
                          <Grid item sm={1}>
                              <FormControl fullWidth={true}>
                                  <InputLabel htmlFor="t">Temperatura</InputLabel>
                                  <OutlinedInput
                                      name="t"
                                      value={datosSaludFormState.temperatura}
                                      onChange={onTemperaturaChange}
                                      label="T"
                                  />
                              </FormControl>
                          </Grid>
                          <Grid item sm={1}>
                              <FormControl fullWidth={true}>
                                  <InputLabel htmlFor="peso">Peso</InputLabel>
                                  <OutlinedInput
                                      name="peso"
                                      value={datosSaludFormState.peso}
                                      onChange={onPesoChange}
                                      label="Peso"
                                  />
                              </FormControl>
                          </Grid>
                          <Grid item sm={1}>
                              <FormControl fullWidth={true}>
                                  <InputLabel htmlFor="talla">Talla</InputLabel>
                                  <OutlinedInput
                                      name="talla"
                                      value={datosSaludFormState.talla}
                                      onChange={onTallaChange}
                                      label="Talla"
                                  />
                              </FormControl>
                          </Grid>
                          <Grid item sm={1}>
                              <FormControl fullWidth={true}>
                                  <InputLabel htmlFor="imc">IMC</InputLabel>
                                  <OutlinedInput
                                      name="imc"
                                      value={datosSaludFormState.imc}
                                      onChange={onIMCChange}
                                      label="IMC"
                                  />
                              </FormControl>
                          </Grid>
                          <Grid item sm={1}>
                              <FormControl fullWidth={true}>
                                  <InputLabel htmlFor="vdrl">VDRL</InputLabel>
                                  <Select
                                    labelId="vdrl"
                                    value={datosSaludFormState.vdrl ? "Positivo" : "Negativo"}
                                    label="VDRL"
                                    onChange={onVDRLChange}
                                    
                                  >
                                    <MenuItem value={"Positivo"}>Positivo</MenuItem>
                                    <MenuItem value={"Negativo"}>Negativo</MenuItem>
  
                                  </Select>
                              </FormControl>
                          </Grid>
                          <Grid item sm={1}>
                              <FormControl fullWidth={true}>
                                  <InputLabel htmlFor="vih">VIH</InputLabel>
                                  <Select
                                    labelId="vih"
                                    value={datosSaludFormState.vih ? "Positivo" : "Negativo"}
                                    label="VDRL"
                                    onChange={onVIHChange}
                                    
                                  >
                                    <MenuItem value={"Positivo"}>Positivo</MenuItem>
                                    <MenuItem value={"Negativo"}>Negativo</MenuItem>
  
                                  </Select>
                              </FormControl>
                          </Grid>
                          <Grid item sm={1}>
                              <FormControl fullWidth={true}>
                                  <InputLabel htmlFor="tb">TB</InputLabel>
                                  <Select
                                    labelId="tb"
                                    value={datosSaludFormState.tb ? "Positivo" : "Negativo"}
                                    label="VDRL"
                                    onChange={onTBChange}
                                    
                                  >
                                    <MenuItem value={"Positivo"}>Positivo</MenuItem>
                                    <MenuItem value={"Negativo"}>Negativo</MenuItem>
  
                                  </Select>
                              </FormControl>
                          </Grid>
  
        </Grid>
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <FormLabel sx={{ fontWeight: 'bold', textTransform: 'uppercase' }} id="demo-row-radio-buttons-group-label">Maternidad</FormLabel>
          </Grid>
                          
          <Grid item sm={4}>
            <FormControl>
              <FormLabel id="gestioacion">¿Se encuentra en Periodo de gestación?</FormLabel>
                 <RadioGroup
                  value={datosSaludFormState.gestacion}
                  onChange={onGestacionChange}
                  row
                  aria-labelledby="gestioacion"
                  name="row-radio-buttons-group">                 
                    <FormControlLabel 
                      value={true}
                      control={<Radio  /> } 
                      label="Si"/>
                    <FormControlLabel 
                      value={false}
                      control={<Radio  /> } 
                      label="No"/>
                 </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item sm={4} 
            sx={{marginTop:1}}>
            <FormControl fullWidth={true}>
              <InputLabel htmlFor="gestacionTiempotiempoGestacion">¿Meses de gestación?</InputLabel>
                <OutlinedInput
                  disabled={!datosSaludFormState.gestacion}
                  name="tiempoGestacion"
                  value={datosSaludFormState.tiempo_gestacion}
                  onChange={onTiempoDeGestacionChange}
                  label="¿De cuanto tiempo se encuentra?" />
            </FormControl>
          </Grid>
          <Grid item sm={4}
             sx={{marginTop:0}}>
            <FormControl 
              
              fullWidth={true}>
              {/* <InputLabel htmlFor="gestacionFecha">Fecha de parto</InputLabel> */}
              
                  <DatePicker 
                    value={datosSaludFormState.fecha_parto} 
                    format="DD/MM/YYYY"
                    onChange={onFechaPartoChange}
                    label={"Fecha de parto"} 
                    disabled={!datosSaludFormState.gestacion}/>
              
            </FormControl>
          </Grid>
        </Grid>
  
        <Grid container spacing={2} mt={2}>
          <Grid item sm={12}>
            <FormLabel sx={{ fontWeight: 'bold', textTransform: 'uppercase' }} id="demo-row-radio-buttons-group-label">Salud mental</FormLabel>
          </Grid>
          <Grid item sm={6}>
            <FormControl>
              <FormLabel id="gestioacion">¿Sigue algún tratamiento por Salud Mental?</FormLabel>
                <RadioGroup
                  value={datosSaludFormState.sigue_tratamiento_mental}
                  onChange={onSigueTratamientoMentalChange}
                  row
                  aria-labelledby="gestioacion"
                  name="row-radio-buttons-group">
                    <FormControlLabel 
                    value={true} 
                    control={<Radio />
                    } label="Si"/>
                    <FormControlLabel 
                      value={false} 
                      control={<Radio/>} 
                      label="No"/>
                </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item sm={6}>
            <FormControl>
              <FormLabel id="gestioacion">Antecedentes de lesiones autoinfligidas</FormLabel>
                <RadioGroup
                  value={datosSaludFormState.tiene_antecedentes_de_lesiones_autoinflingidas}
                  onChange={onTieneAntecedentesDeLesionesAutoinflingidasChange}
                  row
                  aria-labelledby="lecionesAutoInflingidas"
                  name="lesiones-autoInflingidas">
                  <FormControlLabel 
                    value={true}
                    control={<Radio/>} 
                    label="Si"/>
                  <FormControlLabel 
                    value={false} 
                    control={<Radio />} 
                    label="No"/>
                </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
  
        <Grid container spacing={2} mt={2}>
          <Grid item sm={6}>
            <FormControl>
              <FormLabel id="gestioacion">¿Ha estado internado en hospital Psiquiatrico/Centro
                                      nacional de control de addicciones?</FormLabel>
                  <RadioGroup
                    value={datosSaludFormState.ha_estado_internado_en_hospital_psiquiatrico}
                    onChange={onHaEstadoInternadoEnPsiquiatricoChange}
                    row
                    aria-labelledby="gestioacion"
                    name="row-radio-buttons-group">
                    <FormControlLabel 
                      value={true} 
                      control={<Radio />} 
                      label="Si"/>
                    <FormControlLabel 
                      value={false} 
                      control={<Radio />} 
                      label="No"/>
                  </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item sm={6}>
            <FormControl>
              <FormLabel id="drogra-previo-prision">La PPL reporta un problema de abuso de drogas previo al
                                      ingreso de prisión</FormLabel>
                <RadioGroup
                  value={datosSaludFormState.reporta_abuso_de_droga_previo_al_ingreso}
                  onChange={onReportaAbusoDeDrogaPrevioAlIngresoChange}
                  row
                  aria-labelledby="drogra-previo-prision"
                  name="row-radio-buttons-group">
                  <FormControlLabel 
                    value={true} 
                    control={<Radio />} 
                    label="Si"/>
                  <FormControlLabel 
                    value={false} 
                    control={<Radio />} 
                    label="No"/>
                </RadioGroup>
              </FormControl>
            </Grid>
        </Grid>
        <Grid container spacing={2} mt={2}>
          <Grid item sm={6}>
            <FormControl>
              <FormLabel id="medicacionActualmente">¿Que medicación toma actualmente?</FormLabel>
              <Autocomplete
                multiple
                onChange={onMedicacionActualChange}
                id="medicamentos-id"
                options={[]}
                freeSolo
                // renderTags={(value: readonly string[], getTagProps) =>
                //   value.map((option: string, index: number) => (
                //     <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                //   ))
                // }
              renderInput={(params) => (
              <TextField 
                ref={params.InputProps.ref}
                {...params}
                variant="outlined"
                label="Medicamentos"
                placeholder="Ingrese el nombre del medicamento"
              />
          )}
        />
            </FormControl>
          </Grid>
        </Grid>
  
        <Grid container spacing={2} mt={2}>
          <Grid item sm={6}>
            <FormControl>
              <FormLabel id="afeccionSeveraEstupefacientes">
                ¿Cuenta con alguna afección severa interna o externa por el consumo excesivo de
                sustancias estupefacientes o drogas prohibidas.?
              </FormLabel>
              <RadioGroup
                value={datosSaludFormState.tiene_afeccion_severa_por_estupefacientes}
                onChange={onTieneAfeccionSeveraPorEstupefacientes}
                row
                aria-labelledby="afeccionSeveraEstupefacientes"
                name="row-radio-buttons-group">
                <FormControlLabel 
                  value={true} 
                  control={<Radio />} 
                  label="Si"/>
                <FormControlLabel 
                  value={false} 
                  control={<Radio />} 
                  label="No"/>
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
        
        
  
        {/* Salud Fisica                   */}
        <Grid container spacing={2} mt={2}>
                          <Grid item sm={12}>
                              <FormLabel  sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}  id="demo-row-radio-buttons-group-label">Salud fisica</FormLabel>
                          </Grid>
                          <Grid item sm={6}>
                            <FormControl>
                                  <FormLabel id="discapacidad">Posee alguna Discapacidad:</FormLabel>
                                  <RadioGroup
                                      value={datosSaludFormState.discapacidad_fisica}
                                      onChange={onDiscapacidadFisicaChange}
                                      row
                                      aria-labelledby="discapacidad"
                                      name="row-radio-buttons-group"
                                  >
                                      <FormControlLabel 
                                        value="fisica" 
                                        control={<Radio/>} 
                                        label="Fisica"/>
                                      <FormControlLabel 
                                        value="motora" 
                                        control={<Radio />} 
                                        label="Motora"/>
                                  </RadioGroup>
                              </FormControl>
                          </Grid>
  
        </Grid>
        <Grid container spacing={2} mt={2}>
          <Grid item sm={12}>
            <FormLabel  sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}  id="demo-row-radio-buttons-group-label">Limitaciones idiomáticas </FormLabel>
          </Grid>
          <Grid item sm={6}>
            <FormControl>
              <FormLabel id="interprete">¿Necesita un intérprete?</FormLabel>
                <RadioGroup
                  value={datosSaludFormState.necesitaInterprete}
                  onChange={onNecesitaInterpreteChange}
                  row                
                  aria-labelledby="interprete"
                  name="row-radio-buttons-group">
                  <FormControlLabel 
                    value={true} 
                    control={<Radio />} 
                    label="Si"/>
                  <FormControlLabel 
                    value={false} 
                    control={<Radio />} 
                    label="No"/>
                </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item sm={6}>
            <FormControl>
              <FormLabel id="dificultad-leer-escribir">Dificultad para leer o escribir</FormLabel>
                <RadioGroup
                  value={datosSaludFormState.tieneDificultadParaLeerYEscribir}
                  onChange={onTieneDificultadParaLeerYEscribirChange}
                  row
                  aria-labelledby="dificultad-leer-escribir"
                  name="row-radio-buttons-group" >
              <FormControlLabel 
                value={true} 
                control={<Radio />} 
                label="Si"/>
              <FormControlLabel 
                value={false} 
                control={<Radio />} 
                label="No"/>
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item sm={12} mt={4}>
            <Button onClick={onDatosSaludSubmit}  variant='contained'>
              Guardar cambios
            </Button>
        </Grid>
      </Grid>
  
    </Box>
      
      
      </>
    )
  }
  
  export default BloqueSalud;
  
  