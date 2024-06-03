
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials';
import {iniciarSesion} from "@/app/lib/sesion";
import { JWT, decode } from 'next-auth/jwt';
import {jwtDecode} from "jwt-decode";
import KeycloakProvider from 'next-auth/providers/keycloak'
import { cookies } from "next/headers";
import {encrypt} from "../../../../../utils/encryption";

const API_URL_REGISTRO = process.env.NEXT_PUBLIC_IDENTIFACIL_AUTH_API

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                ci: { label: 'CI', type: 'text' },
                clave: { label: 'Clave', type: 'password' }
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

                // Si recibes un access_token, retorna el usuario con un id
                if (res.ok && user.access_token) {
                    return {
                        id: user.id, // Asigna un id adecuado aquí
                        accessToken: user.access_token,
                    };
                } else {
                    return null;
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                // @ts-ignore
                token.accessToken = user.accessToken;
            }
            return token;
        },
        async session({ session, token }) {
            // @ts-ignore
            session.accessToken = token.accessToken;
            return session;
        }
    },
    pages: {
        signIn: '/login',
    },
    secret: process.env.NEXTAUTH_SECRET,
})

export {handler as GET, handler as POST}