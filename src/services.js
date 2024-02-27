import {API_REGISTRO} from "../config";

async function getDatos(endpoint){

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`)

    if(!res.ok) throw new Error('Something went wrong')

    return await res.json()
}
