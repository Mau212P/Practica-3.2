import clientesDAO from '../dao/clientesDAO.js';

export default class clientesController {
    static async apiGetClientes(req, res, next) {
        const clientesPerPage = req.query.clientesPerPage ? parseInt(req.query.clientesPerPage) : 20;
        const page = req.query.page ? parseInt(req.query.page) : 0;
        const filters = {};
        if (req.query.rated) {
            filters.rated = req.query.rated;
        } else if (req.query.title) {
            filters.title = req.query.title;
        }
        const { clientesList, totalNumClientes } = await clientesDAO.getClientes(
            { filters, page, clientesPerPage },
        );
        const response = {
            clientes: clientesList,
            page,
            filters,
            entries_per_page: clientesPerPage,
            total_results: totalNumClientes,
        };
        res.json(response);
    }
}