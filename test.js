var prompt = require('./index');


console.log('enter name');
var name = prompt();
console.log('enter password 1 with * as echo character');
var pw = prompt({hidden:true});
console.log('enter password 2 with no echo character');
var pwb = prompt({hidden:true, echo: ''});  
console.log('Name: %s\nPassword 1: %s\nPassword 2: ', name, pw, pwb);


