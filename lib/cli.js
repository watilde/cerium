var cerium = require('./main');
var argv = process.argv.slice(2);

switch (argv[0]) {
case 'init':
  if (argv.length === 1) {
    cerium.init();
    break;
  }
case 'help':
  if (argv.length === 1) {
    cerium.help();
    break;
  }
default:
  var message = '';
  if (argv.length > 0) {
    message += 'Unrecognized command line argument: ';
    message += argv.join(' ');
    message += ' ( See: \'ce help\' )';
    console.log(message);
  } else {
    cerium.help();
  }
  break;
}
