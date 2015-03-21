module.exports = function () {
  var message = '';
  message += 'Usage: cerium <Command>\n';
  message += '\n';
  message += 'Alias: ce <Command>\n';
  message += '\n';
  message += 'Commands:\n';
  message += 'help    Output help information\n';
  message += 'init    Interactively create a manifest.json file';

  console.log(message);
};
