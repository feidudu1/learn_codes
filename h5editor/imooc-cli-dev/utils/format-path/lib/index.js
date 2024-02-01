'use strict';

const path = require('path');

module.exports = function formatPath(p) {
  if (!p || typeof p !== 'string') {
    return p
  }
  const {sep} = path;
  // mac 的sep是/，windows的是\
  if (sep === '/') {
    return p;
  } else {
    return p.replace(/\\/g, '/');
  }
}
