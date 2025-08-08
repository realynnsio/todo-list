<script setup></script>

<template>
  <nav>
    <div :class="$style.logoText">
      <img :class="$style.logoIcon" alt="" src="/Logo.svg" />
      <img :class="$style.textIcon" alt="" src="/text.svg" />
    </div>
    <router-link :class="$style.navLink" to="/">Home</router-link>
  </nav>

  <router-view />
</template>

<style module>
* {
  --dark-blue: #002ac9;
  font-family: Roboto, sans-serif;
}

nav {
  width: 100%;
  position: relative;
  background-color: var(--dark-blue);
  height: 64px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px 72px;
  box-sizing: border-box;
  text-align: left;
  color: #fff;
}

.navLink {
  color: white;
  text-decoration: none;
  font-size: 1.2rem;
  padding: 0.5rem 1rem;
}

.logoText {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  height: 32px;
}
</style>
