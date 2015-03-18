// forked from: 
// https://github.com/hij1nx/prompt-sync


var fs = require('fs');

/**
 * prompt -- sync function for reading user input from stdin
 * @param   {Object} option {
 *                        hidden: If true, user input will not be echoed,
 *                        echo: set to a character to be echoed, default is '*'. Use '' for no echo
 *                        }
 * @returns {string} Returns the string input or null if user terminates with a ^C
 */

module.exports = function(option) {
  
  var term;
  var hidden = false;
  
  if (option && option.hidden) {
    term = '\u000D';
    hidden = true;
    if (!option.hasOwnProperty('echo'))
      option.echo = '*';
  }
  else 
    term = '\n';

  var fd = fs.openSync('/dev/stdin', 'rs');
  if (hidden) 
    process.stdin.setRawMode(true);
  var buf = new Buffer(1);
  var str = '';
  
  while (true) {
    fs.readSync(fd, buf, 0, 1);
    var ch = buf.toString();
    if (ch.charCodeAt(0) == 3){ // catch a ^C and return null
      process.stdout.write('^C\n');
      fs.closeSync(fd);
      process.stdin.setRawMode(false);
      return null;
    }
    if (ch == term) {
      fs.closeSync(fd);
      break;
    }
    else {
      str += ch;
      if (hidden) {
        process.stdout.write("\033[2K\033[200D" +  Array(str.length+1).join(option.echo));
      }
    }    
  }
  
  if (hidden) {
    console.log('');
    process.stdin.setRawMode(false);
  }
  return str;
}

