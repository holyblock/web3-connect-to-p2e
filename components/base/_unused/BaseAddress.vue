<template>
  <p class="baseAddress ff--slab fs--20 fw--600">
    {{ address }}
  </p>
</template>

<script>
export default {
  name: 'BaseAddress',
  props: {
    address: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
.baseAddress {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@include breakpoint(m) {
  .baseAddress {
    font-size: 16px;
  }
}
</style>