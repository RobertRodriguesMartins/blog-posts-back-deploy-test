import { Pool } from "mysql2/promise";
import NewsEntity, { News, RawNews } from "../interface/News";
import { RowDataPacket } from "mysql2";

class NewsModel implements NewsEntity<News | RawNews | RawNews[]> {
  constructor(private db: Pool) {}

  private findCategory = async (category: string): Promise<RowDataPacket[]> => {
    const query = "SELECT name FROM devMedia.category WHERE name = ?";
    const [res] = await this.db.execute<RowDataPacket[]>(query, [category]);

    return res;
  };

  public create = async (notice: News): Promise<News | void> => {
    const { title, content, categoryName } = notice;
    const query1 = `INSERT INTO category(name) VALUES (?);`;
    const query2 = `
      INSERT INTO news(title, content, category_name)
      VALUES (?, ?, ?);`;
    const categoryFound = await this.findCategory(categoryName);

    try {
      if (categoryFound.length < 1)
        await this.db.execute(query1, [categoryName]);

      await this.db.execute(query2, [title, content, categoryName]);
      return;
    } catch (e) {
      throw new Error("something wrong happened");
    }
  };
  public findAll = async (): Promise<RawNews[]> => {
    const query = "SELECT * FROM devMedia.news ORDER BY id DESC;";
    const [data] = await this.db.execute<RowDataPacket[]>(query);

    const news = data as RawNews[];
    return news;
  };

  public exists = async (id: number): Promise<boolean> => {
    const query = "SELECT 1 FROM devMedia.news WHERE id = ?";
    const [[item]] = await this.db.query<RowDataPacket[]>(query, [id]);

    if (item) {
      return true;
    }
    return false;
  };

  public findById = async (id: number): Promise<RawNews> => {
    const query = "SELECT * FROM devMedia.news WHERE id = ?";
    const [[item]] = await this.db.query<RowDataPacket[]>(
      { sql: query, rowsAsArray: false },
      [id]
    );
    const response = item as RawNews;
    return response;
  };

  public maxOffset = async (): Promise<number> => {
    const query = "SELECT floor(COUNT(*)/6) AS result FROM devMedia.news;";
    const [[{result}]] = await this.db.query<RowDataPacket[]>(
      { sql: query, rowsAsArray: false }
    );

    return Number(result);
  };
  public some = async (offset: number): Promise<RawNews[]> => {
    const query = "SELECT * FROM devMedia.news LIMIT 6 OFFSET ?";
    const [items] = await this.db.query<RowDataPacket[]>(
      { sql: query, rowsAsArray: false },
      [offset]
    );
    const response = items as RawNews[];
    return response;
  };
}

export default NewsModel;
