import { createContext } from 'react';
export var TranslationContext = createContext({
    locale: 'en',
    translate: function (id) { return id; },
});
