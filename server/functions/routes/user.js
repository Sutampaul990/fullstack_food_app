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


router.get("/", (req, res) => {
  return res.send("Inside the user Router");
});

router.get("/jwtVerification", async (req, res) =>{
  if(!req.headers.authorization) {
    return res.status(500).send({msg : "Token not Found"});
  }

  const token = req.headers.authorization.split(" ")[1];
  try{
    const decodedValue = await admin.auth().verifyIdToken(token);
    if(!decodedValue){
        return res
        .status(500)
        .json({success : false, msg : "Unauthorized Access"});
    }
    return res.status(200).json({success : true, data : decodedValue});
  }
  catch(err){
    return res.send({
        success : false,
        msg : `Error in Extracting the token : ${err}`,
    });
  }
  
  
});

module.exports = router;
