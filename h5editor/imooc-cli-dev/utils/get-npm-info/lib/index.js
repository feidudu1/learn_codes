'use strict';

/**
 *  获取某npm包的所有版本号
 */

const axios = require('axios');
const urlJoin = require('url-join');
const semver = require('semver');

function getNpmInfo(npmName, registry) {
  if (!npmName) {
    return null;
  }
  const registryUrl = registry || getDefaultRegistry();
  const npmInfoUrl = urlJoin(registryUrl, npmName);
  return axios.get(npmInfoUrl).then(response => {
    if (response.status === 200) {
      return response.data;
    }
    return null;
  }).catch(err => {
    console.log('包名:', npmInfoUrl);
    return Promise.reject(new Error(`获取包失败`));;
  });
}

function getDefaultRegistry(isOriginal = true) {
  return isOriginal ? 'https://registry.npmjs.org' : 'https://registry.npm.taobao.org';
}

async function getNpmVersions(npmName, registry) {
  const data = await getNpmInfo(npmName, registry);
  if (data) {
    return Object.keys(data.versions);
  } else {
    return [];
  }
}

function getSemverVersions(currentVersion, versions) {
  return versions
    .filter(version => semver.satisfies(version, `>${currentVersion}`))
    .sort((a, b) => semver.gt(b, a) ? 1 : -1);
}

async function getNpmSemverVersion(currentVersion, npmName, registry) {
  const versions = await getNpmVersions(npmName, registry); // [ '1.0.4' ]
  const newVersions = getSemverVersions(currentVersion, versions);
  if (newVersions && newVersions.length > 0) {
    return newVersions[0];
  }
  return null;
}

async function getNpmLatestVersion(npmName, registry) {
  let versions = await getNpmVersions(npmName, registry);
  if (versions) {
    const sortedVersions = versions.sort((a, b) => semver.gt(a, b) ? -1 : 1) // gt：a>b
    return sortedVersions[0];
  }
  return null;
}

module.exports = {
  getNpmInfo,
  getNpmVersions,
  getNpmSemverVersion,
  getDefaultRegistry,
  getNpmLatestVersion,
};
