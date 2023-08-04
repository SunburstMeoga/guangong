import { createI18n } from "vue-i18n";

const i18n = createI18n({
    locale: 'zh-hk',
    messages: {
        'zh-hk': require('./zh-hk'),
        'zh-cn': require('./zh-cn'),
        'en-us': require('./en-us')
    }
})

export default i18n