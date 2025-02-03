export interface NoSQLDatabaseWrapper<T> {
    find(query:object):Promise<T[]>;
    findOne(query:object):Promise<T>;
    insertOne(T:object):void;
    deleteOne(id:String):void;
    updateOne(id:String,data:T):void;
}