import {
  CreatePresentationObject,
  Presentation,
} from "../../../domain/entities/presentation";
import { NoSQLDatabaseWrapper } from "../../interfaces/data-sources/nosql-database-wrapper";
import { PresentationDataSource } from "../../interfaces/data-sources/presentation-data-source";

const Mongo_Table = "Presentation";

export class MongoDBPresentationDataSource
  implements PresentationDataSource<Presentation>
{
  private db: NoSQLDatabaseWrapper<Presentation>;
  constructor(db: NoSQLDatabaseWrapper<Presentation>) {
    this.db = db;
  }

  async create(presentation: CreatePresentationObject): Promise<void> {
    try {
      await this.db.insertOne(presentation);
    } catch (error) {
      console.log("error:", error);
    }
  }

  async getAll(): Promise<Presentation[] | void> {
    try {
      const result: Presentation[] = await this.db.find({});
      return result;
    } catch (error) {
      console.log("error:", error);
    }
  }

  async deleteOne(id: String): Promise<void> {
    await this.db.deleteOne(id);
  }

  async updateOne(id: String, data: Presentation): Promise<void> {
    await this.db.updateOne(id, data);
  }

  async getOne(id: String): Promise<Presentation | null> {
    const result: Presentation | null = await this.db.findOne({ _id: id });
    return result;
  }
}
