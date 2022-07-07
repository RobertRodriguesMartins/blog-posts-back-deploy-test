import NewsEntity, { News, RawNews } from '../interface/News';
import connection from '../model/db/connection';
import NewsModel from '../model/News';

class NewsService implements NewsEntity<News> {
  private newsModel: NewsModel = new NewsModel(connection);

  private hidrate = <T extends RawNews[] | RawNews>(notice: T): News | News[] => {
    if (Array.isArray(notice)) {
      const hidratedData: News[] = []
      notice.forEach((letter) => {
        const { category_name, ...rest } = letter;
        hidratedData.push({
          ...rest,
          categoryName: category_name
        })
      })

      return hidratedData;
    } 
    return {
      id: notice.id,
      content: notice.content,
      title: notice.title,
      categoryName: notice.category_name
    }
  }

  public create = async (notice: News): Promise<News | void> => {
    return this.newsModel.create(notice);
  }

  public findAll = async (): Promise<News[]> => {
    const rawData = await this.newsModel.findAll()
    const data = this.hidrate<RawNews[]>(rawData)
    return data as News[]
  }

  public exists = async (id: number): Promise<boolean> => {
    return this.newsModel.exists(id);
  }

  public findById = async (id: number): Promise<News> => {
    const rawData = await this.newsModel.findById(id);
    const data = this.hidrate<RawNews>(rawData);
    return data as News;
  }

  public maxOffset = async (): Promise<number> => {
    const rawData = await this.newsModel.maxOffset();
    return rawData;
  }
  public some = async (offset: number): Promise<News[]> => {
    const rawData = await this.newsModel.some(offset);
    const data = this.hidrate<RawNews[]>(rawData);
    return data as News[];
  }
}

export default NewsService;