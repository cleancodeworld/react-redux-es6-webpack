import git from 'git-rev-sync';

const getLastCommit= ()=> {
  const  lastCommit = '\'' + git.short().toString() + '\'';
  return lastCommit;
}

module.exports = getLastCommit();
