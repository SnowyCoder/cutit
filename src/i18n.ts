import Globalize from "globalize";
import { createI18n } from "vue-i18n";

import CldrLikelySubtags from  "cldr-data/supplemental/likelySubtags.json";
import CldrNumberingSystem from  "cldr-data/supplemental/numberingSystems.json";
import CldrItaNums from "cldr-data/main/it/numbers.json";
import CldrEngNums from "cldr-data/main/en/numbers.json";

const messages = {
    en: {
        header: {
            subtitle: 'Small utility to cut any amount of money easily!',
            cuts: 'Cuts:',
        },
        options: {
            target: 'Target',
            maxPieces: 'Max pieces'
        },
        load: {
            title: 'Load shared cuts',
            message: 'Someone shared with you {nCuts} cuts, do you want to load them?',
            confirm: 'Confirm',
            cancel: 'Canncel',
        },
        results: {
            title: 'Results:',
            none: 'No combinations found, try increasing max pieces'
        },
        share: 'Share',
    },
    it: {
        header: {
            subtitle: 'Piccolo programma per tagliare soldi facilmente!',
            cuts: 'Tagli:',
        },
        options: {
            target: 'Obiettivo',
            maxPieces: 'Numero massimo tagli'
        },
        load: {
            title: 'Carica tagli condivisi',
            message: 'Qualcuno ha condiviso con te {nCuts} tagli, vuoi caricarli?',
            confirm: 'Conferma',
            cancel: 'Ignora',
        },
        results: {
            title: 'Risultati:',
            none: 'Nessun taglio trovato, prova ad aumentare il numero massimo di tagli'
        },
        share: 'Condividi',
    },
}

const locale = navigator.language.split('-', 2)[0];

export const i18n = createI18n({
    legacy: false,
    locale,
    messages,
});

// Globalize setup
Globalize.load(CldrLikelySubtags);
Globalize.load(CldrNumberingSystem);
Globalize.load(CldrItaNums);
Globalize.load(CldrEngNums);
Globalize.locale(locale)

const floatOpts = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
};
export const floatParser = Globalize.numberParser();
export const floatFormatter = Globalize.numberFormatter(floatOpts);
