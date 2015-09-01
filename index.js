// forked from: 
// https://github.com/hij1nx/prompt-sync


var fs = require('fs');
var HISTORY_MAX = 100;
var HISTORY_FILE = '.prompt_hist.txt'
var HIST = [];

/**
 * prompt -- sync function for reading user input from stdin
 * @param   {Object} option {
 *   hidden: If true, user input will not be echoed,
 *   echo: set to a character to be echoed, default is '*'. Use '' for no echo
 *   tabComplete: {StringArray} function({String}) 
 *   value: {String} initial value for the prompt
 * }
 * @returns {string} Returns the string input or null if user terminates with a ^C
 */

function prompt(option) {
  
  var term = 13; // carriage return
  var hidden = false;
  var histindex = HIST.length;
  var insert = 0, savedinsert = 0, res, i, savedstr;

  option = option || {};
  option.tabComplete = option.tabComplete || function(){return []} ;

  if (option && option.hidden) {
    hidden = true;
    if (!option.hasOwnProperty('echo'))
      option.echo = '*';
  }

  var fd = fs.openSync('/dev/stdin', 'rs');
  process.stdin.setRawMode(true);
  var buf = new Buffer(3);
  var str = '', char, read;
  
  savedstr = '';

  if (option.value) {
    insert = option.value.length;
    str = option.value;
    process.stdout.write(option.value);
  }

  var cycle = 0;
  var prevComplete;

  while (true) {
    read = fs.readSync(fd, buf, 0, 3);
    //process.stdout.write('read '+ read + ' '+ buf[0]);
    if (read == 3) { // received a control sequence
      switch(buf.toString()) {
          case '\u001b[A':  //up arrow
            if (hidden) break;
            if (histindex <= 0) break;
            if (histindex == HIST.length) {
              savedstr = str;
              savedinsert = insert;
            }
            str = HIST[--histindex];
            insert = str.length;
            process.stdout.write("\033[2K\033[0G" +  str);
            break;
          case '\u001b[B':  //down arrow
            if (hidden) break;
            if (histindex >= HIST.length) break;
            if (histindex == HIST.length -1) {
              str = savedstr;
              insert = savedinsert;
              histindex++;
            } else {
              str = HIST[++histindex];
              insert = str.length;
            }
            process.stdout.write("\033[2K\033[0G"+ str + "\033["+(insert+1)+"G");
            break;
          case '\u001b[D': //left arrow
            if (hidden) break;
            insert = (--insert < 0) ? 0 : insert;
            process.stdout.write("\033[1D" +  '');
            break;
          case '\u001b[C': //right arrow
            if (hidden) break;
            insert = (++insert > str.length) ? str.length : insert;
            process.stdout.write("\033[" + (insert+1) + "G");
            break;
      }
      continue; // any other 3 character sequence is ignored
    }
    
    // if it is not a control character seq, assume only one character is read
    char = buf[read-1];
    
    // catch a ^C and return null
    if (char == 3){ 
      process.stdout.write('^C\n');
      fs.closeSync(fd);
      process.stdin.setRawMode(false);
      return null;
    }

    // catch the terminating character
    if (char == term) {
      if (!hidden && str.length)
        HIST.push(str);
      fs.closeSync(fd);
      break;
    }
    
    // catch a TAB and implement tabcomplete
    if (char == 9) { // TAB
      res = option.tabComplete(str);

      if (str == res[0]) {
        res = option.tabComplete('');
      }
      else {
        prevComplete = res.length;
      }

      if (res.length == 0) {
        process.stdout.write("\07");
        continue;
      }

      var item = res[cycle++] || res[cycle = 0, cycle++]

      if (item) {
        process.stdout.write("\r\033[K" + item);
        str = item;
        insert = item.length;
      }
    }
    
    if (char == 127) { //backspace
      if (!insert) continue;
      str = str.slice(0, insert-1) + str.slice(insert);
      insert--;
    } else {
      if ((char < 32 ) || (char > 126))
          continue;
      str = str.slice(0, insert) + String.fromCharCode(char) + str.slice(insert);
      insert++;
    };
    
    if (hidden) {
        process.stdout.write("\033[2K\033[0G" +  Array(str.length+1).join(option.echo));
    } else {
      if (insert == str.length) {
        process.stdout.write("\033[2K\033[0G"+ str);
      } else {
        process.stdout.write("\033[2K\033[0G"+ str + "\033[" + (str.length-insert) +"D" );
      }
    }    
  }
  
  process.stdout.write('\n')

  process.stdin.setRawMode(false);
  
  return str;
};


function init(history_file, history_max) {
  HISTORY_MAX = history_max || HISTORY_MAX;
  HISTORY_FILE = history_file || HISTORY_FILE;
  try {
    HIST = fs.readFileSync(HISTORY_FILE, {encoding: 'utf8'});
    HIST = HIST.split('\n').slice(0,-1);
  } catch(e) {
    HIST = [];
  }
  HIST = HIST.slice(HIST.length-HISTORY_MAX, HIST.length);
}

function save(){
    fs.writeFileSync(HISTORY_FILE, HIST.join('\n') + '\n');
}

module.exports = {
  prompt: prompt,
  save: save,
  init: init
}

