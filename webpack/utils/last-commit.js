var git = require('git-rev-sync')

function getLastCommit() {
  var lastCommit = '\'' + git.short().toString() + '\'';
  return lastCommit.replace(/"/g, '');
}

module.exports = getLastCommit();
