import { defineStore } from 'pinia'
import { ethers } from 'ethers'
// import contractABI from './Pirates.json'
// const contractAddress = '0x5fbdb2315678afecb367f032d93f642f64180aa3'

export const useCryptoStore = defineStore({
  id: 'crypto',
  state: () => ({
    email: '',
    walletAddress: '0x0000000000000000000000000000000000000000',
    connected: false,
    whitelisted: false,
    donation: 0,
  }),
  getters: {
    formatWalletAddress: (state) => {
      return `${state.walletAddress.slice(0, 6)}...${state.walletAddress.slice(-4)}`
    }
  },
  actions: {
    async directDonation() {
      console.log('starting directDonation()')
      try {
        const { ethereum } = window
        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum)
          const signer = provider.getSigner()
          const whitelistContract = new ethers.Contract(contractAddress, contractABI.abi, signer)
          
          const overrides = {
            value: ethers.utils.parseEther(this.donation),
            gasLimit: 200000,
          }
         
          const tx = await whitelistContract.donateDirect(overrides)
          console.log('Mining...', tx.hash)
          await tx.wait()
          console.log('Mined --', tx.hash)
        }
      } catch (e) {
        console.log('e', e)
      }
    },

    async getTreaBal() {
      try {
        const { ethereum } = window
        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum)
          const balance = await provider.getBalance("0x70997970C51812dc3A010C7d01b50e0d17dc79C8")
          const ethBalance = ethers.utils.formatEther(balance)
          return ethBalance
        }
      } catch (e) {
        console.log('e', e)
      }
    },
    async getCharBal() {
      try {
        const { ethereum } = window
        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum)
          const balance = await provider.getBalance("0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC")
          const ethBalance = ethers.utils.formatEther(balance)
          return ethBalance
        }
      } catch (e) {
        console.log('e', e)
      }
    },

    async connAndCheck() {
      this.connect()
      this.checkWhitelist()
    },
    async checkWhitelist() {
      try {
        const { ethereum } = window
        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum)
          const signer = provider.getSigner()
          const whitelistContract = new ethers.Contract(contractAddress, contractABI.abi, signer)
          const whitelisted = await whitelistContract.checkWhitelist()
          console.log('whitelisted', whitelisted)
          this.whitelisted = whitelisted
          return whitelisted
        }
      } catch (e) {
        console.log('e', e)
      }
    },

    async getWhitelisted() {
      console.log('starting getWhitelisted()')
      try {
        const { ethereum } = window
        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum)
          const signer = provider.getSigner()
          const whitelistContract = new ethers.Contract(contractAddress, contractABI.abi, signer)
          
          const overrides = {
            value: ethers.utils.parseEther('0.1'),
            gasLimit: 200000,
          }
         
          const tx = await whitelistContract.getWhitelisted(overrides)
          console.log('Mining...', tx.hash)
          await tx.wait()
          console.log('Mined --', tx.hash)
        }
      } catch (e) {
        console.log('e', e)
      }
    },

    async getTotal() {
      try {
        const { ethereum } = window
        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum)
          const signer = provider.getSigner()
          const whitelistContract = new ethers.Contract(contractAddress, contractABI.abi, signer)
          const count = await whitelistContract.getTotal()
          console.log('count', count)
          return count
        }
      } catch (e) {
        console.log('e', e)
      }
    },
    
    openDiscordLink() {
      window.open('https://discord.gg/', '_blank')
    },

    openDAVLink() {
      window.open('https://dav.org/', '_blank')
    },
    
    async connect() {
      if (typeof window.ethereum !== 'undefined') {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
          const networkID = await window.ethereum.request({ method: 'net_version' })
          if (networkID === '11155111') {
            alert(`Connected to ${networkID} network`)
            this.walletAddress = accounts[0]
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
          alert('Please connect your wallet to join the whitelist')
        }
      }
      this.connected = true
    }
  }
})
