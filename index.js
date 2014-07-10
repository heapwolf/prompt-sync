var fs = require('fs');

module.exports = function(term) {

  term = term || '\n';

  var fd = fs.openSync('/dev/stdin', 'rs');
  var buf = new Buffer(1);
  var str = '';

  function getCh() {

    fs.readSync(fd, buf, 0, 1);
    var ch = buf.toString();

    if (ch == term) {
      fs.closeSync(fd);
    }
    else {
      str += ch;
      getCh();
    }
  }

  getCh();
  return str;
}

