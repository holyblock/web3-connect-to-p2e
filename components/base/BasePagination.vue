<template>
  <div class="basePagination flex alignI--center justifyC--center gap--48">
    <!--  -->

    <BaseIconBtn
      :class="{ 'basePagination__btn--inactive': currentPage === 1 }"
      class="basePagination__btn basePagination__btn--left"
      bgColor="white"
      icon="arrow"
      arrowDir="left"
      @click="selectPage(currentPage - 1)" />

    <div class="flex gap--8">
      <BaseIconBtn
        v-for="i in totalPages"
        :bgColor="`${currentPage === i ? 'green' : 'white'}`"
        class="basePagination__btn"
        @click="selectPage(i)">
        {{ i }}
      </BaseIconBtn>
    </div>

    <BaseIconBtn
      class="basePagination__btn basePagination__btn--right"
      :class="{ 'basePagination__btn--inactive': currentPage === totalPages }"
      bgColor="white"
      icon="arrow"
      arrowDir="right"
      @click="selectPage(currentPage + 1)" />

    <!--  -->
  </div>
</template>
<script>
export default {
  name: 'BasePagination',
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    totalPages: {
      type: Number,
      default: 0
    },
    viewPerPage: {
      type: Number,
      default: 10
    },
    totalItems: {
      type: Number,
      default: 0
    }
  },
  methods: {
    selectPage(selectedPage) {
      this.$emit('onPageChange', selectedPage)
    }
  }
}
</script>

<style lang="scss">
.basePagination {
  &__btn {
    &--inactive {
      opacity: 0.5;
      pointer-events: none;
    }
  }

  &__pageCaption {
    margin-right: 30px;
  }
}
/*----------------------------------------*/

// 600
@include breakpoint(s) {
  .basePagination {
    gap: 24px;

    &__btn {
      width: 32px;
      height: 32px;
    }
  }
}
/*----------------------------------------*/

// 400
@include breakpoint(xxs) {
  .basePagination {
    gap: 12px;
  }
}
/*----------------------------------------*/

// 350
@include breakpoint(t) {
  .basePagination {
    gap: 12px;

    &__btn {
      width: 28px;
      height: 28px;
    }
  }
}
</style>
