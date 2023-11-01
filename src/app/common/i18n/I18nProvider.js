import React from "react";
import { useLang } from "./Metronici18n";
import { IntlProvider, useIntl } from "react-intl";
import "@formatjs/intl-relativetimeformat/polyfill";
// import "@formatjs/intl-relativetimeformat/dist/locale-data/en";
import "@formatjs/intl-relativetimeformat/index";
// import "@formatjs/intl-relativetimeformat/dist/locale-data/es";
// import "@formatjs/intl-relativetimeformat/dist/locale-data/fr";
// import "@formatjs/intl-relativetimeformat/dist/locale-data/ja";
// import "@formatjs/intl-relativetimeformat/dist/locale-data/zh";
// import "@formatjs/intl-relativetimeformat/dist/locale-data/vi";

import enAllMessages from "./messages/en";
import viAllMessages from "./messages/vi";

// VI
import viErrors from "./errors/vi";
// import viProducts from "app/modules/Product/i18n/vi.json"

const viMessages = () => {
  const messages = {
    ...viAllMessages,
    // ...viProducts,
  };
  return messages;
};
const enMessages = () => {
  const messages = {
    ...enAllMessages,
  };
  return messages;
};

const allMessages = {
  en: enMessages(),
  vi: viMessages(),
};

const allErrorMessages = {
  en: enMessages(),
  vi: viErrors,
};

export function I18nProvider({ children }) {
  const locale = useLang();
  const messages = { ...allMessages[locale], ...allErrorMessages[locale] };

  return (
    <IntlProvider locale={locale} messages={messages}>
      {children}
    </IntlProvider>
  );
}


export const useTranslate = () => {
  const {formatMessage} = useIntl();


  const t = (id) => {
    return formatMessage({id: id});
  }


  return ({t})
}
