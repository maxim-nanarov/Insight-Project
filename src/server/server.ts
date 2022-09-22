import path from "path";
import express, { Express } from "express";
import cors from "cors";
import { json } from "body-parser";
import cheerio from "cheerio";
import Data from "./myDesierdData";
import * as chrono from "chrono-node";

const { MongoClient, ServerApiVersion } = require("mongodb");

const uri =
  "mongodb+srv://maxim:GoGoPowerRangers@cluster0.cvklg7s.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
client.connect();

const axios = require("axios");

const app: Express = express();
app.use(cors());
app.use(json());
const root: string = path.join(process.cwd(), "./src/server");

app.use(express.static(root));

app.get("/data", (_req) => {
  axios({
    url: "http://paste2vljvhmwq5zy33re2hzu4fisgqsohufgbljqomib2brzx3q4mid.onion/lists",
    proxy: {
      host: "localhost",
      port: 8118,
    },
  })
    .then((res: any) => {
      const HTML = res.data;
      const $ = cheerio.load(HTML);
      let Data: Data[] = [];

      $(".first").each(async (_i, element) => {
        const pasteId = $(element).children("a").attr("href")?.split("/")[4];

        let new_Data = { title: "", content: "", date: "", author: "" };

        new_Data.title = $(element).text();
        $(element)
          .siblings("td")
          .each((index, e) => {
            if (index === 0) {
              new_Data.author = $(e).text();
            }
            if (index === 2) {
              new_Data.date = chrono
                .parseDate($(e).text())
                .toUTCString()
                .replace(`'`, ``);
            }
          });
        let waiter = await axios({
          url: `http://paste2vljvhmwq5zy33re2hzu4fisgqsohufgbljqomib2brzx3q4mid.onion/view/raw/${pasteId}`,
          proxy: {
            host: "localhost",
            port: 8118,
          },
        });

        new_Data.content = waiter.data;
        Data.push(new_Data);
        if (Data.length === 50) {
          const collection = client.db("DarkWebSite").collection("Blogs");
          collection.drop();
          collection.insertMany(Data);
        }
      });
    })
    .catch(console.log);
});

app.get("/GetData", async (_req, res) => {
  const collection = client.db("DarkWebSite").collection("Blogs");
  let Data = await collection.find({}).toArray();

  console.log(Data);
  res.send(Data);
});

const port = process.env.PORT || 4001;
app.listen(port, () => {
  console.log("Hosted: http://localhost:" + port);
});
