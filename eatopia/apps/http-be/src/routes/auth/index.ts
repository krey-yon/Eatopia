import {Router} from "express"
import {prisma} from "@repo/db/client"
const authRouter = Router();

authRouter.post("/signup", async (req, res) => {
    const {name, email, password, role, address} = req.body;

    try {
        const createUser = await prisma.user.create({
            data : {
                name,
                email,
                password,
                role,
                address,
            }
        })
        res.status(201).json({message : "user created"})
    } catch (e) {
        console.log(e);
        res.status(400);
    }
})

export default authRouter