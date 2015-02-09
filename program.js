var http = require('http');
var bookData = '';

http.get("http://metadata.helmet-kirjasto.fi/search/author.json?query=Campbell", function(res) {
  console.log("Got response: " + res.statusCode);
   console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    // console.log('BODY: ' + chunk);
	bookData += chunk;
  });
}).on('error', function(e) {
  console.log("Got error: " + e.message);
});

http.createServer(function (req, res) {
  var bookList = '';
  JSON.parse(bookData).records.forEach(function (book) {
    bookList += book.year + " " + book.title + '\n';
  })	
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Book list\n' + bookList);
  console.log('Books\n' + bookList);
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');
