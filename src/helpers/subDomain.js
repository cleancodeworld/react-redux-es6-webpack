import config from '../config';

export default function getSubDomain(domain) {
  const domainName = config.mainDomain(false);
  const mainDomainPos = domain.indexOf(domainName);
  let subDomain = false;
  if (mainDomainPos > 1) {
    subDomain = domain.substr(0, mainDomainPos - 1);
  }
  return subDomain;
}
