const express = require('express')
const app = express();
const PORT = process.env.PORT || 3000
const hbs = require('express-handlebars')

//configuração de handlebars
app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout: 'main'
}));
app.set('view engine', 'hbs');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index', { NavActiveCad: true })
})
app.get('/users', (req, res) => {
    res.render('users', { NavActiveUsers: true })
})

app.listen(PORT, () => {
    console.log('server starting')
})