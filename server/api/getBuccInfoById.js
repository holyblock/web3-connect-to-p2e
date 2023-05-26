// `${config.battleServer}/bucc/${id}`
import axios from "axios"
import config from "~~/config"

export default defineEventHandler(async (event) => {
  try {
    console.log('getBuccInfoById')
    const data = await readBody(event)
    console.log(data.id)
    // console.log(body.address)
    let res = await axios.get(`${config.battleServer}/bucc/${data.id}`)
    return res.data?.buccaneer || {}
  } catch (e) {
    console.log(e)
    return e
  }
})