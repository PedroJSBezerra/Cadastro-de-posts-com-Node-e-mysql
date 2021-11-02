const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const bodyParser = require ('body-parser')
const Post = require('./models/Post')
const port = 3005

// Config
// Template engine
app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

//body-parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//rotas
app.get('/', function(req,res){
  Post.findAll({order:[['id', 'DESC']]}).then(function(posts){
    res.render('home', {posts: posts})
  })
})

app.get('/cad', (req, res) => {
  res.render('formulario')
})

app.post('/add', (req, res) => {
  Post.create({
    titulo: req.body.titulo,
    conteudo: req.body.conteudo
  }).then(() => {
    res.redirect('/')
  }).catch((error) => {
    res.send('Houve um erro: '+error)
  })
})

app.get('/deletar/:id', (req, res) => {
  Post.destroy({where: {'id': req.params.id}}).then(() =>{
    res.send("Postagem deletada com sucesso!")
  }).catch((error) => {
    res.send("Esta postagem não existe: "+ error)
  })
})

app.listen(port, () => {
  console.log(`Server rodando na porta ${port}`)
})