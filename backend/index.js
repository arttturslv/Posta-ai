//add type to package.json to make possible the use of "import" instead of "require".
import {PORT, mongoDBURL} from "./config.js";
import { PostIt } from "./models/postItModel.js";
import cors from "cors";
import mongoose from "mongoose";
import express, { response } from "express";
const app = express();

app.use(express.json());

app.use(cors())

app.post("/post", async (req, res) => {
    try {

        if(!req.body.note && !req.body.image) {
            return res.status(405).send({message: 'A requisição não possui imagem e nem mensagem.'})
        }

        const newPostIt = {
            note: req.body.note,
            author: req.body.author,
            image: req.body.image
        };
        const post = await PostIt.create(newPostIt);

        return res.status(201).send(post);

    } catch (err) {
        console.error("Erro ao processar solicitação POST:", err);
        res.status(500).send({ message: "Ocorreu um erro durante o processamento da solicitação." });
    }
})

app.get("/:lastPostID", async(req, res) => {
    try {
        const {lastPostID} = req.params; //Recebe o ultimo post
        const reqQuantity = 50; //Quantos são enviados por requisição
        var posts;

        if(lastPostID=='null') {
          posts = await PostIt.find({}).limit(reqQuantity).sort({'_id': -1});
        } else {
          posts = await PostIt.find({}).limit(reqQuantity).sort({'_id': -1}).where('_id').lt(lastPostID);
        }

        if(posts.length != 0) {
            return res.status(200).json({
                data:posts
            });
        } else {
            res.status(204).send({message: "Limite atingido"});
        }

   
    } catch (err) {
        res.status(500).send({message: err.message});
    }
})

mongoose.connect(mongoDBURL)
    .then(() =>
        app.listen(PORT, () => {
            console.log("Server is on 🔥")
        })
    ).catch((err)=> {
        console.log(err);
    });

app.get('/', (req, res) => {
    console.log(req);
    const mensagem = 'Você não queria ir para: <a href="https://posta-ai.vercel.app/">https://posta-ai.vercel.app/</a>?';
    res.status(201).send(mensagem);});

export default app;
