import Vue from "vue"
import Vuetify from "vuetify"
import colors from "vuetify/lib/util/colors"
import en from "vuetify/es5/locale/en"

import "vuetify/dist/vuetify.min.css"
import "@fortawesome/fontawesome-free/css/all.css"


Vue.use(Vuetify)


export default new Vuetify({
    lang: {
        locales: { en },
        current: "en"
    },
    icons: {
        iconfont: "fa"
    },
    theme: {
        dark: false,
        themes: {
            light: {
                primary: colors.cyan.darken2,
                secondary: colors.cyan.base
            },
            dark: {
                primary: colors.teal.darken3,
                secondary: colors.teal.base
            }
        }
    }
})
