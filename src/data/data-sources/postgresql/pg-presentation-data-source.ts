import {
  PresentationRequestModel,
  Presentation,
  uploadResults,
  CreatePresentationObject,
} from "../../../domain/entities/presentation";
import { PresentationDataSource } from "../../interfaces/data-sources/presentation-data-source";
import { SQLDatabaseWrapper } from "../../interfaces/data-sources/sql-database-wrapper";

const DB_TABLE = "Presentation";

export class PGPresentationDataSource implements PresentationDataSource {
  private db: SQLDatabaseWrapper<Presentation>;

  constructor(db: SQLDatabaseWrapper<Presentation>) {
    this.db = db;
  }

  async create(presentation: CreatePresentationObject) {
    try {
      await this.db.query(
        `insert into "${DB_TABLE}" (name,thumbnail_path) values ($1,$2)`,
        [presentation.name, presentation.path]
      );
    } catch (error) {
      console.log(error);
    }
  }
  async getAll(): Promise<Presentation[] | void> {
    try {
      const dbResponse: any = (
        await this.db.query(`select * from "${DB_TABLE}"`)
      ).rows;
      
      const result = dbResponse.map((response: any) => {
        return {
          id: response.id,
          name: response.name,
        };
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  async deleteOne(id: String) {
    try {
      await this.db.query(`delete "${DB_TABLE}" where id = $1`, [id]);
    } catch (error) {
      console.log(error);
    }
  }
  async updateOne(id: String, data: PresentationRequestModel) {
    try {
      await this.db.query(`update "${DB_TABLE}" set name = $1 where id=$2`, [
        data.name,
        id,
      ]);
    } catch (error) {
      console.log(error);
    }
  }
  async getOne(id: String): Promise<Presentation | null> {
    const dbResponse = await this.db.query(
      `select * from "${DB_TABLE}" where id = $1 limit 1`,
      [id]
    );
    const result = dbResponse.rows.map((item) => ({
      id: item.id,
      name: item.name,
    }));

    return result[0];
  }
}
