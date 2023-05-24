<template>
  <div class="theSite">
    <GlobalHeader />
    <NuxtPage />
    <SceneStorm />
    <QuickAccessOverlay />
    <QuickAccessMenu class="thePage__menu" :class="{ 'thePage__menu--open': menu && page !== 'index' }" />
    <QuickAccessBtn v-if="page !== 'index' && page !== 'end-of-season'" />
    <ModalBase v-if="modal" />
    <GlobalAlert :header="alert?.header" :status="alert?.status" />

    <BattleDefMode v-if="page === 'training' && defenceMode" modal />
  </div>
</template>

<script>
import { useGlobalStore } from '~/stores/global'
import { usePiratesStore } from '~/stores/pirates'

import * as Stats from 'stats.js'

export default {
  name: 'LayoutDefault',
  data() {
    return {
      showStats: false
    }
  },
  // async created() {
 
  //   // this.checkNetStatus()
  // },
  computed: {
    ...mapState(useGlobalStore, ['menu', 'page', 'modal', 'alert']),
    ...mapState(usePiratesStore, ['defenceMode'])
  },
  beforeMount() {
    const route = useRoute()
    useGlobalStore().updatePage(route.name)
  },
  async mounted() {
    // stats.js
    if (!this.showStats) return

    this.stats = new Stats()
    this.stats.showPanel(0)
    document.body.appendChild(this.stats.dom)
    requestAnimationFrame(this.statsUpdate)
    console.log('default mount')
    await usePiratesStore().updatePirates()


  },
  methods: {
    // async checkNetStatus() {
    //   console.log('checkNetStatus')
    //   let req = {}
    //   req.address = '0x664751e25f5583cA9d3D26157f3eF11Ea6195B27'
    //   var { data } = await $fetch('/api/pirates', { method: 'post', body: req })
    //   console.log(data)
    // },
    statsUpdate() {
      this.stats.begin()
      this.stats.end()
      requestAnimationFrame(this.statsUpdate)
    }
  }
}
</script>

<style lang="scss">
.theSite {
  background: #2f3d47;
}

.thePage {
  min-height: calc(100vh - 120px);
  padding: 0 0 100px;
}

/*----------------------------------------*/

// 750
@include breakpoint(m) {
  .thePage {
    padding-top: 100px;
    min-height: calc(100vh - 96px);

    &--home {
      padding-top: 0;
    }
  }
}
</style>
