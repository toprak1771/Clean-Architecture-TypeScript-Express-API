import server from "./server";
import PresentationRouter from "./presentation/routers/presentation-router";
import { GetAllPresentation } from "./domain/use-cases/presentation/get-all-presentation";
import { PresentationRepositoryImpl } from "./domain/repositories/presentation-repository";
import { CreatePresentation } from "./domain/use-cases/presentation/create-presentation";
import { PGPresentationDataSource } from "./data/data-sources/postgresql/pg-presentation-data-source";
import { Pool } from "pg";


async function getPGDS() {
    
    const db = new Pool({
        user:'postgres',
        host:'localhost',
        database:'PRESENTATİONSDB',
        port:5432
    })
    return new PGPresentationDataSource(db);
}

(async () => {
    const dataSource = await getPGDS();

    const presentationMiddleware = PresentationRouter(
        new GetAllPresentation(new PresentationRepositoryImpl(dataSource)),
        new CreatePresentation(new PresentationRepositoryImpl(dataSource)),
    )

    server.use('/presentation',presentationMiddleware)
    server.listen(4000,() => console.log("Running on http://localhost:4000"))
})()