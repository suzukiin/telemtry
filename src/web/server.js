const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');
const routes = require('./routes/routes');
const app = express();

app.engine('handlebars', hbs.engine({
    partialsDir: path.join(__dirname, 'views', 'partials'),
    helpers: {
        eq: (a, b) => a === b,
        lowercase: str => (str || '').toLowerCase()
    }
}));
app.set('view engine', 'handlebars');
app.set('views', './src/web/views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/', routes);

function start() {
    app.listen(8080, () => {
        console.log('Server is running on port 8080');
    });
}

module.exports = {
    start
};