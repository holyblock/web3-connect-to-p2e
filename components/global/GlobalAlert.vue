<template>
  <div :class="{ 'globalAlert--reveal': header }" class="globalAlert pos--fix z--max">
    <BaseStat :header="header" :label1="status" icon="ship" class="globalAlert__alert" />
  </div>
</template>

<script>
export default {
  name: 'GlobalAlert',
  props: {
    header: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
@keyframes revealGlobalAlert {
  from {
    transform: translateX(-150%);
  }
  to {
    transform: translateX(0%);
  }
}

.globalAlert {
  bottom: 40px;
  left: -8px;
  transform: translateX(-150%);

  &--reveal {
    animation: revealGlobalAlert 0.5s ease forwards;
  }
}
</style>
