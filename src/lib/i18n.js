import MessageFormat from 'messageformat';

let _initialized = false;
let _translations = {};
let _locale = 'en';
let _messages = {};

function compileMessages() {
  _messages = {};

  const mf = new MessageFormat(_locale);

  for (const key in _translations[_locale]) {
    if (_translations[_locale].hasOwnProperty(key)) {
      _messages[key] = mf.compile(_translations[_locale][key]);
    }
  }
}

function setTranslations(translations) {
  _translations = translations;
  _initialized = true;
  compileMessages();
}

function setLocale(locale) {
  _locale = locale;

  compileMessages();
}

function translate(message, data) {
  if (!_initialized) {
    console.warn('[i18n] translations not initialized yet - translating "' + message + '"'); // eslint-disable-line
    return message;
  }

  let msg = _messages[message];

  if (msg === null) {
    console.warn('[i18n] "' + message + '". is missing in "' + _locale + '".'); // eslint-disable-line

    const format = new MessageFormat(_locale);
    msg = _messages[message] = format.compile(message);
  }

  try {
    return msg(data);
  } catch (err) {
    console.error('[i18n] Cannot translate "' + message + '". ' + err.message); // eslint-disable-line

    return '[error] ' + message;
  }
}

function hasTranslation(message) {
  return !!_messages[message];
}

export default {
  setLocale,
  setTranslations,
  translate,
  hasTranslation,
};
