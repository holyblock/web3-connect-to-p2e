import BuccaneerAbi from '~/services/abi/Buccaneers.json'
import config from '~/config/index'

import BlockchainService from './blockchainService'

class BuccaneerService extends BlockchainService {
  constructor(contractAddress) {
    super()
    this.contractAddress = contractAddress
    this.contract = new this.web3.eth.Contract(BuccaneerAbi, contractAddress)
  }

  isWhitelist = async (address) => this.contract.methods.whitelist(address).call()
  getTokenCounts = async() => this.contract.methods.totalSupply().call()

  mintOpen = async () => this.contract.methods.mintOpen().call()
  
  mintBuccaneer = async (from, price) => {
    console.log("mintBuccaneer", from)
    console.log("mintBuccaneer", price)

    try {
      const dataAbi = this.contract.methods.mintBuccaneer().encodeABI()
      const txHash = await this.signTransaction(from, dataAbi, price*10**18)
      return txHash
    } catch (err) {
      console.log(err)
      return null
    }
  }

  attackBuccaneer = async (from, fromId, toId) => {
    console.log("attackBuccaneer", from)
    try {
      const dataAbi = this.contract.methods.attackBuccaneer(fromId, toId).encodeABI()
      const txHash = await this.signTransaction(from, dataAbi, config.attackPrice*10**18)
      return txHash
    } catch (err) {
      console.log(err)
      return null
    }
  }

  














  

  getAllProposal = async (start, end) =>
    this.contract.methods.getAllProposal(start, end).call()

  getProposalCount = async () => this.contract.methods.getProposalCount().call()

  getPermissionsOfLevel = async (level) =>
    this.contract.methods.getPermissionsOfLevel(level).call()

  addPermission = async (from, _level, _role) => {
    try {
      const dataAbi = this.contract.methods
        .addPermission(_level, _role)
        .encodeABI()
      const txHash = await this.signTransaction(from, dataAbi, 0)
      return txHash
    } catch (err) {
      console.log(err)
      return null
    }
  }

  deletePermission = async (from, _level, _index) => {
    try {
      const dataAbi = this.contract.methods
        .deletePermission(_level, _index)
        .encodeABI()
      const txHash = await this.signTransaction(from, dataAbi, 0)
      return txHash
    } catch (err) {
      console.log(err)
      return null
    }
  }

  approveProposal = async (from, index) => {
    try {
      const dataAbi = this.contract.methods.approveProposal(index).encodeABI()
      const txHash = await this.signTransaction(from, dataAbi, 0)
      return txHash
    } catch (err) {
      console.log(err)
    }
  }

  rejectProposal = async (from, index) => {
    try {
      const dataAbi = this.contract.methods.rejectProposal(index).encodeABI()
      const txHash = await this.signTransaction(from, dataAbi, 0)
      return txHash
    } catch (err) {
      console.log(err)
    }
  }

  createProposal = async (from, _contentURI, _isPublic) => {
    try {
      const dataAbi = this.contract.methods
        .createProposal(_contentURI, _isPublic)
        .encodeABI()
      const txHash = await this.signTransaction(from, dataAbi, 0)
      return txHash
    } catch (err) {
      console.log(err)
    }
  }
}

const buccaneerService = new BuccaneerService(config.buccaneer)

export default BuccaneerService
export { buccaneerService }
