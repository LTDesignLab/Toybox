<template>
  <div id="nav">
    <router-link to="/">Components</router-link>
    <router-link to="/about">About</router-link>
  </div>
  <router-view/>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  margin: 0px;
  padding: 0px;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    font-size: 14px;
    color: #2c3e50;
    margin-left: 6px;
    margin-right: 6px;
    text-decoration: none;
    opacity: 0.4;

    &.router-link-exact-active {
      opacity: 1;
    }
  }
}
</style>
