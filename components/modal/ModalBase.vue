<template>
  <div class="modalBase flex alignI--center justifyC--center pos--fix z--max">

    <div class="modalBase__contentHolder pos--abs ta--center z--2">
      <div class="modalBase__content flex flex--dirC flex--nowrap justifyC--between">
        <div class="modalBase__contentMain">
          <BaseLevel v-if="modal.level" :level="modal.level" class="modalBase__level" />

          <h2 class="modalBase__header ff--slab fs--28">{{ modal.header }}</h2>
          <p v-if="modal.text" class="modalBase__text fw--500 lh--140 o--7">{{ modal.text }}</p>

          <div v-if="modal.image" class="modalBase__image">
            <img :src="modal.image" alt="" />
          </div>

          <div v-if="modal.settings" class="modalBase__settings grid gap--16">
            <BaseToggle class="modalBase__setting" label2="Animations" />
            <BaseToggle class="modalBase__setting" label2="Music" />
          </div>

          <div v-if="modal.upgradeLevelTo" class="modalBase__upgrade flex placeI--center justifyC--center gap--12">
            <BaseLevel :level="modal.upgradeLevelTo - 1" class="modalBase__upgradeLevel" />
            <IconArrow class="modalBase__upgradeArrow" />
            <BaseLevel :level="modal.upgradeLevelTo" class="modalBase__upgradeLevel" />
          </div>

          <div v-if="modal.totalFee" class="modalBase__totalFee flex alignI--center justifyC--between pos--rel">
            <p class="modalBase__totalFeeLabel fs--20 ff--slab fw--600 o--5 pos--rel z--2">Total Fee:</p>
            <BaseCurrency :value="modal.totalFee" class="modalBase__totalFeeAmount pos--rel z--2" size="small"
              showCurrency />
            <SvgBg1 class="modalBase__totalFeeBg pos--abs z--1" />
          </div>

          <div v-if="modal.breakdown" class="modalBase__breakdown ta--left">
            <p class="modalBase__breakdownLabel fs--16 fw--500 o--5">Fee breakdown:</p>
            <div v-for="(el, i) in modal.breakdown" :key="el + i"
              class="modalBase__breakdownItem flex alignI--center justifyC--between">
              <p class="modalBase__breakdownItemLabel fs--20 ff--slab fw--600 o--5 pos--rel z--2">{{ el.label }}</p>
              <BaseCurrency :value="el.value" class="modalBase__breakdownItemAmount pos--rel z--2" size="small"
                showCurrency />
            </div>
          </div>

          <div v-if="modal.battle" class="modalBase__battles flex justifyC--center gap--8">
            <div v-for="(val, key) in modal.battle" :key="val + key" class="modalBase__battle pos--rel">
              <p class="modalBase__battleLabel fs--14 lh--140 tt--capital pos--rel z--2">{{ key }}:</p>
              <p class="modalBase__battleStat fw--600 lh--140 pos--rel z--2">{{ val }}</p>
              <SvgBg2 class="modalBase__battleBg pos--abs inset z--1" />
            </div>
          </div>
        </div>

        <div v-if="modal.btns" class="modalBase__btns flex justifyC--between gap--8">
          <BaseBtn v-for="(el, i) in modal.btns" :key="el + i" :color="el.color" :icon="el.icon" :loading="loading"
            :type="el.type"
            :class="[{ 'baseBtn--full': !modal.btnsInline }, { 'baseBtn--socialIcon': el.type === 'icon' }]"
            class="modalBase__btn" @click="buttonFunc(el.function)">
            {{ el.label }}
          </BaseBtn>
        </div>

        <div v-if="modal.socialBtns" class="modalBase__socialBtns flex justifyC--between gap--8">
          <BaseBtn v-for="(el, i) in modal.socialBtns" :key="el + i" :color="el.color" :icon="el.icon" :loading="loading"
            :type="el.type"
            :class="[{ 'baseBtn--full': !modal.btnsInline }, { 'baseBtn--socialIcon': el.type === 'icon' }]"
            class="modalBase__btn" @click="buttonFunc(el.function)">
            {{ el.label }}
          </BaseBtn>
        </div>
      </div>

      <div class="modalBase__borderHolder pos--abs">
        <img src="/images/modal/top-border.png" class="modalBase__border modalBase__border--top pos--abs z--1" />
        <img src="/images/modal/left-border.png" class="modalBase__border modalBase__border--left pos--abs" />
        <img src="/images/modal/right-border.png" class="modalBase__border modalBase__border--right pos--abs" />
        <img src="/images/modal/bottom-border.png" class="modalBase__border modalBase__border--bottom pos--abs" />
      </div>

      <!-- <button
        class="modalBase__scrollIndicator fc--white pos--abs x--center z--2"
        :class="{ 'modalBase__scrollIndicator--inactive': isUserScrolledToBottom }"
        @click="scrollToBottom">
        <p class="ff--slab fs--14 fw--600">Scroll for more</p>
        <IconArrow />
      </button> -->

      <button class="modalBase__close pos--abs z--max" @click="closeModal">
        <img src="/images/modal/close.png" />
      </button>
    </div>

    <div class="modalBase__overlay pos--abs z--1" @click="closeModal" />

    <!--  -->
  </div>
