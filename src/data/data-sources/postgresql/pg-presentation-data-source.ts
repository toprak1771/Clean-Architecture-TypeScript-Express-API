import { PresentationRequestModel,Presentation } from "../../../domain/entities/presentation";
import { PresentationDataSource } from "../../interfaces/data-sources/presentation-data-source";
import { SQLDatabaseWrapper } from "../../interfaces/data-sources/sql-database-wrapper";

const DB_TABLE = "Presentation";

export class PGPresentationDataSource implements PresentationDataSource {
    private db:SQLDatabaseWrapper;

    constructor (db:SQLDatabaseWrapper) {
        this.db = db;
    }

    async create(presentation: PresentationRequestModel) {
        console.log(DB_TABLE)
        await this.db.query(`insert into "${DB_TABLE}" (name) values ($1)`,[presentation.name])
    }
    async getAll(): Promise<Presentation[]> {
        const dbResponse = await this.db.query(`select * from ${DB_TABLE}`);
        const result = dbResponse.rows.map(item => ({
            id:item.id,
            name:item.name
        }));

        return result;
    }
    async deleteOne(id: String) {
        await this.db.query(`delete ${DB_TABLE} where id = $1`,[id])
    }
    async updateOne(id: String, data: PresentationRequestModel) {
        await this.db.query(`update ${DB_TABLE} set name = $1 where id=$2`,[data.name,id])
    }
    async getOne(id: String): Promise<Presentation | null> {
        const dbResponse = await this.db.query(`select * from ${DB_TABLE} where id = $1 limit 1`,[id]);
        const result = dbResponse.rows.map(item => ({
            id:item.id,
            name:item.name
        }));

        return result[0];
    }
    
}