/**
 * Created by noursammour on 07/05/16.
 */

var git = require('git-rev-sync')

function getLastCommit() {
  var lastCommit = '\'' + git.short().toString() + '\'';
  return lastCommit;
}

module.exports = getLastCommit();
