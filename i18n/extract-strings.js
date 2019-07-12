#!/usr/bin/env nodejs

const path = require('path');
const writeFile = require('fs').writeFileSync;
const mkdir = require('mkdirp').sync;

const supportedLocales = require('./supported-locales');
const getExtractedStrings = require('./get-extracted-strings');

const outputDir = path.resolve(__dirname, 'translations');

mkdir(outputDir);

let messages;

const extractedStrings = getExtractedStrings();

const englishTranslationsPath = path.resolve(__dirname, 'translations', 'translations.en.json');

try {
  messages = require(englishTranslationsPath);
} catch (ex) {}

if (!messages) {
  messages = {};
}

const newMessageIDs = [];

Object.keys(extractedStrings).forEach((messageId) => {
  if (
    !(messageId in messages) ||
    messages[messageId].defaultMessage !==
      extractedStrings[messageId].defaultMessage
  ) {
    newMessageIDs.push(messageId);

    if (!(messageId in messages)) {
      messages[messageId] = extractedStrings[messageId];
    }
  }
});

const translationObjects = {};

supportedLocales.forEach(
  (locale) => {
    const translationsPath = path.join(outputDir, `translations.${locale}.json`);

    let translations = {};

    try {
      translations = require(translationsPath);
    } catch (ex) {}

    Object.keys(messages).forEach(
      (messageId) => {
        if (
          !(messageId in translations) ||
          newMessageIDs.includes(messageId)
        ) {
          translations[messageId] = {
            description: messages[messageId].description,
            english: locale === 'en'
              ? undefined
              : messages[messageId].defaultMessage,
            translation: locale === 'en'
              ? messages[messageId].defaultMessage
              : null
          };
        }
      }
    );

    translationObjects[locale] = {
      path: translationsPath,
      translations
    };
  }
);

supportedLocales.forEach(
  (locale) => {
    writeFile(
      translationObjects[locale].path,
      JSON.stringify(
        translationObjects[locale].translations,
        null,
        '  '
      ),
      {
        encoding: 'utf8'
      }
    );
  }
);
