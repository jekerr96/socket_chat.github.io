<template>
    <div>
        <!-- Yandex.RTB R-A-343168-1 -->
        <div id="yandex_rtb_R-A-343168-1"></div>
    </div>
</template>

<script>
export default {
    name: "ad-block",
    mounted() {
        this.yandex(window, document, "yandexContextAsyncCallbacks");
    },
    methods: {
        yandex: function (w, d, n, s, t) {
            w[n] = w[n] || [];
            w[n].push(function () {
                Ya.Context.AdvManager.render({
                    blockId: "R-A-343168-1",
                    renderTo: "yandex_rtb_R-A-343168-1",
                    async: true
                });
            });
            t = d.getElementsByTagName("script")[0];
            s = d.createElement("script");
            s.type = "text/javascript";
            s.src = "//an.yandex.ru/system/context.js";
            s.async = true;
            t.parentNode.insertBefore(s, t);
        }
    }
}
</script>