</template>

<script>
import { useGlobalStore } from '~/stores/global'
import { usePiratesStore } from '~/stores/pirates'
import { useGangsStore } from '~/stores/gangs'
import { useCryptoStore } from '~/stores/crypto'

import { buccaneerService } from '~/services/buccaneerService'




import SvgBg1 from '~/assets/svgs/highlights/shape1.svg'
import SvgBg2 from '~/assets/svgs/interface/btn-bg.svg'
import IconArrow from '~/assets/svgs/interface/arrow-head.svg'

export default {
  name: 'ModalBase',
  components: {
    SvgBg1,
    SvgBg2,
    IconArrow
  },
  data() {
    return {
      global: useGlobalStore(),
      pirates: usePiratesStore(),
      gangs: useGangsStore(),
      isUserScrolledToBottom: false,
      loading: false
    }
  },
  computed: {
    ...mapState(useGlobalStore, ['modal'])
  },
  mounted() {
    this.getIsUserScrolledToBottom()

    window.addEventListener('resize', this.getIsUserScrolledToBottom)
    this.$el.querySelector('.modalBase__content').addEventListener('scroll', this.getIsUserScrolledToBottom)
  },
  methods: {

    buttonFunc(type) {
      console.log(type) // added by john
      switch (type) {
        case 'joinDiscord':
          this.joinDiscord()
          break
        case 'toGangs':
          this.toGangs()
          break
        case 'battleHeadBack':
          this.battleHeadBack()
          break
        case 'attackAgain':
          this.battleHeadBack() // temp
          break
        case 'confirmTransaction':
          this.mintBuccaneer() // temp
          break
        case 'attackBuccaneer':
          this.attackBuccaneer()
          break
        case 'trainBuccaneer':
          this.trainBuccaneer()
          break
        case 'defendBuccaneer':
          this.defendBuccaneer()
          break
      }
    },

    async mintBuccaneer() {
      try {
        this.loading = true
        this.showPendingAlert()

        const hash = await buccaneerService.mintBuccaneer(useCryptoStore().walletAddress, useCryptoStore().mintingPrice)
        console.log('minting sucess', hash)

        if (hash) {  
          this.showResultAlert()
          setTimeout(async () => {
            await usePiratesStore().updatePirates()
            this.loading = false
            this.global.updateModal(null)
            navigateTo('/my-buccaneers/')
            this.global.updateAlert(null)
          }, 3000)
        } else {
          this.loading = false
          this.global.updateModal(null)
          this.$router.push('/mint')
        }

      } catch (err) {
        console.log('vue/modalbase/mintBuccaneer' + err)
        this.$router.push('/mint')
      }
    },

    async trainBuccaneer() {
      try {
        console.log('trainBuccaneer')

        this.loading = true
        this.showPendingAlert()

        let address = useCryptoStore().walletAddress
        let trainId = usePiratesStore().selectedId

        // let hash = await buccaneerService.trainBuccaneer(address, trainId)

        this.loading = false
        this.global.updateModal(null)
        this.showResultAlert()

        setTimeout(async () => {
          // await usePiratesStore().updatePirates()
          navigateTo('/training')
          this.global.updateAlert(null)
        }, 3000)

      } catch (err) {
        console.log('vue/modalbase/trainBuccaneer' + err)
        this.$router.push('/training')
      }

    },

    async attackBuccaneer() {
      try {
        console.log('attackBuccaneer')

        this.loading = true
        this.showPendingAlert()

        let address = useCryptoStore().walletAddress
        let fromId = usePiratesStore().selectedId
        let toId;
        if (usePiratesStore().attackeeId < 0) {
          toId = await this.defineToId()
          usePiratesStore().updateAttackeeId(toId)
        } else
          toId = usePiratesStore().attackeeId
        
        // let hash = await buccaneerService.attackBuccaneer(address, fromId, toId)
        let hash = '0x70fa065e776ca3d18a4d3baface0734d145a2774db6816942b0ea49f18d09c4b'

        this.loading = false
        this.global.updateModal(null)
        this.showResultAlert()

        setTimeout(async () => {
          // await usePiratesStore().updatePirates()
          let req = {}
          req.id = usePiratesStore().selectedId
          var res = await $fetch('/api/getBuccInfoById', {method: 'post', body : req})
          console.log(res)
          usePiratesStore().updatePiratesByOne(res)

          this.global.updateAlert(null)
          this.pirates.updateBattleState(3, hash)
        }, 3000)
      } catch (err) {
        console.log('vue/modalbase/attackBuccaneer' + err)
        usePiratesStore().initiateAttackStatus()
        this.$router.push('/battle')
      }
    },

    async defendBuccaneer() {
      try {
        console.log('defendBuccaneer')

        this.loading = true
        this.showPendingAlert()

        let address = useCryptoStore().walletAddress
        let defendId = usePiratesStore().selectedId

        console.log(address)
        console.log(defendId)

        let hash = await buccaneerService.defendBuccaneer(address, defendId)
        console.log(hash)

        this.loading = false
        this.global.updateModal(null)
        this.showResultAlert()

        setTimeout(async () => {
          // await usePiratesStore().updatePirates()
          // navigateTo('/training')
          let req = {}
          req.defender_id = defendId
          req.tx_hash = hash
          let res = await $fetch('/api/getDefenseStatus', { method: 'post', body: req })
          console.log(res)
          usePiratesStore().updatePirateAfterDef(res)
          usePiratesStore().updateDefenceMode(true)
          this.$router.push('/battle')
          // this.global.updateAlert(null)
        }, 3000)

      } catch (err) {
        console.log('vue/modalbase/defendBuccaneer' + err)
        usePiratesStore().initiateAttackStatus()
        this.$router.push('/battle')
      }

    },




    // button functions
    joinDiscord() {
      // open discord in a new tab
      window.open('https://discord.com/', '_blank').focus()
    },

    toGangs() {
      // transition to gangs page
      navigateTo('/gangs/')

      // close modal and quick access menu
      this.global.updateModal(null)
      this.global.updateMenu(false)
    },

    battleHeadBack() {
      this.pirates.updateBattleState(0)
      this.global.updateModal(null)
    },







    // get to know how the state should be updated
    // const route = useRoute()
    // if (route.name === 'mint') navigateTo('/my-buccaneers/')
    // if (route.name === 'battle' && this.pirates.battleState === 0) this.pirates.updateDefenceMode(true)
    // if (route.name === 'battle' && this.pirates.battleState === 2) this.pirates.updateBattleState(3)
    // if (route.name === 'gangs') this.gangs.updateState(3) // disabled by john








    // internal functions
    showPendingAlert() {
      let pendingMsg = {
        header: 'Confirming Transaction',
        status: 'Pending...'
      }
      this.global.updateAlert(pendingMsg)
    },

    showResultAlert() {
      let resultMsg = {
        header: 'Confirming Transaction',
        status: 'Successful'
      }
      this.global.updateAlert(resultMsg)
    },

    generateRandom(min, max, exclude) {
      let random;
      while (!random) {
        const x = Math.floor(Math.random() * (max - min + 1)) + min;
        if (exclude.indexOf(x) === -1) random = x;
      }
      return random;
    },
    defineToId() {
        let myIds = usePiratesStore().pirates.map((pirate) => pirate.id)
        let max = useCryptoStore().totalTokenCount
        return this.generateRandom(0, max, myIds)
    },
    // base modal related
    getIsUserScrolledToBottom() {
      const content = this.$el.querySelector('.modalBase__content')

      if (content.clientHeight === content.scrollHeight) {
        this.isUserScrolledToBottom = true
        return
      }

      this.isUserScrolledToBottom = content.scrollTop + content.clientHeight > content.scrollHeight - 5
    },
    scrollToBottom() {
      const content = this.$el.querySelector('.modalBase__content')

      content.scrollTo({
        top: content.scrollHeight - content.clientHeight,
        left: 0,
        behavior: 'smooth'
      })
    },
    closeModal() {
      this.global.updateModal(null)
    },



  }
}
</script>

