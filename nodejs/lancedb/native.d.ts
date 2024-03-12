/* tslint:disable */
/* eslint-disable */

/* auto-generated by NAPI-RS */

/**
 *  A definition of a column alteration. The alteration changes the column at
 * `path` to have the new name `name`, to be nullable if `nullable` is true,
 * and to have the data type `data_type`. At least one of `rename` or `nullable`
 * must be provided.
 */
export interface ColumnAlteration {
  /**
   * The path to the column to alter. This is a dot-separated path to the column.
   * If it is a top-level column then it is just the name of the column. If it is
   * a nested column then it is the path to the column, e.g. "a.b.c" for a column
   * `c` nested inside a column `b` nested inside a column `a`.
   */
  path: string
  /**
   * The new name of the column. If not provided then the name will not be changed.
   * This must be distinct from the names of all other columns in the table.
   */
  rename?: string
  /** Set the new nullability. Note that a nullable column cannot be made non-nullable. */
  nullable?: boolean
}
/** A definition of a new column to add to a table. */
export interface AddColumnsSql {
  /** The name of the new column. */
  name: string
  /**
   * The values to populate the new column with, as a SQL expression.
   * The expression can reference other columns in the table.
   */
  valueSql: string
}
export interface ConnectionOptions {
  apiKey?: string
  hostOverride?: string
  /**
   * (For LanceDB OSS only): The interval, in seconds, at which to check for
   * updates to the table from other processes. If None, then consistency is not
   * checked. For performance reasons, this is the default. For strong
   * consistency, set this to zero seconds. Then every read will check for
   * updates from other processes. As a compromise, you can set this to a
   * non-zero value for eventual consistency. If more than that interval
   * has passed since the last check, then the table will be checked for updates.
   * Note: this consistency only applies to read operations. Write operations are
   * always consistent.
   */
  readConsistencyInterval?: number
}
/** Write mode for writing a table. */
export const enum WriteMode {
  Create = 'Create',
  Append = 'Append',
  Overwrite = 'Overwrite'
}
/** Write options when creating a Table. */
export interface WriteOptions {
  mode?: WriteMode
}
export function connect(uri: string, options: ConnectionOptions): Promise<Connection>
export class Connection {
  /** Create a new Connection instance from the given URI. */
  static new(uri: string, options: ConnectionOptions): Promise<Connection>
  display(): string
  isOpen(): boolean
  close(): void
  /** List all tables in the dataset. */
  tableNames(startAfter?: string | undefined | null, limit?: number | undefined | null): Promise<Array<string>>
  /**
   * Create table from a Apache Arrow IPC (file) buffer.
   *
   * Parameters:
   * - name: The name of the table.
   * - buf: The buffer containing the IPC file.
   *
   */
  createTable(name: string, buf: Buffer, mode: string): Promise<Table>
  createEmptyTable(name: string, schemaBuf: Buffer, mode: string): Promise<Table>
  openTable(name: string): Promise<Table>
  /** Drop table with the name. Or raise an error if the table does not exist. */
  dropTable(name: string): Promise<void>
}
export class Index {
  static ivfPq(distanceType?: string | undefined | null, numPartitions?: number | undefined | null, numSubVectors?: number | undefined | null, maxIterations?: number | undefined | null, sampleRate?: number | undefined | null): Index
  static btree(): Index
}
/** Typescript-style Async Iterator over RecordBatches  */
export class RecordBatchIterator {
  next(): Promise<Buffer | null>
}
export class Query {
  column(column: string): void
  filter(filter: string): void
  select(columns: Array<string>): void
  limit(limit: number): void
  prefilter(prefilter: boolean): void
  nearestTo(vector: Float32Array): void
  refineFactor(refineFactor: number): void
  nprobes(nprobe: number): void
  executeStream(): Promise<RecordBatchIterator>
}
export class Table {
  display(): string
  isOpen(): boolean
  close(): void
  /** Return Schema as empty Arrow IPC file. */
  schema(): Promise<Buffer>
  add(buf: Buffer, mode: string): Promise<void>
  countRows(filter?: string | undefined | null): Promise<number>
  delete(predicate: string): Promise<void>
  createIndex(index: Index | undefined | null, column: string, replace?: boolean | undefined | null): Promise<void>
  update(onlyIf: string | undefined | null, columns: Array<[string, string]>): Promise<void>
  query(): Query
  addColumns(transforms: Array<AddColumnsSql>): Promise<void>
  alterColumns(alterations: Array<ColumnAlteration>): Promise<void>
  dropColumns(columns: Array<string>): Promise<void>
  version(): Promise<number>
  checkout(version: number): Promise<void>
  checkoutLatest(): Promise<void>
  restore(): Promise<void>
}