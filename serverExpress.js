const express = require('express')

// app

const app = express()

// listen on port:

app.listen(8080)

// for css:

app.use(express.static(__dirname));

// GET requests:

app.get('/index.html', (req, res) => {
    res.sendFile('index.html', { root: './' })
})

app.get('/about.html', (req, res) => {
    res.sendFile('about.html', { root: __dirname })
})

app.get('/contact-me.html', (req, res) => {
    res.sendFile('contact-me.html', { root: './' })
})

// redirects

app.get('/', (req, res) => {
    res.status(302).redirect('/index.html')
})

// 404 

app.use((req, res) => {
    res.status(404).sendFile('404.html', { root: './' })
})

// .use must be at the end, otherwise what is below it won't fire. it's like a default in a switch statment. in this case, we have to give the status though.