<template>
  <section class="gangStart">
    <!--  -->

    <GlobalBanner header="Gangs" />

    <div class="gangStart__columns flex gap--40">
      <BasePanel class="gangStart__col">
        <div class="gangStart__content ta--center">
          <BaseMapIcon class="gangStart__icon" type="gangs" invert />
          <h3 class="gangStart__header fs--24 fw--700 ff--slab">Create a Gang</h3>
          <p class="gangStart__text fc--para lh--160">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
          </p>
          <BaseBtn class="gangStart__btn baseBtn--full" color="gangs" @click="createGang">Create a Gang</BaseBtn>
        </div>
      </BasePanel>

      <BasePanel class="gangStart__col">
        <div class="gangStart__content ta--center">
          <BaseMapIcon class="gangStart__icon" type="gangs2" invert />
          <h3 class="gangStart__header fs--24 fw--700 ff--slab">Join a Gang</h3>
          <p class="gangStart__text fc--para lh--160">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
          </p>
          <BaseBtn
            class="gangStart__btn baseBtn--full"
            color="white"
            icon="discord"
            link="https://discord.com"
            external>
            Join Discord Community
          </BaseBtn>
        </div>
      </BasePanel>
    </div>

    <!--  -->
  </section>
</template>

<script>
import { useGangsStore } from '~/stores/gangs'

export default {
  name: 'GangStart',
  methods: {
    createGang() {
      useGangsStore().updateState(1)
    }
  }
}
</script>

<style lang="scss">
.gangStart {
  max-width: 900px;
  margin: 0 auto;

  &__col {
    width: calc(50% - 24px);
    transform: rotate(-2deg);

    &:last-child {
      transform: rotate(2deg);
    }
  }

  &__icon {
    margin-bottom: 16px;
  }

  &__text {
    margin: 8px 0 20px;
  }
}
/*----------------------------------------*/

// 960
@include breakpoint(l) {
  .gangStart {
    &__columns {
      gap: 16px;
    }

    &__header {
      font-size: 20px;
    }

    &__text {
      font-size: 14px;
    }

    &__col {
      width: calc(50% - 8px);
    }
  }
}
/*----------------------------------------*/

// 750
@include breakpoint(m) {
  .gangStart {
    width: calc(100% + 64px);
    margin: 0 -32px;
  }
}
/*----------------------------------------*/

// 600
@include breakpoint(s) {
  .gangStart {
    width: 100%;
    margin: 0;

    &__col {
      width: 100%;
      transform: none;
    }

    &__col:last-child {
      transform: none;
    }
  }
}
/*----------------------------------------*/

// 400
@include breakpoint(xxs) {
  .gangStart {
    width: calc(100% + 64px);
    margin: 0 -32px;
  }
}
</style>
