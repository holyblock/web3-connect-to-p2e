<template>
  <div :class="{ 'globalPreloader--loaded': loaded }" class="globalPreloader grid placeI--center pos--fix z--max inset">
    <BaseSpinner />
  </div>
</template>

<script>
export default {
  name: 'GlobalPreloader',
  data() {
    return {
      loaded: false
    }
  },
  mounted() {
    setTimeout(() => {
      this.loaded = true
    }, 2000)
  }
}
</script>

<style lang="scss">
.globalPreloader {
  background: $white;
  pointer-events: none;
  transition: opacity 0.3s ease, visibility 0.3s ease, background 0.3s ease;

  &--loaded {
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
  }
}
</style>
