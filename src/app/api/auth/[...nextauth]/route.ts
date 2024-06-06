
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials';
import {iniciarSesion} from "@/app/lib/sesion";
import { JWT, decode } from 'next-auth/jwt';
import { jwtDecode } from "jwt-decode";
import KeycloakProvider from 'next-auth/providers/keycloak'
import { cookies } from "next/headers";
import {encrypt} from "../../../../../utils/encryption";

const API_URL_REGISTRO = process.env.NEXTAUTH_API

interface tokenLoginType{
    sub:number;
    ci: string;
    nombre: string;
    apellido: string;
    roles: {id: number; nombre: string; permisos: {}[];}
    iat: string;
    exp: string;
}


const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                ci: { label: 'CI', type: 'text' },
                clave: { label: 'Clave', type: 'password' },
            },
            authorize: async (credentials) => {
                if (!credentials) {
                    return null;
                }

                // Realiza la solicitud al endpoint de login
                const res = await fetch(`${API_URL_REGISTRO}/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        ci: credentials.ci,
                        clave: credentials.clave,
                    }),
                });

                const user = await res.json();
                // Si recibes un access_token, decodifica el token para obtener los datos adicionales

                if (res.ok) {
                    // const decoded = await decode(user.access_token);
                    const decoded : tokenLoginType = jwtDecode(user.access_token)


                    return {
                        id: decoded.sub.toString(),
                        ci: decoded.ci, // Asegúrate de que el id esté en el token
                        accessToken: user.access_token,
                        roles: decoded?.roles || [], // Asegúrate de que los roles estén en el token
                        nombre: decoded?.nombre || '', // Incluye otros datos de usuario si es necesario
                        apellido: decoded?.apellido || '',
                    };
                } else {
                    return null;
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
        async jwt({ token, user }) {
            const cookieStore = cookies();
            const newtoken = cookieStore.get('next-auth.session-token')?.value
            const tokenDecoded = await decode({
                token: newtoken as string,
                secret: process.env.NEXTAUTH_SECRET as string,
            });


            return {...tokenDecoded, ...user};
        },
        // @ts-ignore
        async session({ session, token }) {
                console.log('experimento3 ', token)
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
});

export { handler as GET, handler as POST };