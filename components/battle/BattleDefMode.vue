<template>
  <section
    :class="{ 'battleDefMode--modal flex alignI--center justifyC--center pos--fix z--max': modal }"
    class="battleDefMode">

    <BasePanel locked class="battleDefMode__panel pos--rel z--2 ta--center">
      <BaseMapIcon class="battleDefMode__icon" type="defence" invert />
      <h2 class="battleDefMode__header ff--slab fs--24">You are in Defence Mode</h2>
      <BaseCountdown class="battleDefMode__countdown"> {{ timeStr }}</BaseCountdown>
      <p class="battleDefMode__text lh--140 o--7">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
      </p>
      <BaseBtn v-if="modal" class="battleDefMode__btn baseBtn--full" link="/">Back to Map</BaseBtn>
    </BasePanel>

    <div v-if="modal" class="battleDefMode__overlay pos--abs z--1" />

  </section>
</template>

<script>
import { usePiratesStore } from '~~/stores/pirates';

export default {
  name: 'BattleDefMode',
  props: {
    modal: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      timeStr: '',
    }
  },
  created() {
    this.setTimer()
  },
  methods: {
    setTimer() {
      let countDownTime = new Date(usePiratesStore().defendBuccs.pop().defend_time).getTime();
      let x = setInterval(() => {
        var now = new Date().getTime();
        let delta = countDownTime - now
        let str = ''
        var hours = Math.floor((delta % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        if (hours < 10)
          str = str + '0' + hours
        else
          str += hours
        str += ' : '
        var minutes = Math.floor((delta % (1000 * 60 * 60)) / (1000 * 60));
        if (minutes < 10)
          str = str + '0' + minutes
        else
          str += minutes
        str += ' : '
        var senconds = Math.floor((delta % (1000 * 60)) / 1000);
        if (senconds < 10)
          str = str + '0' + senconds
        else
          str += senconds
        this.timeStr = str

        if (delta < 0) {
          clearInterval(x);
          usePiratesStore().updateDefenceMode(false)
          this.$router.push('/battle')
        }

      }, 1000);
    }
  }
}
</script>

<style lang="scss">
.battleDefMode {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  &__panel {
    width: 100%;
    height: 100%;
  }

  &__header {
    margin: 8px 0 12px;
  }

  &__countdown {
    margin: 12px 0;
  }

  &__btn {
    margin-top: 16px;
  }

  //
  &__overlay {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(black, 0.8);
    border: none;
  }

  //
  &--modal .battleDefMode__panel {
    max-width: 420px;
    height: auto;
  }
}
/*----------------------------------------*/

// 750
@include breakpoint(m) {
  .battleDefMode {
    &__icon {
      width: 64px;
      height: 64px;
    }

    &__header {
      font-size: 20px;
    }
  }
}
/*----------------------------------------*/

// 500
@include breakpoint(xs) {
  .battleDefMode {
    &__panel {
      width: calc(100% + 32px);
      margin: 0 -16px;
      padding: 32px 40px;
    }
  }
}
</style>
