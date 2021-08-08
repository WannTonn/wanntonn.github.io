import { logInfo, logError } from '../plugins/logger';
import { EMAIL_ADDRESS } from '../plugins/constants';

/**
 * email loader
 */
(async function loadEmail() {
  const emailLoader = new Promise((resolve, reject) => {
    const linksNode = document.querySelectorAll('.links-item.links-email');
    if (linksNode && linksNode.length > 0) {
      const emailNode = linksNode[linksNode.length - 1];
      emailNode.setAttribute('href', `mailto:${EMAIL_ADDRESS}`);
      resolve(`Email loaded with ${EMAIL_ADDRESS}`);
    } else {
      let errMsg = 'Email node not found'
      reject(errMsg);
    }
  });
  emailLoader
    .then((val) => {
      logInfo(val);
    })
    .catch((res) => {
      logError(res);
    });
})();