<style lang="scss">
.modalBase {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: opacity 0.3s ease, visibility 0.3s ease;

  &__contentHolder {
    width: calc(100% + 48px);
    max-width: 600px;
    // transform: scale(0.95);
    transition: transform 0.8s $easeCubic, opacity 0.8s $easeCubic;
  }

  &__content {
    height: calc(100vh - 40px);
    max-height: 560px;
    padding: 64px 104px 80px;
    background: #2f1f19 url('/images/modal/background.png') bottom center;
    background-size: cover;
    clip-path: polygon(0 0, 100% 0, 95% 100%, 5% 100%);
    overflow-x: hidden;
    overflow-y: auto;
  }

  //
  &__level {
    width: 80px;
    height: 80px;
    margin: 0 auto 24px;

    .baseLevel__value {
      font-size: 40px;
    }
  }

  &__header {
    margin-bottom: 12px;
  }

  &__text {
    margin-bottom: 24px;
  }

  &__image {
    max-width: 100%;
    overflow: hidden;
    max-height: 200px;
    border: 1px solid rgba(255, 255, 255, 0.4);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center bottom;
    }
  }

  //
  &__upgrade {
    margin-bottom: 16px;
  }

  &__upgradeLevel:first-child .baseLevel__bg {
    opacity: 0.5;
  }

  &__upgradeArrow {
    fill: #4d3038;
    width: 40px;
    height: 40px;
    display: block;
    transform: rotate(-90deg);
  }

  //
  &__totalFee {
    padding: 24px 0;
    margin-bottom: 24px;
  }

  &__totalFeeBg {
    left: -104px;
    right: -104px;
    fill: #4d3038;
  }

  //
  &__breakdownLabel {
    margin-bottom: 8px;
  }

  &__breakdownItem {
    margin-bottom: 8px;
  }

  //
  &__btns {
    margin-top: 32px;
  }

  &__btn {
    flex: 1;

    &.baseBtn--full {
      flex: auto;
    }
  }

  //

  &__socialBtns {
    &__btns {
      margin-top: 32px;
    }

    &__btn {
      flex: 1;

      &.baseBtn--full {
        flex: auto;
      }
    }
  }

  //
  &__battles {
    margin: 24px 0 0;
  }

  &__battle {
    width: 80px;
    padding: 16px 0 14px;

    &:first-child {
      color: $greenLight;
    }

    &:last-child {
      color: $redLight;
    }
  }

  &__battleBg {
    fill: #3c2c27;
    width: 100%;
    height: 100%;
    stroke: none;
  }

  //
  &__close {
    top: -44px;
    right: 6px;
    padding: 0;
    background: none;
    border: none;
    cursor: pointer;

    img {
      width: 100%;
    }
  }

  //
  &__borderHolder {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  &__border {
    &--top {
      top: 0;
      left: 50%;
      width: calc(100% + 90px);
      transform: translate(-52%, -58%);
    }

    &--left {
      top: 0;
      left: 0;
      width: 94px;
      height: 100%;
      transform: translateX(-25%);
    }

    &--right {
      top: 0;
      right: 0;
      width: 94px;
      height: 100%;
      transform: translateX(25%);
    }

    &--bottom {
      bottom: 0;
      left: 50%;
      width: calc(100% + 70px);
      transform: translate(-50%, 60%);
    }
  }

  //
  &__scrollIndicator {
    bottom: -20px;
    background: none;
    border: none;
    cursor: pointer;
    transition: opacity 0.2s;

    &--inactive {
      opacity: 0;
    }

    svg {
      width: 24px;
      margin-top: 4px;
    }
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
  // &--isOpen .modalBase__contentHolder {
  //   transform: scale(1);
  //   opacity: 1;
  // }
}

/*----------------------------------------*/

// 750
@include breakpoint(m) {
  .modalBase {
    &__contentHolder {
      width: 100%;
      max-width: none;
    }

    &__content {
      clip-path: none;
      max-height: none;
      height: calc(100vh - 200px);
      padding: 64px 40px 80px;
    }

    &__border--left,
    &__border--right {
      display: none;
    }
  }
}

/*----------------------------------------*/

// 500
@include breakpoint(xs) {
  .modalBase {
    &__content {
      height: calc(100vh - 160px);
      padding: 56px 32px 64px;
    }

    &__header {
      font-size: 24px;
    }

    &__totalFeeLabel,
    &__breakdownItemLabel {
      font-size: 18px;
    }

    &__close {
      width: 40px;
      height: 40px;
      top: -34px;
      right: 16px;
    }

    &__socialBtns {
      justify-content: center;
      max-width: 220px;
      margin: 0 auto;
      width: 100%;
    }
  }
}

/*----------------------------------------*/

// 400
@include breakpoint(xxs) {
  .modalBase {
    &__content {
      height: calc(100vh - 140px);
      padding: 48px 24px 48px;
    }

    &__header {
      font-size: 20px;
    }

    &__totalFeeLabel,
    &__breakdownItemLabel {
      font-size: 16px;
    }
  }
}
</style>
