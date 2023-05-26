import axios from "axios"
import config from "~~/config"

export default defineEventHandler(async (event) => {
  try {
    console.log('pirates api')
    const body = await readBody(event)
    console.log(body.address)
    let res = await axios.post(config.battleServer + '/metadata', { ...body })
    return res.data?.owner?.tokens || []
  } catch (e) {
    console.log(e)
    return e
  }
})