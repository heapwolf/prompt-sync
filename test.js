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


