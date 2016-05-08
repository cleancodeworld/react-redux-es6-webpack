var git = require('git-rev-sync')

function getBuildVersion() {
  const buildVersion = '"' + git.tag().toString() + '.' + git.short().toString() + '"';
  return buildVersion;
}

module.exports = getBuildVersion();
