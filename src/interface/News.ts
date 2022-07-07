export interface News {
  id?: number,
  title: string,
  content: string,
  categoryName: string
}

export interface RawNews {
  id: number,
  title: string,
  content: string,
  category_name: string
}

export default interface NewsEntity<T extends News | RawNews | RawNews[]> {
  findAll(params: T): Promise<T | News[] | void>
  create(params: T): Promise<T | void>
}
