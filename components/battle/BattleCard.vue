<template>
  <BasePanel :class="'battleCard--' + battleState" class="battleCard ff--slab pos--rel" darker>
    <!--  -->

    <div class="battleCard__pirateHolder pos--rel">
      <NftCard class="battleCard__pirate pos--rel z--1" :image="pirate.image" :level="pirate.level" />
      <img
        v-show="battleStateImg === 1"
        class="battleCard__comic pos--abs xy--center z--2"
        src="/images/battle/kaboom.png" />
      <img
        v-show="battleStateImg === 2"
        class="battleCard__comic pos--abs xy--center z--2"
        src="/images/battle/plundered.png" />
      <img
        v-show="battleStateImg === 3"
        class="battleCard__comic pos--abs xy--center z--2"
        src="/images/battle/slash.png" />
      <img
        v-show="battleStateImg === 4"
        class="battleCard__comic pos--abs xy--center z--2"
        src="/images/battle/terminated.png" />
      <img
        v-show="battleStateImg === 5"
        class="battleCard__comic pos--abs xy--center z--2"
        src="/images/battle/zap.png" />
    </div>

    <div class="battleCard__info">
      <p class="battleCard__name fw--700 fs--20">{{ pirate.name }}</p>
      <div class="battleCard__records grid">
        <p class="battleCard__record">
          Won: <span class="fc--greenLight fw--700 fs--20">{{ pirate.wins }}</span>
        </p>
        <p class="battleCard__record">
          Lost: <span class="fc--redLight fw--700 fs--20">{{ pirate.losses }}</span>
        </p>
      </div>
      <!-- <BaseBtn class="battleCard__btn baseBtn--full">View Traits</BaseBtn> -->
    </div>

    <!--  -->
  </BasePanel>
</template>

<script>
export default {
  name: 'BattleCard',
  props: {
    pirate: {
      type: Object,
      default: null
    },
    battleState: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      battleStateImg: null
    }
  },
  watch: {
    battleState: {
      handler: function (val) {
        if (val === 'won') return

        const min = 1
        const max = 5
        const random = Math.floor(Math.random() * (max - min + 1) + min)

        this.battleStateImg = random
      }
    }
  }
}
</script>

<style lang="scss">
@keyframes comic {
  from {
    transform: translate(-50%, -50%) rotate(-3deg) scale(0);
  }
  to {
    transform: translate(-50%, -50%) rotate(-3deg) scale(1);
  }
}

.battleCard {
  &__pirate {
    width: calc(100% + 16px);
    margin: -8px -8px 0;
    height: auto;
    transition: opacity 0.5s ease;
  }

  &__info {
    transition: opacity 0.5s ease;
  }

  &__name {
    margin: 12px 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__records {
    grid-template-columns: 1fr 1fr;
  }

  &__record {
    color: rgba(white, 0.7);

    span {
      flex: 1;
    }
  }

  &__btn {
    margin-top: 20px;
    padding: 0;
  }

  //
  &__comic {
    width: 180%;
    max-width: 400px;
    top: 50%;
    pointer-events: none;
    transform: translate(-50%, -50%) rotate(-3deg) scale(0);
    animation: comic 0.5s ease forwards;
  }

  //
  .basePanel__bg {
    transition: opacity 0.5s ease;
  }

  //
  &--lost {
    .battleCard__pirate,
    .battleCard__info,
    .basePanel__bg {
      opacity: 0.5;
    }
  }
}
/*----------------------------------------*/

// 960
@include breakpoint(l) {
  .battleCard {
    padding: 24px;

    &__name {
      font-size: 16px;
    }

    &__record,
    &__record span {
      font-size: 14px;
    }
  }
}
</style>
