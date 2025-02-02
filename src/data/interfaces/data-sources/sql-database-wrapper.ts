export interface SQLDatabaseWrapper<T> {
    query(queryString: String, queryConfig?: any[]): Promise<{ rows: T[] }>
}