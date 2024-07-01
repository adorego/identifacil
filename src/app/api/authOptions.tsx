import CredentialsProvider from "next-auth/providers/credentials";
import {jwtDecode} from "jwt-decode";
import {cookies} from "next/headers";
import {decode} from "next-auth/jwt";
import {fetchData} from "@/components/utils/utils";

const API_URL_REGISTRO = process.env.NEXT_PUBLIC_IDENTIFACIL_AUTH_API

interface tokenLoginType{
    sub:number;
    ci: string;
    nombre: string;
    apellido: string;
    roles: {id: number; nombre: string; permisos: {}[];}
    iat: string;
    exp: string;
}


export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                ci: { label: 'CI', type: 'text' },
                clave: { label: 'Clave', type: 'password' },
            },
            // @ts-ignore
            authorize: async (credentials) => {
                if (!credentials) {
                    return null;
                }

                console.log('***** check establecimientos comienza ***** ')
                const url = `${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/establecimientos/`;
                fetch(url).then(res=>res.json())
                    .then(fetchedData => {
                        console.log(fetchedData)
                    }).catch(err=>{
                        console.log('Error obteniendo establecimientos en auth', err)
                }).finally(()=>{
                    console.log('***** check establecimientos fin *****')
                });




                console.log('Check de URL en auth', `${API_URL_REGISTRO}/login`)
                // Realiza la solicitud al endpoint de login

                try {
                    const res = await fetch(`${API_URL_REGISTRO}/login`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            ci: credentials.ci,
                            clave: credentials.clave,
                        }),
                    });

                    const user = await res.json();

                    console.log('respuesta de json', user)

                    // Si recibes un access_token, decodifica el token para obtener los datos adicionales

                    if (res.ok) {
                        // const decoded = await decode(user.access_token);
                        const decoded : tokenLoginType = jwtDecode(user.access_token)
                        // console.log('decoded_token en route.ts', decoded)
                        // @ts-ignore
                        const rolId =decoded?.roles[0].id

                        const resPermisos = await fetch(`${API_URL_REGISTRO}/rol/${rolId}/permiso`)


                        if (resPermisos.ok) {
                            const datos = await resPermisos.json()
                            console.log('Captura de datos: ', datos)


                            return {
                                id: decoded.sub.toString(),
                                ci: decoded.ci, // Asegúrate de que el id esté en el token
                                accessToken: user.access_token,
                                // @ts-ignore
                                roles: decoded?.roles.map((item:any)=>({id:item.id, nombre:item.nombre, permisos: datos})) || [], // Asegúrate de que los roles estén en el token
                                nombre: decoded?.nombre || '', // Incluye otros datos de usuario si es necesario
                                apellido: decoded?.apellido || '',
                            };
                        }else{
                            return null
                        }
                    } else {
                        return null;
                    }
                }catch (e){
                    console.log('Error capturar en fetch de auth',e)
                }

            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        // Choose how you want to save the user session.
        // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
        // If you use an `adapter` however, we default it to `"database"` instead.
        // You can still force a JWT session by explicitly defining `"jwt"`.
        // When using `"database"`, the session cookie will only contain a `sessionToken` value,
        // which is used to look up the session in the database.
        strategy: "jwt",
    },
    callbacks: {
        // @ts-ignore
        async jwt({ token, user }) {

            const cookieStore = cookies();
            const newtoken = cookieStore.get('next-auth.session-token')?.value
            const tokenDecoded = await decode({
                token: newtoken as string,
                secret: process.env.NEXTAUTH_SECRET as string,
            });


            return {...user, ...token};
        },
        // @ts-ignore
        async session({ session, token }) {

            return {
                ...session,
                ...token,
                user:{
                    nombre: token.nombre,
                    apellido: token.apellido,
                    rol: token.roles,
                    ci: token.ci,
                },
                accesToken: token.accesToken,
                iat: token.iat,
                exp: token.exp,
                jti: token.jti,
            };
        },
    },
    pages: {
        signIn: '/login',
    },
}