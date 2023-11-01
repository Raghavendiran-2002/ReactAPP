// const http = require('http');
// const mongoose = require('mongoose')
const cors = require("cors");

const http = require("http");
const url = require("url");
const mongoose = require("mongoose");
// require("dotenv").config({ path: "/api/.env" });

mongoose.connect(`mongodb://root:12345@mongo:27017/`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  writeConcern: {
    w: "majority",
    wtimeout: 0,
  },
});

const Schema = mongoose.Schema;
// const itemSchema = new Schema({
//   name: String,
//   description: String,
//   price: Number
// });
const sensor = new Schema({
  sensorId: String,
  sensorName: String,
  sensorDes: String,
});
const Sensor = mongoose.model("Sensor", sensor);

const server = http.createServer((req, res) => {
  cors()(req, res, () => {
    if (req.method === "GET" && req.url === "/details") {
      const fetchD = async () => {
        try {
          const data = await Sensor.find();
          console.log(data);
          if (data) {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ data }));
          }
        } catch (error) {
          console.error(error);
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "An error occurred" }));
        }
      };

      fetchD();
      // const relevantData = data.map(item => ({
      //   sensorId: item.sensorId,
      //   sensorName: item.sensorName,
      //   sensorDes:item.sensorDes
      // }));
    } else if (req.method === "POST" && req.url === "/data") {
      let data = "";

      req.on("data", (chunk) => {
        data += chunk;
      });

      req.on("end", () => {
        const sensorData = JSON.parse(data);
        console.log(sensorData.data.sensorId);
        const itemData = {
          sensorId: sensorData.data.sensorId,
          sensorName: sensorData.data.sensorName,
          sensorDes: sensorData.data.sensorDes,
        };
        const type = new Sensor(itemData);

        type.save();
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Successfully Added" }));
      });
    } else if (req.method === "POST" && req.url === "/update") {
      let data = "";

      req.on("data", (chunk) => {
        data += chunk;
      });

      req.on("end", () => {
        const sensorData = JSON.parse(data);
        // console.log(sensorData.data.sensorId);
        const itemData = {
          sensorId: sensorData.data.sensorId,
          sensorName: sensorData.data.sensorName,
          sensorDes: sensorData.data.sensorDes,
        };
        const fetchD = async () => {
          // data = await Sensor.find();
          try {
            const deta = await Sensor.findOne({
              sensorId: sensorData.data.sensorId,
            });
            // console.log(deta._id);
            // const updatedItem = Sensor.findByIdAndUpdate(deta._id.toString(), {
            //   sensorDes: "sensorData.data.sensorDes",
            // }, { new: true });
            const result = await Sensor.findByIdAndUpdate(deta._id, itemData);
            // console.log(updatedItem);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Successfully Updated" }));
          } catch (err) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Item not found" }));
          }
        };
        fetchD();
      });
    } else if (req.method === "POST" && req.url === "/delete") {
      let data = "";

      req.on("data", (chunk) => {
        data += chunk;
      });

      req.on("end", () => {
        const sensorData = JSON.parse(data);
        const itemData = {
          sensorId: sensorData.data.sensorId,
          sensorName: sensorData.data.sensorName,
          sensorDes: sensorData.data.sensorDes,
        };
        const fetchD = async () => {
          // data = await Sensor.find();
          const deta = await Sensor.findOne({
            sensorId: sensorData.data.sensorId,
          });
          // console.log(deta._id);
          // const updatedItem = Sensor.findByIdAndUpdate(deta._id.toString(), {
          //   sensorDes: "sensorData.data.sensorDes",
          // }, { new: true });
          const result = await Sensor.findByIdAndDelete(deta._id);
          // console.log(updatedItem);
          if (!result) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Item not found" }));
          } else {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Successfully Deleted" }));
          }
        };
        fetchD();
      });
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Server Not Found!!!" }));
    }
  });
});

const PORT = 3001;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
