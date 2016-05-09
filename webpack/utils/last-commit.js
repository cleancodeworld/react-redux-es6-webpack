var git = require('git-rev-sync')

function getLastCommit() {
  var lastCommit = '\'' + git.short().toString() + '\'';
  return lastCommit;
}

module.exports = getLastCommit();
