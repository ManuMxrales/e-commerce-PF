const { Router } = require("express");
const { APP_USR, FRONTEND_URL } = process.env;
const axios = require("axios");
const router = Router();
const { Usuario, Pedido } = require("../../../db");

const mercadopago = require("mercadopago");

mercadopago.configure({
  access_token: APP_USR,
});

router.get("/", async (req, res) => {
  const merchant_order_id = req.query.merchant_order_id;
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${APP_USR}`,
    },
  };
  let urlmerchant = `https://api.mercadolibre.com/merchant_orders/${merchant_order_id}`;

  try {
    const peticion = await axios.get(urlmerchant, config);
    let datos = peticion.data;
    const { payments, items, shipments, payer, preference_id } = datos;
    let [pedido, create] = await Pedido.findOrCreate({
      where: {
        preference_id: preference_id,
      },
      defaults: {
        preference_id: preference_id,
        payments: payments,
        items: items,
        shipments: shipments,
        payer: payer,
      },
      include: Usuario,
    });

    let preferencia = await axios.get(
      `https://api.mercadopago.com/checkout/preferences/${preference_id}`,
      config
    );

    meta = preferencia.data;
    let user = await Usuario.findByPk(meta.metadata.id);

    user.addPedido(pedido.id);

    console.log("LLEGUE HASTA ACA!");
    return res.redirect(`${FRONTEND_URL}`);
  } catch (err) {
    console.log(err);
  }
});

router.post("/", async (req, res) => {
  const { resource, topic } = req.body;
  if (!resource && topic !== "merchant_orders") {
    console.log(topic);
    return res.send("no es una merchant order");
  }
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${APP_USR}`,
    },
  };

  try {
    const peticion = await axios.get(resource, config);
    let datos = peticion.data;
    const { payments, items, shipments, payer, preference_id } = datos;
    let [pedido, create] = await Pedido.findOrCreate({
      where: {
        preference_id: preference_id,
      },
      defaults: {
        preference_id: preference_id,
        payments: payments,
        items: items,
        shipments: shipments,
        payer: payer,
      },
      include: Usuario,
    });

    let preferencia = await axios.get(
      `https://api.mercadopago.com/checkout/preferences/${preference_id}`,
      config
    );

    meta = preferencia.data;
    let user = await Usuario.findByPk(meta.metadata.id);

    user.addPedido(pedido.id);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
