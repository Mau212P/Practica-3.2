import mongodb from 'mongodb';

export default class pedidosDAO {
    static Pedidos;
    static ObjectId = mongodb.ObjectId;
    
    static async injectDB(conn) {
        if (pedidosDAO.Pedidos) {
            return;
        }
        try {
            pedidosDAO.Pedidos = await conn.db(process.env.NS).collection('Pedidos');
        } catch (e) {
            console.error(`unable to establish connection handle in pedidosDAO: ${e}`);
        }
    }

    static async addPedido(pedidoId, Pedidos, cantidad_producto, total, hora_pedido) {
        try {
            const pedidosDoc = {
                id_pedido: new pedidosDAO.ObjectId(pedidoId),
                id_cliente: new pedidosDAO.ObjectId(Pedidos._id),
                id_restaurante: new pedidosDAO.ObjectId(Pedidos._id),
                id_producto: new pedidosDAO.ObjectId(Pedidos._id),
                id_destino: new pedidosDAO.ObjectId(Pedidos._id),
                cantidad_producto,
                total,
                hora_pedido
            };
            //console.log(pedidosDoc);
            return await pedidosDAO.Pedidos.insertOne(pedidosDoc);
        } catch (e) {
            console.error(`unable to request: ${e}`);
            return { error: e };
        }
    }

    static async updatePedido(pedidoId, clienteId, Pedidos, hora_pedido) {
        try {
            const updateResponse = await pedidosDAO.Pedidos.updateOne(
                { user_id: new pedidosDAO.ObjectId(clienteId), _id: new pedidosDAO.ObjectId(pedidoId) },
                { $set: { Pedidos, hora_pedido } },
            );
            return updateResponse;
        } catch (e) {
            console.error(`unable to update request: ${e}`);
            return { error: e };
        }
    }

    static async deletePedido(pedidoId, clienteId) {
        try {
            const deleteResponse = await pedidosDAO.Pedidos.deleteOne({
                _id: new pedidosDAO.ObjectId(pedidoId),
                user_id: new pedidosDAO.ObjectId(clienteId),
            });
            return deleteResponse;
        } catch (e) {
            console.error(`unable to delete request: ${e}`);
            return { error: e };
        }
    }
}