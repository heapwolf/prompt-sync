//basic:
console.log(require('./')()('tell me something about yourself: '))

// ANSI escape codes colored text test
require('./')()('\u001B[31mcolored text: \u001B[39m');

var prompt = require('./')({
  history: require('prompt-sync-history')(),
  autocomplete: complete(['hello1234', 'he', 'hello', 'hello12', 'hello123456']),
  sigint: false
});

var value = 'frank';
var name = prompt('enter name: ', value);
console.log('enter echo * password');
var pw = prompt({echo: '*'});
var pwb = prompt('enter hidden password (or don\'t): ', {echo: '', value: '*pwb default*'})
var pwc = prompt.hide('enter another hidden password: ')
var autocompleteTest = prompt('custom autocomplete: ', {
  autocomplete: complete(['bye1234', 'by', 'bye12', 'bye123456'])
});

prompt.history.save();

var prompt2 = require('./')({
  sigint: false,
  submitOnCharacter: true
});

var submitOnCharacter = prompt2('enter single character: ', { submitOnCharacter: true });

console.log('\nName: %s\nPassword *: %s\nHidden password: %s\nAnother Hidden password: %s\nauto character:%s', name, pw, pwb, pwc, submitOnCharacter);
console.log('autocomplete2: ', autocompleteTest);

function complete(commands) {
  return function (str) {
    var i;
    var ret = [];
    for (i=0; i< commands.length; i++) {
      if (commands[i].indexOf(str) == 0)
        ret.push(commands[i]);
    }
    return ret;
  };
};
