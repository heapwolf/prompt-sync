# SYNOPSIS
A sync prompt for node. very simple. no C++ bindings and no bash scripts.


# BASIC MODE
```js

//
// write some text to the screen.
//
process.stdout.write('How many more times? ')

//
// get input from the user.
//
var n = prompt()

//
// do something dumb with it.
//
process.stdout.write(n + ' is ' + n + 'times too many')
```

# SECRET MODE

```js
console.log('Enter password:');
var password1 = prompt({hidden: true}); // '*' is echoed 
var password2 = prompt({hidden:true, echo: ''}); // there is no echo 
var password3 = prompt({hidden:true, echo: '?'}); // '?' is echoed 
```
a `^C` may be pressed during the input process to abort the text entry.
Pressing `^C` during normal entry generates a SIGINT.
Pressing `^C` during secret mode generates a null string as response

