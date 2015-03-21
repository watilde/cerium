var fs = require('fs');
var path = require('path');
var inquirer = require('inquirer');
var semver = require('semver');
var dirname = path.basename(process.cwd());
var manifest = path.join(process.cwd(), 'manifest.json');

module.exports = function () {
  inquirer.prompt([{
    name: 'name',
    message: 'name',
    default: dirname,
    validate: function (str) {
      return 6 >= str.length;
    }
  }, {
    name: 'description',
    message: 'description',
    validate: function (description) {
      return 132 >= description.length;
    }
  }, {
    name: 'version',
    message: 'version',
    default: '0.0.1',
    validate: function (version) {
      return !!semver.valid(version);
    }
  }, {
    name: 'default_locale',
    message: 'default locale',
    default: 'en'
  }, {
    name: 'manifest_version',
    message: 'manifest version',
    default: 2,
    validate: function (num) {
      return num === 1 || num === 2;
    }
  }, {
    name: 'homepage_url',
    message: 'homepage url',
    // Based on https://github.com/npm/init-package-json
    default: function () {
      try {
        var gconf = fs.readFileSync('.git/config', 'utf8');
        gconf = gconf.split(/\r?\n/);
        var i = gconf.indexOf('[remote "origin"]');
        var u = '';
        if (i !== -1) {
          u = gconf[i + 1];
          if (!u.match(/^\s*url =/)) u = gconf[i + 2];
          if (!u.match(/^\s*url =/)) u = null;
          else u = u.replace(/^\s*url = /, '');
        }
        if (u && u.match(/^git@github.com:/)) {
          u = u.replace(/^git@github.com:/, 'https://github.com/');
        }
        return u;
      } catch(e) {}
    }
  }, {
    name: 'author',
    message: 'author'
  }, {
    name: 'ok',
    message: function (str) {
      return JSON.stringify(str, null, 2) + '\n\n\nIs this ok?';
    },
    default: true,
    type: 'confirm'
  }], function (answers) {
    var pkg = {};
    Object.keys(answers).forEach(function (key) {
      if (!answers[key] || key === 'ok') return;
      pkg[key] = answers[key];
    });
    pkg = JSON.stringify(pkg, null, 2);
    fs.writeFileSync(manifest, pkg);
  });
};
