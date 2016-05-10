var git = require('git-rev-sync');

function getBuildVersion() {
  const buildVersion = '\'' + git.tag().toString() + '.' + git.count().toString() + '\'';
  return buildVersion;
}

module.exports = getBuildVersion();
