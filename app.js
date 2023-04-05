const express = require('express');
var exphbs  = require('express-handlebars');
const categoriaDAO = require('./repository/CategoriaDAO');
const {Categoria} = require('./model/Categoria');
const res = require('express/lib/response');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(__dirname+'/public'));

// as minhas funcoes viraram isso que ta dentro dos 'get's e dos 'post's
app.engine('hbs', exphbs.engine({defaultLayout: 'main', extname:'.hbs'}));
app.set('view engine', 'hbs');

app.get('/', (req, res)=>{
    res.render('main',{layout:'home'});
});

app.get('/categorias',async (req, res)=>{
    const [categorias] = await categoriaDAO.listarCategorias();
    console.log('Categorias: '+categorias);
    res.render('main',{layout:'categorias/listar', categorias});
})

app.get('/categorias/novo', async(req,res)=>{
    console.log('cadastrar nova categoria');
    res.render('main',{layout:'categorias/form'});
});

app.post('/categorias/cadastrar', async(req,res)=>{
        const categoria = new Categoria();
        categoria.nome = req.body.nome;
        categoria.descricao = req.body.descricao;
        console.log(`Nome: ${categoria.nome} e Descrição: ${categoria.descricao}`);
        categoriaDAO.salvar(categoria);
        res.redirect('/categorias')

})

app.get('/categorias/remover', async(req, res)=>{
    const id = req.query.id; // pegando o id de listar.hbs
    await categoriaDAO.removerCategoria(id) // falta essa funcao em categoriaDAO
    res.redirect('/categorias')
})

app.listen('9000',()=>{
    console.log('Up and Running!');
});