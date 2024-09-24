const http = require('http')
const { readFileSync } = require('fs')

// PATH
const homePage = readFileSync('./navbar-app/index.html')
const homeStyle = readFileSync('./navbar-app/styles.css')
const homeImage = readFileSync('./navbar-app/logo.svg')
const homeLogic = readFileSync('./navbar-app/browser-app.js')

http.createServer((req, res) => {
  const url = req.url
  // home page
  if (url === '/') {
    res.writeHead(200, { 'content-type': 'text/html' })
    res.write(homePage)
    res.end()
  }
  // About
  else if (url === '/about') {
    res.writeHead(200, { 'content-type': 'text/html' })
    res.write('<h2>This is about page</h2>')
    res.end()
  }
  // Style
  else if (url === '/styles.css') {
    res.writeHead(200, { 'content-type': 'text/css' })
    res.write(homeStyle)
    res.end()
  }
  // Logo
  else if (url === '/logo.svg') {
    res.writeHead(200, { 'content-type': 'image/svg+xml' })
    res.write(homeImage)
    res.end()
  }
  // Logic
  else if (url === '/browser-app.js') {
    res.writeHead(200, { 'content-type': 'text/javascript' })
    res.write(homeLogic)
    res.end()
  }
  // 404
  else {
    res.writeHead(404, { 'content-type': 'text/html' })
    res.write('<h2>Page not found</h2>')
    res.end()
  }
}).listen(5000)