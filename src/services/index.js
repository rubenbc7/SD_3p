import express from "express";
import bodyParser from "body-parser";
import Blockchain from "../blockchain/blockchain";
import { restart } from "nodemon";

const {HTTP_PORT = 3000} = process.env;

const app = express();

const blockchain = new Blockchain();

app.use(bodyParser.json());

app.get('/blocks', (req, res) =>{
    res.json(blockchain.blocks);
});

app.post('/mine', (req, res) =>{
    const {body: { data } } = req;
    const block = blockchain.addBlock(data);

    res.json({
        blocks: blockchain.blocks.length,
        block,
    });
});

app.listen(HTTP_PORT, () => {
    console.log(`service HTTP: ${HTTP_PORT} listening...`);
});

