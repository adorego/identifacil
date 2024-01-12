interface error{
  code:string;
  message:string
}
export interface RequestResponse{
  success:boolean;
  error:error | null;
  datos:any
}
export async function api_request<T>(
  url:string,
  config: RequestInit
): Promise<RequestResponse>{
    // console.log("Antes de la consulta....")
    const response:Response = await fetch(url, config);
    const respuesta:RequestResponse = {
      success:false,
      error: null,
      datos:{}
    }
    if(!response.ok){
      respuesta.success = false;
      respuesta.error = await response.json();
    }else{
      respuesta.success = true;
      respuesta.datos = await response.json();
    }
    

    return respuesta;
  
}