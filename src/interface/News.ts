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

export type totalNews = {total: number}

export default interface NewsEntity<T extends News | RawNews | RawNews[] | totalNews> {
  findAll(params: T): Promise<T | News[] | void>
  create(params: T): Promise<T | void>
}
