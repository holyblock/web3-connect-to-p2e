<template>
  <div
    :class="{ 'quickAccessOverlay--open': isOpen }"
    class="quickAccessOverlay pos--fix inset z--max o--0"
    @click="closeMenu" />
</template>

<script>
import { useGlobalStore } from '~/stores/global'

export default {
  name: 'QuickAccessOverlay',
  data() {
    return {
      isOpen: computed(() => useGlobalStore().menu)
    }
  },
  methods: {
    closeMenu() {
      useGlobalStore().updateMenu(null)
    }
  }
}
</script>

<style lang="scss">
.quickAccessOverlay {
  background: rgba($black, 0.4);
  visibility: hidden;
  transition: opacity 0.4s ease, visibility 0.4s ease;

  &--open {
    opacity: 1;
    visibility: visible;
  }
}
</style>
