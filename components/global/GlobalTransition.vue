<template>
  <div class="globalTransition grid placeI--center pos--fix z--max o--0 inset">
    <BaseSpinner />
  </div>
</template>

<script>
export default {
  name: 'GlobalTransition'
}
</script>

<style lang="scss">
.globalTransition {
  background: $white;
  pointer-events: none;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease, background 0.3s ease;

  &.show {
    opacity: 1;
    visibility: visible;
    transition: opacity 0.3s ease, visibility 0.3s ease;
  }
}
</style>
