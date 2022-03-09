(() => {
  // ns-hugo:/Users/wanntonn/zones/wanntonn.github.io/assets/js/plugins/logger.js
  function logInfo(info, ...params) {
    console.info("[LOGGER]", info, ...params);
  }
  function logError(err, ...params) {
    console.error("[ERROR]", err, ...params);
  }

  // ns-hugo:/Users/wanntonn/zones/wanntonn.github.io/assets/js/plugins/constants.js
  var EMAIL_ADDRESS = "example_email@outlook.com";

  // ns-hugo:/Users/wanntonn/zones/wanntonn.github.io/assets/js/components/mail.js
  (async function loadEmail() {
    const emailLoader = new Promise((resolve, reject) => {
      const linksNode = document.querySelectorAll(".links-item.links-email");
      if (linksNode && linksNode.length > 0) {
        const emailNode = linksNode[linksNode.length - 1];
        emailNode.setAttribute("href", `mailto:${EMAIL_ADDRESS}`);
        resolve(`Email loaded with ${EMAIL_ADDRESS}`);
      } else {
        let errMsg = "Email node not found";
        reject(errMsg);
      }
    });
    emailLoader.then((val) => {
      logInfo(val);
    }).catch((res) => {
      logError(res);
    });
  })();
})();
/*! hugo-template-aofuji | DSRKafuU <amzrk2.cc> | Copyright (c) Apache-2.0 License */
