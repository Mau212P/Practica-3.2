import pedidosDAO from '../dao/pedidosDAO.js';

export default class pedidosController {
    static async apiPostPedido(req, res, next) {
        try {
            const pedidoId = req.body.pedido_id;
            const { pedido } = req.text;
            const userInfo = {
                name: req.body.name,
                id_pedido: req.body.pedidoId,
            };
            const date = new Date();
            const pedidosResponse = await pedidosDAO.addPedido(
                id_pedido,
                id_cliente,
                id_restaurante,
                id_producto,
                id_destino,
                cantidad_producto,
                total,
                hora_pedido
            );
            res.json({ status: 'success ' });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
    static async apiUpdatePedido(req, res, next) {
        try {
            console.log(req.body);
            const pedidoId = req.body.pedido_id;
            const { Pedidos } = req.body;
            const date = new Date();
            const pedidosResponse = await pedidosDAO.updatePedido(
                pedidoId,
                req.body.user_id,
                pedido,
                date,
            );
            const { error } = pedidosResponse;
            if (error) {
                res.status.json({ error });
            }
            if (pedidosResponse.modifiedCount === 0) {
                throw new Error('unable to update review. User may not be original poster');
            }
            res.json({ status: 'success ' });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async apiDeletePedido(req, res, next) {
        try {
        const reviewId = req.body.review_id;
        const userId = req.body.user_id;
        console.log('apiDeletePedido', req.body);
        const pedidosResponse = await pedidosDAO.deletePedido(
        reviewId,
        userId,
        );
        res.json({ status: 'success ' });
        } catch (e) {
        res.status(500).json({ error: e.message });
        }
        }
}