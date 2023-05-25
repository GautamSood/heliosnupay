import express from "express";
import Cors from "cors";
import axios from "axios";
import bodyParser from "body-parser";



const myapp = express();

myapp.use(Cors());
myapp.use(express.json());

myapp.get('/',(req,res)=>{
  res.json({'Message': 'we are working'});
});



myapp.post("/getrecords", async (req, res) => {
  try {

    const zohoAccess= await axios.post(
      "https://accounts.zoho.com/oauth/v2/token?",
      { data: {} },
      {
        params: {
          refresh_token:
            "1000.b53bccf1812a13aa8bc563dbf27effce.1bff43a93f8ea8cbe0973daef2cb50e4",
          client_id: "1000.4M4ESD0RK0Z2TVP78PDAVC9VOC1BTP",
          client_secret: "15111764820e05d07ae0b6e9b724ec6fc44f48aa8b",
          grant_type: "refresh_token",
        },
      }
    );
   
   
    // Access TOken
    const Access = zohoAccess.data.access_token;
    console.log(Access);
    // console.log(zohoAccess.data);

      const data = req.body;

     await axios
       .post(
         "https://www.zohoapis.com/crm/v2/PL",
         data,
         {
           headers: {
             Authorization: "Bearer " + Access,
           },
         }
         // { headers: { Authorization: "Bearer " + zohoAccess.data.access_token } }
       )
       .then((res) => console.log(res.data))
       .catch((err) => {
         res.status(500).json(err);
       });

    
  
    res.status(200).json({"message":"done"})
  } catch (error) {
    res.json({ error: error.message });
  }
});
myapp.listen(4000, () => {
  console.log("serverUp and Running");
});

export default myapp;

