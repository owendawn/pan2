
import navVue from './component/nav.vue'

export default {
    install:function (Vue) {
        Vue.component("PNav",navVue);
        Vue.component('remote-script', {
            render: function (createElement) {
                var self = this;
                return createElement('script', {
                    attrs: {
                        type: 'text/javascript',
                        src: this.src
                    },
                    on: {
                        load: function (event) {
                            self.$emit('load', event);
                        },
                        error: function (event) {
                            self.$emit('error', event);
                        },
                        readystatechange: function (event) {
                            if (this.readyState == 'complete') {
                                self.$emit('load', event);
                            }
                        }
                    }
                });
            },
            props: {
                src: {
                    type: String,
                    required: true
                }
            }
        });
    }
}