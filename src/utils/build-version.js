import git from 'git-rev-sync';

const getBuildVersion = ()=> {
  const buildVersion = '\'' + git.tag().toString() + git.short().toString() + '\'';
  return buildVersion;
}

module.exports = getBuildVersion();
