import axios from "axios";

const BACKEND_URL = "http://localhost:5000/api/v1"

describe("Authentication", () => {
    test("user is able to signup", async () => {
        const res = await axios.post(`${BACKEND_URL}/auth/signup`, {
            name : "chrollo",
            email : "chrollo@gamil.com",
            password : "chrollo",
            role : "User",
            address : "address"
        })
        expect(res.status).toBe(201);
    })
    test("user is not able to signup without name", async () => {
        const res = await axios.post(`${BACKEND_URL}/auth/signup`, {
            email : "chrollo@gamil.com",
            password : "chrollo",
            role : "User",
            address : "address"
        })
        expect(res.status).toBe(400);
    })
    test("user is not able to signup without email", async () => {
        const res = await axios.post(`${BACKEND_URL}/auth/signup`, {
            name : "chrollo",
            password : "chrollo",
            role : "User",
            address : "address"
        })
        expect(res.status).toBe(400);
    })
    test("user is not able to signup without password", async () => {
        const res = await axios.post(`${BACKEND_URL}/auth/signup`, {
            name : "chrollo",
            email : "chrollo@gamil.com",
            role : "User",
            address : "address"
        })
        expect(res.status).toBe(400);
    })
    test("user is not able to signup without role", async () => {
        const res = await axios.post(`${BACKEND_URL}/auth/signup`, {
            name : "chrollo",
            email : "chrollo@gamil.com",
            password : "chrollo",
            address : "address"
        })
        expect(res.status).toBe(400);
    })
    test("user is able to signin", async () => {
        const res = await axios.post(`${BACKEND_URL}/auth/signin`, {
            email : "chrollo@gamil.com",
            password : "chrollo",
        })
        expect(res.status).toBe(200);
    })
    test("user is not able to signin without email", async () => {
        const res = await axios.post(`${BACKEND_URL}/auth/signin`, {
            password : "chrollo",
        })
        expect(res.status).toBe(400);
    })
    test("user is not able to signin without password", async () => {
        const res = await axios.post(`${BACKEND_URL}/auth/signin`, {
            email : "chrollo@gamil.com",
        })
        expect(res.status).toBe(400);
    })
    test("user is not able to signin with wrong email", async() => {
        const res = await axios.post(`${BACKEND_URL}/auth/signin`, {
            email : "test@gamil.com",
            password : "chrollo",
        })
        expect(res.status).toBe(400);
    })
    test("user is not able to signin with wrong password", async() => {
        const res = await axios.post(`${BACKEND_URL}/auth/signin`, {
            email : "chrollo@gamil.com",
            password : "sdfafqerf",
        })
        expect(res.status).toBe(400);
    })
})

describe("User", () => {

    let userToken;

    beforeAll(async () => {

        const signupRes = await axios.post(`${BACKEND_URL}/auth/signup`, {
            name : "chrollo",
            email : "chrollo@gamil.com",
            password : "chrollo",
            role : "User",
            address : "address"
        })

        const signinRes = await axios.post(`${BACKEND_URL}/auth/signin`, {
            email : "chrollo@gamil.com",
            password : "chrollo",
        })

        userToken = signinRes.data.token

    })

    test("user can get profile", async () => {
        const res = await axios.get(`${BACKEND_URL}/user/profile`,{
            headers : {
                token : userToken
            }
        })
        expect(res.status).toBe(200);
    })

    test("user can't get profile with wrong token", async () => {
        const res = await axios.get(`${BACKEND_URL}/user/profile`,{
            headers : {
                token : "fsdfsfsdf"
            }
        })
        expect(res.status).toBe(400);
    })

    test("user can't get profile without token", async () => {
        const res = await axios.get(`${BACKEND_URL}/user/profile`);
        expect(res.status).toBe(400);
    })

    test("user can get orders", async () => {
        const res = await axios.get(`${BACKEND_URL}/user/orders`, {
            headers : {
                token : userToken
            }
        })
        expect(res.status).toBe(200)
    })

    test("user can't get orders without token", async () => {
        const res = await axios.get(`${BACKEND_URL}/user/orders`)
        expect(res.status).toBe(400)
    })

    test("user can't get orders with wrong token", async () => {
        const res = await axios.get(`${BACKEND_URL}/user/orders`, {
            headers : {
                token : "dsfsdfsf"
            }
        })
        expect(res.status).toBe(400)
    })
})