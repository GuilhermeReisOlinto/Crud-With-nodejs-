const express = require('express')
const app = express();
const PORT = process.env.PORT || 3000
const hbs = require('express-handlebars')
const bodyParser = require('body-parser')
const session = require('express-session')

//configuração de handlebars
app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout: 'main'
}));
app.set('view engine', 'hbs');
//conf para func static 
app.use(express.static('public'));
//conf para func body
app.use(bodyParser.urlencoded({ extended: false }));
//conf das sessions 
app.use(session({
    secret: 'kjfdhaiodfjiIKJid414',
    resave: false,
    saveUninitialized: true
}))

app.get('/', (req, res) => {
    if (req.session.errors) {
        var arrayErros = req.session.errors;
        req.session.errors = "";
        return res.render('index', { NavActiveCad: true, error: arrayErros })
    }

    if (req.session.sucess) {
        req.session.sucess = false;
        return res.render('index', { NavActiveCad: true, MsgSucess: true })
    }

    res.render('index', { NavActiveCad: true })
})
app.get('/users', (req, res) => {
    res.render('users', { NavActiveUsers: true })
})

app.get('/editar', (req, res) => {
    res.render('editar')
})

//rota que tem poder de manipular e tratar os dados de entrada 
app.post('/cad', (req, res) => {
    //res.send(req.body)
    const erros = []
    let nome = req.body.nome;
    let email = req.body.email;
    nome = nome.trim();
    email = email.trim();
    // validação com regex javascript
    nome = nome.replace(/[^A-zÀ-ú\s]/gi, '');

    if (nome == '' || typeof nome == undefined || nome == null) {
        erros.push({ mensagem: "Campo nome não pode ser vazio" })
    }
    if (email == '' || typeof email == undefined || email == null) {
        erros.push({ mensagem: "Campo e-mail não pode ser vazio" })
    }
    //verifica se o nome é valido e email
    if (!/^[A-Za-záàâãéèíóôõúçñÀÁÃÂÈÉÍÌòÒÔÕÚCÑ\s]+$/.test(nome)) { erros.push({ mensagem: "Nome Inválido!" }) };
    if (!/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i.test(email)) { erros.push({ mensagem: "Email Inválido!" }) };
    console.log(email)
    if (erros.length > 0) {
        req.session.errors = erros;
        req.session.sucess = false;
        return res.redirect('/');
    }

    //sucess there is not error 
    req.session.sucess = true;
    return res.redirect('/');
})

app.listen(PORT, () => {
    console.log('server starting')
})