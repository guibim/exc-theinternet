
const DigestFetch = require('digest-fetch').default;  // exc digestauth.cy.js

module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        async digestGet({ url, username, password }) {
          const client = new DigestFetch(username, password);
          const res = await client.fetch(url);
          const body = await res.text();
          return { status: res.status, body };
        },
      });
      return config;
    },
  },
};
