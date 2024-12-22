import server from "./server";
import PresentationRouter from "./presentation/routers/presentation-router";
import { GetAllPresentation } from "./domain/use-cases/presentation/get-all-presentation";
import { PresentationRepositoryImpl } from "./domain/repositories/presentation-repository";
import { CreatePresentation } from "./domain/use-cases/presentation/create-presentation";
import { PGPresentationDataSource } from "./data/data-sources/postgresql/pg-presentation-data-source";
import { Pool } from "pg";
import { Multer } from "./domain/services/multer";


async function getPGDS() {
    const db = new Pool({
        user:process.env.DB_USERNAME,
        host:process.env.DB_HOST,
        database:process.env.DB_NAME,
        password:process.env.DB_PASSWORD,
        port:Number(process.env.DB_PORT)
    })
    return new PGPresentationDataSource(db);
}

(async () => {
    const dataSource = await getPGDS();

    const presentationMiddleware = PresentationRouter(
        new GetAllPresentation(new PresentationRepositoryImpl(dataSource)),
        new CreatePresentation(new PresentationRepositoryImpl(dataSource)),
        new Multer
    )
     
     server.get('/', (req, res) => {
        res.send("Hello world");
    });

    
    server.use('/presentation', presentationMiddleware);
    
    server.listen(4000,() => console.log("Running on http://localhost:4000"))
})()