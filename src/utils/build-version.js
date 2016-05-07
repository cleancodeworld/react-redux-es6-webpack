/**
 * Created by noursammour on 07/05/16.
 */

var git = require('git-rev-sync')

function getBuildVersion() {
  var buildVersion = '\'' + git.tag().toString() + git.short().toString() + '\'';
  return buildVersion;
}

module.exports = getBuildVersion();
