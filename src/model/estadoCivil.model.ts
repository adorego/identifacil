
export interface EstadoCivil{
  id:number;
  codigo:string;
  nombre:string;
}

export interface EstadoCivilDTO{
  estadosCiviles:Array<EstadoCivil>;
  success:boolean;
}