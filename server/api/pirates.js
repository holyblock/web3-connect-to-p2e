import axios from "axios"

export default defineEventHandler(async (event) => {
  try {
    console.log('pirates api')
    const body = await readBody(event)
    console.log(body.address)
    let res = await axios.post('https://battle-api-q7axzfehda-uc.a.run.app/metadata', { ...body })
    return {
      pirates: res.data?.owner?.tokens || []
    }
  } catch (e) {
    console.log(e)
    return e
  }
})