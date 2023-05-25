import { defineStore } from 'pinia'
import Web3 from 'web3'

import { usePiratesStore } from './pirates'

import { buccaneerService } from '~/services/buccaneerService'
import config from '~/config/index'

export const useCryptoStore = defineStore({
  id: 'crypto',
  state: () => ({
    email: '',
    walletAddress: '',
    connected: false,
    whitelisted: false,
    donation: 0,
    // added by john
    isWalletConnected: false,
    isWhitelisted: false,
    mintingPrice: 0,
    totalTokenCount: 0
  }),
  getters: {
    formatWalletAddress: (state) => {
      return `${state.walletAddress.slice(0, 6)}...${state.walletAddress.slice(-4)}`
    }
  },
  actions: {

    connAndCheck() {
      this.connect()
    },

    async connect() {
      console.log('Connecting the metamaks...')
      if (typeof window.ethereum !== 'undefined') {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
          const networkID = await window.ethereum.request({ method: 'net_version' })
          const instance = new Web3(window.ethereum)
          // const networkId = await instance.eth.net.getId();
          if (networkID === '11155111') {
            // alert(`Connected to ${networkID} network`)
            this.walletAddress = accounts[0]
            this.connected = true
            this.isWalletConnected = true


            console.log('setting whiltelist')
            const result = await buccaneerService.isWhitelist(this.walletAddress)
            // const result = await buccaneerService.isWhitelist('0x687B632693dF5139b8b9C190F240DB894e0ff36d')
            this.isWhitelisted = result
            if (result)
              this.mintingPrice = config.whitelistPrice
            else
              this.mintingPrice = config.regularPrice


            console.log('getting total token count...') // should be updated after mints
            const totalTokenCount = await buccaneerService.getTokenCounts()
            this.totalTokenCount = totalTokenCount
            console.log('total count', totalTokenCount)

            // usePiratesStore().updatePirates()

          } else {
            if (confirm('Please connect to the Sepolia Network in Metamask to continue')) {
              window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0xaa36a7' }] // Sepolia Testnet
                // params: [{ chainId: '0xa4b1' }] // Arbitrum
              })
              this.walletAddress = accounts[0]
            } else {
              alert('Please connect to the Sepolia Network in Metamask to continue')
            }
          }
        } catch (error) {
          console.log(error)
          // alert('Please connect your wallet to join the whitelist')
        }
      } else {
        alert('Please install your metamask first.')
        return
      }
    },















    openDiscordLink() {
      window.open('https://discord.gg/', '_blank')
    },

    openDAVLink() {
      window.open('https://dav.org/', '_blank')
    },
    
    
    async directDonation() {
      console.log('starting directDonation()')
      try {
        // const { ethereum } = window
        // if (ethereum) {
        //   const provider = new ethers.providers.Web3Provider(ethereum)
        //   const signer = provider.getSigner()
        //   const whitelistContract = new ethers.Contract(contractAddress, contractABI.abi, signer)
          
        //   const overrides = {
        //     value: ethers.utils.parseEther(this.donation),
        //     gasLimit: 200000,
        //   }
         
        //   const tx = await whitelistContract.donateDirect(overrides)
        //   console.log('Mining...', tx.hash)
        //   await tx.wait()
        //   console.log('Mined --', tx.hash)
        // } // disabled by john
      } catch (e) {
        console.log('e', e)
      }
    },

    async getTreaBal() {
      try {
        // const { ethereum } = window
        // if (ethereum) {
        //   const provider = new ethers.providers.Web3Provider(ethereum)
        //   const balance = await provider.getBalance("0x70997970C51812dc3A010C7d01b50e0d17dc79C8")
        //   const ethBalance = ethers.utils.formatEther(balance)
        //   return ethBalance
        // } // diabledy by john
      } catch (e) {
        console.log('e', e)
      }
    },
    async getCharBal() {
      try {
        // const { ethereum } = window
        // if (ethereum) {
        //   const provider = new ethers.providers.Web3Provider(ethereum)
        //   const balance = await provider.getBalance("0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC")
        //   const ethBalance = ethers.utils.formatEther(balance)
        //   return ethBalance
        // } // diabledy by john
      } catch (e) {
        console.log('e', e)
      }
    },


  }
})
