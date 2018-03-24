const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partial')
app.set('view engine', 'hbs');

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.use((req, res, next) => {
    var log = `${new Date().toString()} and request : ${req.method} : ${req.url}`
    fs.appendFile('server.log',log+'\n',(err) => {
        if(err){
            console.log('Unable to append to server.log');
        }
    })
    next();
});//middleware(use) executes in order

/*app.use((req, res, next) => {
    res.render('maintenance.hbs')
});//this will not allow to to run further code because we don't have next in this middleware it will return maintenance.hbs to client*/

app.use(express.static(__dirname + '/public')); //http://localhost:3000/help.html (static server).

app.get('/',(req, res) => {
    res.render('main.hbs',{
        about : 'Main page',
        welcomeText : 'welcome Man'
    });
});

app.get('/about',(req, res) => {
    res.render('about.hbs',{
        about : 'About page'
        //year : new Date().getFullYear()
    });
});

app.get('/project',(req, res) => {
    res.render('about.hbs',{
        about : 'Project page'
    });
});

app.get('/bad',(req, res) => {
    res.send({
        statusCode : '404',
        description : 'Bad request'
    })
});


app.listen(port,() => {
    console.log('Server started on port 3000');
});

console.log('end');