export class NoDataFoundException<T = any> extends Error {
  constructor(public readonly entity: T, public readonly id: number) {
    super('Entity not found');
  }
}
