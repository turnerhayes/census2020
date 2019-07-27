import React from 'react';

import LocaleContext from './LocaleContext';
import {
  supportedLocales,
  supportedLocaleNames
} from '../../i18n/supported-locales';

export const LocalePicker = () => {
  return (
    <LocaleContext.Consumer>
      {
        ({ currentLocale, setLocale }) => (
          <div className={'c_locale-picker'}>
            {
              supportedLocales.map(
                (locale) => (
                  <button
                    key={locale}
                    disabled={locale === currentLocale}
                    className="usa-button c_locale-picker__option"
                    onClick={() => setLocale(locale)}
                  >
                    {supportedLocaleNames[locale]}
                  </button>
                )
              )
            }
          </div>
        )
      }
    </LocaleContext.Consumer>
  );
};
