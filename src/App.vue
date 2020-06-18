<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app",
  methods: {
    // 判断移动还是PC
    isMobile() {
      let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      return flag;
    },
    // 移动端适配
    initRem() {
      let cale =
        window.screen.availWidth > 750 ? 2 : window.screen.availWidth / 375;
      window.document.documentElement.style.fontSize = `${100 * cale}px`;
    }
  },
  mounted() {
    if (this.isMobile()) {
      this.initRem();
      window.addEventListener("resize", function() {
        this.initRem();
      });
      this.$router.replace("/Mobile");
    } else {
      this.$router.replace("/");
    }
  }
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  background: #ebecef;
}
</style>
