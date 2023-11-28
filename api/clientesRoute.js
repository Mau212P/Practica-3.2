import clientesController from "./clientesController.js";
import ReviewsController from './pedidosController.js';

export default class MoviesRoute {
	static configRoutes(router) {
		router.route('/').get(MoviesController.apiGetMovies);
		router
			.route('/review')
			.post( ReviewsController.apiPostReview)
			.put(ReviewsController.apiUpdateReview)
			.delete(ReviewsController.apiDeleteReview);
		return router;
	}
}