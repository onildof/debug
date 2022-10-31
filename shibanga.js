var debug = require('debug')
var sonic = debug('sonic*') // this namespace can never be disabled because of asterisk
/* debug é uma função que recebe um namespace (vc bota o que quiser)
e retorna outra função que receberá a string que você quiser e a decorará

pra rodar no powershell: 
primeiro sete a variável de ambuente DEBUG igual ao namespace que criamos no nosso código, para habilitá-lo
$env:DEBUG=shibanga; node shibanga.js
*/

// BUILT-IN FORMATTERS: printf-style, just the conversion specifier, and not all of them.

var debugShibanga = debug('shibanga')
var obj = {
  a: 1,
  b: true,
  c: 'sweet',
  d: {
    name: 'Beeg',
    surname: 'the Cat',
  },
  e: function ee() {
    return 10
  },
}
obj.circ = obj
//debug aceita formatação
//literal %
debugShibanga('%%')
//integer or float
debugShibanga('%d', 10)
debugShibanga('%d', 9.95)
//regular string
debugShibanga('%s', 'huayra')
//pretty-print object in a single line
debugShibanga('%o', obj)
//pretty-print object in multiple lines
debugShibanga('%O', obj)
//json with circular reference
debugShibanga('%j', obj)
//json without circular reference
delete obj.circ
debugShibanga('%j', obj)
debugShibanga('%O', obj)

// CUSTOM FORMATTERS
debug.formatters.h = (value) => value.toString(16)
debug.formatters.b = (value) => value.toString(2)
debugShibanga('%h', 15)
debugShibanga('%b', 15)

// EXTEND (just a convenience)
const auth = require('debug')('auth')
const authSign = auth.extend('sign')
const authLogin = auth.extend('login')
const authLogout = require('debug')('auth:logout') //no difference

// $env:DEBUG='shibanga,auth*'; node shibanga.js
authSign('eggman')
authLogin('masterplan')
authLogout('thatsme')

// ENABLE/DISABLE a namespace programatically
debug.disable() //disables all namespaces
sonic('sonikku')
debug.enable('auth:sign,auth')
authSign('knuckles')
auth('more')
authLogin('emeralds')
console.log(debug.enabled('auth'), auth.enabled)
console.log(debug.enabled('auth:sign'), authSign.enabled)
console.log(debug.enabled('auth:login'), authLogin.enabled)
console.log(debug.enabled('auth:logout'), authLogout.enabled)
// if you want to disable all debugging temporarily, the disable method returns a string with all enabled namespaces
const enabledNamespaces = debug.disable()
console.log(enabledNamespaces)
debug.enable(enabledNamespaces)
auth('go')

// Other environment variables
// $env:DEBUG='shibanga,auth*';$env:DEBUG_SHOW_HIDDEN="true";$env:DEBUG_DEPTH="0";node shibanga.js

// Debug exclude namespaces (just prepend with a -)
// $env:DEBUG='*,-auth*'; node shibanga.js
debugShibanga('shiba')
auth('inu')
sonic('sonikku')
