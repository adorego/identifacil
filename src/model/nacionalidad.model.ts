
export interface Nacionalidad{
  id:number;
  nombre:string;
  pais:string;

}

export interface NacionalidadesDTO{
  nacionalidades:Array<Nacionalidad>;
  success:boolean;

}