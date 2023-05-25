import { defineStore } from 'pinia'
import { useCryptoStore } from '~/stores/crypto'


export const usePiratesStore = defineStore('pirates', {
  state() {
    return {
      pirates: [],
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
      console.log('=================  updatePirates ====================')
      try {
        let req = {}
        req.address = useCryptoStore().walletAddress
        var res = await $fetch('/api/pirates', { method: 'post', body: req })
        let pirates = res.pirates || []
        this.pirates = pirates
        console.log(this.pirates)

      } catch (error) {
        console.log('store/pirates/updatePirates' + error)
      }





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
