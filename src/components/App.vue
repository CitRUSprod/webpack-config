<template lang="pug">

    v-app
        .pa-4
            h1 {{ text }}
            v-btn(color="success")
                v-icon fas fa-check-circle

</template>


<script>

    export default {
        data() {
            return {
                msg: "hello world"
            }
        },
        computed: {
            text() {
                return _.startCase(this.msg)
            }
        }
    }

</script>
