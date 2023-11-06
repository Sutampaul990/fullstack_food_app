/* eslint-disable linebreak-style */
/* eslint-disable no-trailing-spaces */
/* eslint-disable padded-blocks */
/* eslint-disable comma-dangle */
/* eslint-disable indent */
/* eslint-disable no-empty */
/* eslint-disable brace-style */
/* eslint-disable space-before-blocks */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
/* eslint-disable keyword-spacing */
/* eslint-disable key-spacing */
/* eslint-disable linebreak-style */
/* eslint-disable new-cap */

const router = require("express").Router();
const admin = require("firebase-admin");
const db = admin.firestore();
db.settings({ ignoreUndefinedProperties : true});

router.post("/create", async (req,res) => {
    try{
        const id = Date.now();
        const data = {
            productId: id,
            product_name: req.body.product_name,
            product_category: req.body.product_category,
            product_price: req.body.product_price,
            image_url: req.body.image_url,
        };

        const response = await db.collection("products").doc(`/${id}/`).set(data);
        return res.status(200).send({ success : true , data : response});
    }
    catch(err){
        return res.send({ success : false , msg : `Error : ${err}`});
    }
})

// getall the products
router.get("/all", async (req, res) => {
    (async () => {
      try {
        let query = db.collection("products");
        let response = [];
        await query.get().then((querysnap) => {
          let docs = querysnap.docs;
          docs.map((doc) => {
            response.push({ ...doc.data() });
          });
          return response;
        });
        return res.status(200).send({ success: true, data: response });
      } catch (err) {
        return res.send({ success: false, msg: `Error :${err}` });
      }
    })();
  });

module.exports = router;