const execa = require('execa');
const { tmpdir } = require('os');
const { join } = require('path');

test('static-app-classic', async () => {
  jest.setTimeout(60000);

  await execa('ember', ['build'], {
    cwd: `${__dirname}/static-app`,
    env: {
      CUSTOM_ROOT_URL: '/custom/',
      WORKSPACE_DIR: join(tmpdir(), 'embroider', 'static-app-rooturl'),
    },
  });
});
