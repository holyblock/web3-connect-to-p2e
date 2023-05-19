<template>
  <section class="columns">
    <slot />
  </section>
</template>

<script>
export default {
  name: 'BaseColumns'
}
</script>

<style lang="scss">
.columns {
  display: flex;
  // flex-wrap: wrap;
  // gap: 16px;

  &--center {
    justify-content: center;
  }

  &__col {
    flex: 1;
  }
}

@for $i from 1 through 12 {
  .colSize--#{$i} {
    flex: none;
    width: #{$colSize * $i * 1%};
  }

  .colOffset--#{$i} {
    margin-left: #{$colSize * $i * 1%};
  }
}

@include breakpoint(m) {
  .columns {
    flex-wrap: wrap;
  }
}
</style>
