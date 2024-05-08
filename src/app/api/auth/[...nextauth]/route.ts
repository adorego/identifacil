
import NextAuth from 'next-auth'
import {iniciarSesion} from "@/app/lib/sesion";
import { JWT, decode } from 'next-auth/jwt';
import {jwtDecode} from "jwt-decode";
import KeycloakProvider from 'next-auth/providers/keycloak'
import { cookies } from "next/headers";
import {encrypt} from "../../../../../utils/encryption";

const handler = NextAuth({
    providers: [
        KeycloakProvider({
            clientId: `${process.env.KEYLOACK_FRONTEND_CLIENT_ID}`,
            clientSecret: `${process.env.KEYLOACK_CLIENT_SECRET}`,
            issuer: `${process.env.KEYLOACK_AUTH_ISSUER}`
        })
        /*CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: { label: 'Username', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials, req) {
                // Envia la peticion al backend.
                let UserTestHarCoded = {
                    "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJaUF9Ba2NvNjBqQnM5Wnp3b2lMS1BBYjdadHk4MHRIR2Q1Z2RDSl9oY1BJIn0.eyJleHAiOjE3MTM5Mjg2ODksImlhdCI6MTcxMzkyODM4OSwianRpIjoiZDc3YzUyZGItNDUyMy00NTJjLTgwYmYtNjEwMzQ1NTNmM2NjIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3JlYWxtcy9BVVRIIiwiYXVkIjpbInJlYWxtLW1hbmFnZW1lbnQiLCJhY2NvdW50Il0sInN1YiI6ImY5NWYyY2Y0LTkwZDItNDg0OS05N2U2LWMwMWY5Yjk1OTUyZiIsInR5cCI6IkJlYXJlciIsImF6cCI6ImF1dGgtYXBwIiwic2Vzc2lvbl9zdGF0ZSI6ImE0MWEzZDE0LWU4MzgtNDBiYi05OTcyLWE2ZjQ5ODM1ZmY0MCIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy1hdXRoIiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7InJlYWxtLW1hbmFnZW1lbnQiOnsicm9sZXMiOlsidmlldy11c2VycyIsInF1ZXJ5LWdyb3VwcyIsInF1ZXJ5LXVzZXJzIl19LCJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6ImVtYWlsIHByb2ZpbGUgZ3JvdXBzIiwic2lkIjoiYTQxYTNkMTQtZTgzOC00MGJiLTk5NzItYTZmNDk4MzVmZjQwIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5hbWUiOiJTdXBlciBBZG1pbiIsImdyb3VwcyI6WyJBZG1pbmlzdHJhZG9yIElBTSIsIkFkbWluaXN0cmFkb3IgU0lQUFkiXSwicHJlZmVycmVkX3VzZXJuYW1lIjoic3VwZXJhZG1pbiIsImxvY2FsZSI6ImVzIiwiZ2l2ZW5fbmFtZSI6IlN1cGVyIiwiZmFtaWx5X25hbWUiOiJBZG1pbiIsImVtYWlsIjoic3VwZXIuYWRtaW5AcHRpLm9yZy5weSJ9.MHJMyPfYG2TEXJ-2oo4CtBfoFhqZbVRxM_ez8pz2l0m2b5btnzIsAjkg030s_finBhZfZCLsVyxoCBEEtrJnQH74X8DiTmgo4yvOsbZP3kv7Txdh_f-XvCXCUEQETQ2dYqPAg5ZiK0SOds0XRfGRS6wUSPx1V7uqAUZo0blUG8VfmvEL_bNa3Q7u5JK2OQYx9QKnzFWWAJrIcOE_7AfHlecMFPP9oW9kFfrcQS4ikKZXp3SVACYgKR1O7YS38de5WJQZ3LtTIfBtgr7sGnBMbX6QfY0z5xUfAvyF1TI7xmx96V0mNLpin2qAvFKeEQYIgxNMn8XULs8jIsbGPFf9kQ",
                    "expires_in": 299,
                    "refresh_expires_in": 1800,
                    "refresh_token": "eyJhbGciOiJIUzUxMiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJkNzk5ZjQ2OC05ZGRhLTQ4MjctOGM2Yy02OGRjOWUzNWQ3NGEifQ.eyJleHAiOjE3MTM5MzAxOTAsImlhdCI6MTcxMzkyODM5MCwianRpIjoiZDEzYWQ2MTMtYmNkZC00OTBlLWJjYjktOGJkM2Y4YjBiZmY3IiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3JlYWxtcy9BVVRIIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3JlYWxtcy9BVVRIIiwic3ViIjoiZjk1ZjJjZjQtOTBkMi00ODQ5LTk3ZTYtYzAxZjliOTU5NTJmIiwidHlwIjoiUmVmcmVzaCIsImF6cCI6ImF1dGgtYXBwIiwic2Vzc2lvbl9zdGF0ZSI6ImE0MWEzZDE0LWU4MzgtNDBiYi05OTcyLWE2ZjQ5ODM1ZmY0MCIsInNjb3BlIjoiZW1haWwgcHJvZmlsZSBncm91cHMiLCJzaWQiOiJhNDFhM2QxNC1lODM4LTQwYmItOTk3Mi1hNmY0OTgzNWZmNDAifQ.LZpq377brpmK2xLQee-nC6atg-CQVGuJOUAQdjbmdT-ne_gecuRyTSvZPv6P8SulMxKx28M9fHYhPARmJQEILg",
                    "token_type": "Bearer",
                    "not-before-policy": 1712934655,
                    "session_state": "a41a3d14-e838-40bb-9972-a6f49835ff40",
                    "scope": "email profile groups"
                }
                await iniciarSesion(
                    credentials?.username as string,
                    credentials?.password as string
                ).then((res)=>{
                    console.log('test 222')
                }).catch((err)=>{
                    console.log('test 3333')
                })

                // Realiza la petición.
                const user =  JSON.stringify(UserTestHarCoded)
                // console.log(user)
                /!*if (user.error) {
                    throw user
                } else {
                    // Asigna el token de autorizacion para el cierre de sesión.
                    /!*user.authorization = res.headers.get('Authorization')
                    user.contrasenha = credentials?.password*!/
                }*!/
                return user
            },
        }),*/
    ],
    /*cookies: {
        sessionToken: {
            name: "next-auth.session-token",
            options: {
                domain: ".localhost",
                path: "/",
                httpOnly: true,
                sameSite: "lax",
                secure: false
            }
        }
    },*/
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
    /*callbacks: {
        async jwt({ token, user, account, profile }) {

            const nowTimeStamp = Math.floor(Date.now() / 1000);

            if(account){
                // account is only available the first time this callback is called on a new session (after the user signs in)
                token.decoded = jwtDecode(account.access_token);
                token.access_token = account.access_token;
                token.id_token = account.id_token;
                token.expires_at = account.expires_at;
                token.refresh_token = account.refresh_token;
            } else if (nowTimeStamp < token.expires_at) {
                // token has not expired yet, return it
                return token;
            } else {
                // token is expired, try to refresh it
                console.log("Token has expired. Will refresh...")
                /!*try {
                    const refreshedToken = await refreshAccessToken(token);
                    console.log("Token is refreshed.")
                    return refreshedToken;
                } catch (error) {
                    console.error("Error refreshing access token", error);
                    return { ...token, error: "RefreshAccessTokenError" };
                }*!/
            }
        },
        async session({ session, user, token }) {
            session.access_token = encrypt(token.access_token);
            session.access_token = encrypt(token.id_token);
            session.roles = token.decoded.realm_access.roles;

            return session
        },
        async redirect({ url, baseUrl }) {
            // Allows relative callback URLs
            if (url.startsWith("/")) return `${baseUrl}${url}`
            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) return url
            return baseUrl
        },
    },
    pages: {
        signIn: '/login',
    },*/
})

export {handler as GET, handler as POST}