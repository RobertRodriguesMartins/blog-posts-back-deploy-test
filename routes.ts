import { Router} from "express";
import NewsController from "./src/controller/News";

const routes = Router();

const news = new NewsController();

routes.post('/', news.create);
routes.get('/some', news.some);
routes.get('/offset', news.maxOffset);
routes.get('/', news.findAll);
routes.get('/:id', news.findById);

export default routes;
