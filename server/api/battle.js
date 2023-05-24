import axios from "axios"

export default defineEventHandler(async (event) => {
  try {
    console.log('battle api')
    const body = await readBody(event)
    let res = await axios.post('https://battle-api-q7axzfehda-uc.a.run.app/attack', {...body})
    console.log(res)
    return {
      result: res.data?.battle || {}
    }
  } catch (e) {
    console.log(e)
    return e
  }
})