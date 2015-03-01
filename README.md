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
process.stdin.setRawMode(true)
process.stdout.write('password>')
var password = prompt('\u000D')
```
