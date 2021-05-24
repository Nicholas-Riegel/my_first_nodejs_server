const http = require('http')
const urlmod = require('url')
const fs = require('fs')

const serverCallback = (req, res) => {
    
    const address = urlmod.parse(req.url, true)
    const filename = '.' + address.pathname

    if (filename === '.' || filename === './') {
        fs.readFile('./index.html', (err, data) => {
            if (!err) {
                res.writeHead(302, { 'Content-type': 'text/html', 'Location':'/index.html' })
                return res.end(data)
            }
            fs.readFile('./404.html', (err, data) => {
                res.writeHead(404, { 'Content-type': 'text/html', 'Location':'/404.html' })
                return res.end(data)
            })
        })
    } else {
        fs.readFile(filename, (err, data) => {
            if (!err) {
                res.writeHead(200, { 'Content-type': 'text/html' })
                return res.end(data)
            }
            fs.readFile('./404.html', (err, data) => {
                res.writeHead(404, { 'Content-type': 'text/html', 'Location':'/404.html' })
                return res.end(data)
            })
        })
    }
}

http.createServer(serverCallback).listen(8080)