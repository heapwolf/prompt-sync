# SYNOPSIS
A sync prompt for node. very simple. no C++ bindings and no bash scripts.


# BASIC MODE
```js

var prompt = require('prompt-sync').prompt;
//
// write some text to the screen.
//
process.stdout.write('How many more times? ')

//
// get input from the user.
//
var n = prompt()
```
# WITH HISTORY
`prompt = require('prompt-sync')` returns an object with three methods:

`prompt.init(history-filename, max-history) // open history file.`

`prompt.save() // save history back to file`

`prompt.prompt(option) // do sync io from stdin`



# ADVANCED FUNCTIONS
`prompt.prompt()` takes an optional argument object with the following properties

`hidden`: Default is `false`. This prevents echo-back during text entry

`echo`: Default is `'*'`. Echo character to be used. For no echo set this to `''`

`tabComplete`: A completer function that will be called when user enters TAB to allow for autocomplete. It takes
a string as an argument an returns an array of strings that are possible matches for completion. An empty array 
is returned if there are no matches.

# LINE EDITING
Line editing is enabled in the non-hidden mode. (use up/down arrows for history and backspace and left/right arrows for editing)

History is not set when using hidden mode.

# EXAMPLES

```js
prompt = require('prompt-sync');
prompt.init(); // start history. Use cursor up/down for history
console.log('Enter some text:');
var sometext = prompt.prompt({tabComplete: myCompleter});
console.log('Enter password:');
var password1 = prompt({hidden: true}); // '*' is echoed 
var password2 = prompt({hidden:true, echo: ''}); // there is no echo 
var password3 = prompt({hidden:true, echo: '?'}); // '?' is echoed 
```
####Note
a `^C` may be pressed during the input process to abort the text entry and return a null string


