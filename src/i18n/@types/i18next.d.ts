import { defaultNS } from '..';
import enCommon from '../locales/en/common';
import enRoot from '../locales/en/root';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: {
      common: typeof enCommon,
      root: typeof enRoot,
    }
  }
}