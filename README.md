https://www.npmjs.com/package/debug

powershell:
$env:DEBUG='shibanga'; node shibanga.js
or 
$env:DEBUG='shibanga'; node shibanga.js 2>&1 > log.log

Powershell output streams:
1 Success
2 Error

Powershell redirection operators:
n> filename // write stream to a file
n>> filename // append stream to a file
n>&1 > filename // redirect stream to success stream and write success stream to a file

So 2>&1 redirects stderr to stdout

The good frameworks will give you a way to hook up logging middleware (say, debug in koa), but you might not get all the details sent to it.

Don't write a middleware function for logging like this:
const app = express();
app.use(function(req, res, next) {
console.log(req.url)
next()
}

Write your own logging module, then use it like this:
const app = express();
const errorLoggingMiddleware = require('my-error-logging-middleware')
app.use(errorLoggingMiddleware)
