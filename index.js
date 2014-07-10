var fs = require('fs');

module.exports = function(term) {

  term = term || '\n';

  var fd = fs.openSync('/dev/stdin', 'rs');
  var buf = new Buffer(1);
  var str = '';

  function getCh() {

    var ch;
    do {
        fs.readSync(fd, buf, 0, 1);
        var ch = buf.toString();
        str += ch == term?'':ch;
    } while (ch != term);
    fs.closeSync(fd);
  }

  getCh();
  return str;
}

