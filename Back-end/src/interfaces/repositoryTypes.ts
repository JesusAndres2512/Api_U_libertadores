export interface Repository<T = unknown>{
    create(data: T):Promise<T>
    find():Promise<T[]>
    findById(dataId?: number):Promise<T | null>
    update(dataId: number, updateData: Partial<T>):Promise<T | null>
    delete(dataId: number):Promise<boolean | null>
}