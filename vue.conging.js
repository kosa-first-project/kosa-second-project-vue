module.exports = {
    css: {
        loaderOptions: {
            sass: {
                data: `
                    @import "@/src/assets/sass/_footer.scss";
                    @import "@/src/assets/sass/_about.scss";
                    @import "@/src/assets/sass/_banner.scss";
                    @import "@/src/assets/sass/_common.scss";
                    @import "@/src/assets/sass/_menu.scss";
                    @import "@/src/assets/sass/style.scss";
                    @import "@/src/assets/sass/_variables.scss;
                    @import "@/src/assets/sass/_sub_menu.scss;
                    @import "@/src/assets/sass/_service.scss;
                `
            }
        }
    }
}