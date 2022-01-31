# SYNOPSIS
A sync prompt for node. very simple. no C++ bindings and no bash scripts.

Works on Linux, OS X and Windows.

# BASIC MODE
```js

var prompt = require('prompt-sync')();
//
// get input from the user.
//
var n = prompt('How many more times? ');
```
# ADVANCED HISTORY

History is configurable, for example using this extra package: 

```sh
npm install prompt-sync-history
```

```js
var prompt = require('prompt-sync')({
  history: require('prompt-sync-history')() // open history file
});
//get some user input
var input = prompt()
prompt.history.save() // save history back to file
```

See the [prompt-sync-history](http://npm.im/prompt-sync-history) module
for options, or fork it for customized behaviour. 

# API

## `require('prompt-sync')(config) => prompt` 

Returns an instance of the `prompt` function.
Takes `config` option with the following possible properties

`sigint`: Default is `false`. A ^C may be pressed during the input process to abort the text entry. If sigint it `false`, prompt returns `null`. If sigint is `true` the ^C will be handled in the traditional way: as a SIGINT signal causing process to exit with code 130.

`eot`: Default is `false`. A ^D pressed as the first character of an input line causes prompt-sync to echo `exit` and exit the process with code 0.

`autocomplete`: A completer function that will be called when user enters TAB to allow for autocomplete. It takes a string as an argument an returns an array of strings that are possible matches for completion. An empty array is returned if there are no matches.

`history`: Takes an object that supplies a "history interface", see [prompt-sync-history](http://npm.im/prompt-sync-history) for an example.

`validate`: A function returning null when validation passes or the error message else, see the prompt object example in test.js

## `prompt(ask, value, opts)`

`ask` is the label of the prompt, `value` is the default value
in absence of a response. 

The `opts` argument can also be in the first or second parameter position.

Opts can have the following properties

`echo`: Default is `'*'`. If set the password will be masked with the specified character. For hidden input, set echo to `''` (or use `prompt.hide`).

`autocomplete`: Overrides the instance `autocomplete` function to allow for custom 
autocompletion of a particular prompt.

`value`: Same as the `value` parameter, the default value for the prompt. If `opts`
is in the third position, this property will *not* overwrite the `value` parameter.

`ask`: Sames as the `value` parameter. The prompt label. If `opts` is not in the first position, the `ask` parameter will *not* be overridden by this property.

## `prompt.hide(ask)`

Convenience method for creating a standard hidden password prompt, 
this is the same as `prompt(ask, {echo: ''})`


# LINE EDITING
Line editing is enabled in the non-hidden mode. (use up/down arrows for history and backspace and left/right arrows for editing)

History is not set when using hidden mode.

# EXAMPLES

see test.js
