// req
// {
//     "defender_id": 2,
//     "tx_hash": "0x0f278f2a44598b7f081b7293828031a361b0ad94689460d413e9cdef47293f49"
// }
import axios from "axios"
import config from "~~/config"

export default defineEventHandler(async (event) => {
  try {
    console.log('getDefenseStatus api')
    const body = await readBody(event)
    let res = await axios.post( config.battleServer + '/defend', {...body})
    console.log(res)
    return res.data || {}
  } catch (e) {
    console.log(e)
    // return e
  }
})
// res: 
// {
//     "defend_time": "2023-05-16T20:53:28.599957Z"
// }