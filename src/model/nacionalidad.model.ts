
export interface Nacionalidad{
  id:number;
  nacionalidad:string;
  pais:string;

}

export interface NacionalidadesDTO{
  nacionalidades:Array<Nacionalidad>;
  success:boolean;

}