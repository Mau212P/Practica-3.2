import clientesDAO from '../dao/clientesDAO.js';

export default class clientesController {
    static async apiGetMovies(req, res, next) {
        const moviesPerPage = req.query.clientesPerPage ? parseInt(req.query.clientesPerPage) : 20;
        const page = req.query.page ? parseInt(req.query.page) : 0;
        const filters = {};
        if (req.query.rated) {
            filters.rated = req.query.rated;
        } else if (req.query.title) {
            filters.title = req.query.title;
        }
        const { moviesList, totalNumClientes } = await clientesDAO.getClientes(
            { filters, page, moviesPerPage },
        );
        const response = {
            clientes: moviesList,
            page,
            filters,
            entries_per_page: clientesmoviesPerPage,
            total_results: totalNumClientes,
        };
        res.json(response);
    }
}