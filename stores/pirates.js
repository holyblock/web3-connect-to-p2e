import { defineStore } from 'pinia'
import { useCryptoStore } from '~/stores/crypto'


export const usePiratesStore = defineStore('pirates', {
  state() {
    return {
      pirates: null,
      battleState: 0,
      defenceMode: false,
      trainingState: 0,
      shareImage: null,
      selectedId: null,
      // added by john 
      attackeeId: -1,
      battleHash: ''
    }
  },
  getters: {
    getSelectedBuccaneer: (state) => {
      return state.pirates.find( p => p.id == state.selectedId)
    }
  },
  actions: {
    // get users nft data and populate store
    async updatePirates() {
      console.log('updatePirates')
      let req = {}
      req.address = useCryptoStore().walletAddress
      console.log('Request:', req)
      var res = await $fetch('/api/pirates', { method: 'post', body: req })
      console.log(res)
      let pirates = res.pirates || []
      this.pirates = pirates

    },

    //

    updateShareImage(pirateId) {
      this.shareImage = this.pirates[pirateId].endOfSeasonImg
    },
    updateBattleState(battleState, hash) {
      this.battleState = battleState
      this.battleHash = hash
    },
    updateAttackeeId(id) {
      this.attackeeId = id
    },



    updateDefenceMode(defenceMode) {
      this.defenceMode = defenceMode
    },
    updateTrainingState(trainingState) {
      this.trainingState = trainingState
    },
    updateSelectedId(selectedId) {
      this.selectedId = selectedId
      // this.selectedId = 15

    }
  }
})
