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

`value`: The initial value for the prompt.

# LINE EDITING
Line editing is enabled in the non-hidden mode. (use up/down arrows for history and backspace and left/right arrows for editing)

History is not set when using hidden mode.

# EXAMPLES

```js
    var prompt = require('./index') 
    var commands = ['hello1234', 'he', 'hello', 'hello12', 'hello123456'];
    function tabComplete(str) {
      var i;
      var ret = [];
      for (i=0; i< commands.length; i++) {
        if (commands[i].indexOf(str) == 0)
          ret.push(commands[i]);
      }
      return ret;
    };
  
    prompt.init();
    console.log('enter name');
    var name = prompt.prompt({tabComplete: tabComplete});
    console.log('enter echo * password');
    var pw = prompt.prompt({hidden:true});
    console.log('enter no echo password');
    var pwb = prompt.prompt({hidden:true, echo: ''});  
    console.log('Name: %s, Password *: %s, Password no echo: ', name, pw, pwb);
    prompt.save();
```
####Note
a `^C` may be pressed during the input process to abort the text entry and return a null string


