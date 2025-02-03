import server from "./server";
import PresentationRouter from "./presentation/routers/presentation-router";
import { GetAllPresentation } from "./domain/use-cases/presentation/get-all-presentation";
import { PresentationRepositoryImpl } from "./domain/repositories/presentation-repository";
import { CreatePresentation } from "./domain/use-cases/presentation/create-presentation";
import { PGPresentationDataSource } from "./data/data-sources/postgresql/pg-presentation-data-source";
import { MongoDBPresentationDataSource } from "./data/data-sources/mongodb/mongodb-presentation-data-source";
import { Pool } from "pg";
import { Multer } from "./domain/services/multer";
import { MongoClient, ObjectId } from "mongodb";
import { NoSQLDatabaseWrapper } from "./data/interfaces/data-sources/nosql-database-wrapper";
import { query } from "express";
import { Presentation } from "@prisma/client";
import { PresentationDataSource } from "./data/interfaces/data-sources/presentation-data-source";

async function getMongoDS(
  dbName: string
): Promise<MongoDBPresentationDataSource> {
  const Mongo_Url: string | undefined = process.env.MONGO_DB_URL;
  const client: MongoClient = new MongoClient(Mongo_Url ? Mongo_Url : "");

  await client.connect();
  const db = client.db(process.env.MONGO_DATABASE_NAME);

  const dbDatabase: NoSQLDatabaseWrapper<any> = {
    find: (query) => db.collection(dbName).find(query).toArray(),
    findOne: (query) => db.collection(dbName).findOne(query),
    insertOne: (doc) => db.collection(dbName).insertOne(doc),
    deleteOne: (id: string) =>
      db.collection(dbName).deleteOne({ _id: new ObjectId(id) }),
    updateOne: (id: string, data: object) =>
      db
        .collection(dbName)
        .updateOne({ _id: new ObjectId(id) }, { $set: data }),
  };

  return new MongoDBPresentationDataSource(dbDatabase);
}

async function getPGDS(): Promise<PGPresentationDataSource> {
  const db = new Pool({
    user: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
  });
  return new PGPresentationDataSource(db);
}

(async () => {
  const dataSource: PGPresentationDataSource = await getPGDS();
  const mongoDataSource: MongoDBPresentationDataSource = await getMongoDS(
    process.env.MONGO_TEST_TABLE ? process.env.MONGO_TEST_TABLE : ""
  );

  const presentationMiddleware = PresentationRouter(
    new GetAllPresentation(new PresentationRepositoryImpl(dataSource)),
    new CreatePresentation(new PresentationRepositoryImpl(dataSource)),
    new Multer()
  );

  const presentationMongoMiddleware = PresentationRouter(
    new GetAllPresentation(new PresentationRepositoryImpl(mongoDataSource)),
    new CreatePresentation(new PresentationRepositoryImpl(mongoDataSource)),
    new Multer()
  );

  server.get("/", (req, res) => {
    res.send("Hello world");
  });

  server.use("/mongoPresentation", presentationMongoMiddleware);
  server.use("/presentation", presentationMiddleware);

  server.listen(4000, () => console.log("Running on http://localhost:4000"));
})();
