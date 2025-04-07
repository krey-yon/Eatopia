import express from "express"
import cors from "cors"
import mainRouter from "./routes";
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1",mainRouter);

app.listen(5000, () => {
    console.log("server running on port 5000.")
})