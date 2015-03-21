module.exports = function () {
  var message = '';
  message += 'Usage: cem <Command>\n';
  message += '\n';
  message += 'Commands:\n';
  message += 'help    Output help information\n';
  message += 'init    Interactively create a manifest.json file';

  console.log(message);
};
