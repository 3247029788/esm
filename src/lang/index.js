import Vue from 'vue';
import VueI18n from 'vue-i18n';
import {Locale} from 'vant'
import enUS from 'vant/es/locale/lang/en-US';
import zhCN from 'vant/es/locale/lang/zh-CN';
import enLocale from './en/index'
import zhLocale from './zh/index'
import store from '@/store'

Vue.use(VueI18n)

const messages = {
    en: {
        ...enUS,
        ...enLocale
    },
    zh: {
        ...zhCN,
        ...zhLocale
    }
}

const i18n = new VueI18n({
    locale: localStorage.getItem('lang') || 'zh',
    messages: messages
})

function vantLocales (lang){
    if(lang === 'en'){
        Locale.use('en-US',enUS)
    }else if(lang === 'zh'){
        Locale.use('zh-CN',zhCN)
    }
}

export {i18n, vantLocales}