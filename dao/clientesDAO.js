export default class clientesDAO {
    static clientes;
    static async injectDB(conn) {
        if (clientesDAO.clientes) {
            return;
        }
        try {
            clientesDAO.clientes = await conn.db(process.env.NS)
                .collection('Clientes');
        } catch (e) {
            console.error(`unable to connect in clientesDAO: ${e}`);
        }
    }

    static async getClientes({ // default filter
        filters = null,
        page = 0,
        clientesPerPage = 20, // will only get 20 movies at once
    } = {}) {
        let query;
        if (filters) {
            if ('nombre_completo' in filters) {
                query = { $text: { $search: filters.nombre_completo } };
            } else if ('id_ubicacion' in filters) {
                query = { rated: { $eq: filters.id_ubicacion } };
            }
        }
        let cursor;
        try {
            cursor = await clientesDAO.clientes
                .find(query)
                .limit(clientesPerPage)
                .skip(clientesPerPage * page);
            const clientesList = await cursor.toArray();
            const totalNumClientes = await clientesDAO.clientes.countDocuments(query);
            return { clientesList, totalNumClientes };
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`);
            return { clientesList: [], totalNumClientes: 0 };
        }
    }

}