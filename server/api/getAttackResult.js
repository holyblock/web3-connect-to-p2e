// {
//   "attacker_id": 15,
//   "defender_id": 1,
//   "tx_hash": "0x70fa065e776ca3d18a4d3baface0734d145a2774db6816942b0ea49f18d09c4b"
// }

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

// {
//   "battle": {
//       "attacker_id": 15,
//       "defender_id": 1,
//       "winner_id": 15,
//       "loser_id": 1
//   }
// }