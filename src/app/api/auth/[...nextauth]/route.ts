
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials';
import {iniciarSesion} from "@/app/lib/sesion";
import { JWT, decode } from 'next-auth/jwt';
import { jwtDecode } from "jwt-decode";
import KeycloakProvider from 'next-auth/providers/keycloak'
import { cookies } from "next/headers";
import {encrypt} from "../../../../../utils/encryption";
import {authOptions} from '@/app/api/authOptions'






// @ts-ignore
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
