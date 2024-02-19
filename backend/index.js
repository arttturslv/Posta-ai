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




app.get("/:postRendered", async(req, res) => {
    try {
        const limitReqPost = 30; //vai ir no maximo 30
        const {postRendered} = req.params; //quantos já foram renderizados
        const renderSkip = parseInt(postRendered);

        const posts = await PostIt.find({}).skip(renderSkip).limit(limitReqPost);

        let sum = renderSkip+limitReqPost;

        return res.status(200).json({
            skipValue: limitReqPost, //para atualizar o valor dos renderizados
            data:posts,
        });
    } catch (err) {
        res.status(500).send({message: err.message});
    }
})

mongoose.connect(mongoDBURL)
    .then(() =>
        app.listen(PORT, () => {
            console.log("Server is on 🔥 - ")
        })
    ).catch((err)=> {
        console.log(err);
    });

app.get('/', (req, res) => {
    console.log(req);
    res.status(201).send('Hello brasil!🏳')
});

export default app;
