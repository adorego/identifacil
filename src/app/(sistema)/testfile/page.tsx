const bodyInfo = new URLSearchParams({
    'username': 'superadmin',
    'password': 'admin',
    'scope': 'groups',
    'client_id': 'auth-app',
    'grant_type': 'password',
})
async function getData() {
    const res = await fetch('http://localhost:8080/realms/AUTH/protocol/openid-connect/token', {
        method: 'POST',
        body: bodyInfo,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    console.log(res)

    // return res.json()
}

export default async function Page(){

    const data = await getData()

    console.log(data)

    return(
        <>
            <h1>Test2</h1>
        </>
    )
}