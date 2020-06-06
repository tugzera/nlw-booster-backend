import cors from "cors";
import express from "express";
import path from "path";

const app = express();
import routes from "./routes";

// HABILITA O EXPRESS A ENTENDER JSON NAS REQUESTS
app.use(cors());
app.use(express.json());
app.use(routes);

app.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")));

app.listen(3333);
