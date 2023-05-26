import { defineStore } from 'pinia'
import { useCryptoStore } from '~/stores/crypto'


export const usePiratesStore = defineStore('pirates', {
  state() {
    return {
      pirates: [],
      defenceMode: false,
      shareImage: null,
      battleState: 0, // for attack
      trainingState: 0, // for training
      selectedId: -1, // for attack, training
      attackeeId: -1, // for attack
      battleHash: '', // for attack
      defendState: 0, // for defend
      defendBuccs: []

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
        var pirates = await $fetch('/api/getAllMyBuccs', { method: 'post', body: req })
        this.pirates = pirates
        this.updateDefendedBuccs()
        console.log(this.pirates)
        console.log(this.defendBuccs)
        // if (this.defendBuccs.length > 0)
        //   this.defenceMode = true
        console.log(this.defenceMode)
        
      } catch (error) {
        console.log('store/pirates/updatePirates' + error)
      }
    },
    async updatePirateAfterDef(res) {
      this.pirates.find(p => p.id == this.selectedId).defend_time = res.defend_time
      console.log(this.pirates)
      this.updateDefendedBuccs()
    },
    updateDefendedBuccs () {
      this.defendBuccs = this.pirates.filter(p => new Date(p.defend_time).getTime() > Date.now())
      this.defendBuccs.sort((a, b) =>  new Date(a.defend_time).getTime() - new Date(b.defend_time).getTime())
      // if (this.defendBuccs.length > 0)
        //   this.defenceMode = true
    },


    async setDefenseStatus() {
      console.log('setDefenseStatus')


    },
    async updatePiratesByOne(pirate) {
      try {
        console.log('updatePiratesByOne')
        console.log(pirate);
      } catch (error) {
        console.log('store/pirates/updatePiratesByOne' + error)
      }
    },
    updateDefenceState(state) {
      try {
        this.defendState = state
        console.log(this.defendState)
      } catch (error) {
        console.log('store/pirates/updateDefenceState' + error)
      }
    },
    initiateAttackStatus() {
      this.selectedId = -1
      this.attackeeId = -1
      this.battleHash = ''
      this.battleState = 0

    },
    initiateDefendStatus() {

    },
    initiateBattleStatus() {

    },
    initiateDefendStatus() {

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
