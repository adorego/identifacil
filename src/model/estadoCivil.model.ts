
export interface EstadoCivil{
  id:number;
  codigo:string;
  nombre:string;
}

export interface EstadoCivilDTO{
  estadosCiviles:Array<EstadoCivil>;
  success:boolean;
}
export interface DepartamentoType{
  id:number;
  nombre:string;
  codigo?:string;
}

export interface CiudadType{
  id:number;
  nombre:string;
}