const path = require('path');
const readdir = require('fs').readdirSync;
const transformFile = require('@babel/core').transformFileSync;

const webpackPaths = require('../webpack-paths');

const filesToCheck = [
  webpackPaths.entry
];

const componentDir = path.resolve(__dirname, '..', 'javascript', 'components');

const addJSFiles = (dirPath) => {
  for (const file of readdir(
    dirPath,
    {
      encoding: 'utf8',
      withFileTypes: true
    }
  )) {
    if (file.isFile() && /\.js$/.test(file.name)) {
      filesToCheck.push(path.join(dirPath, file.name));
    } else if (file.isDirectory()) {
      addJSFiles(path.join(dirPath, file.name));
    }
  }
};

addJSFiles(componentDir);

module.exports = function getExtractedStrings () {
  const messages = {};

  for (const file of filesToCheck) {
    const transformed = transformFile(
      file,
      {
        plugins: [
          'babel-plugin-react-intl'
        ]
      }
    );

    for (const message of transformed.metadata['react-intl'].messages) {
      messages[message.id] = message;
    }
  }

  return messages;
};
