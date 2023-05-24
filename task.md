- write and implement contract calls for Mint, Attack, Defend & Train functions
- get and display updated data associated with each transaction
- get and display NFT data for each customer for carousel and NFT selection
- write and implement secure api calls from the Nuxt server
- replace all mock data currently in front end with data supplied from apis
- get treasure wallet balance for live display in ETH & USD
- get leaderboard data from api and populate leaderboard page
- identify data requirements from api
- ensure all links go to the right place


- ensure app can be built using Dockerfile
- ensure all api keys and urls are not exposed
- ensure all animations and effects work
- ensure quick map works
- advise of new requirements as discovered
- apply edits to content as needed (will be provided)
- participate in end-to-end testing



To bredan
{
    overview to the entire architecture of the project
    set the pipeline to connect the frontend to backend.
    set the pipeline to connect the smart contract
}

To Josh
{
    implemented contract call for Mint
    implemented api call from the nuxt server (https://battle-api-q7axzfehda-uc.a.run.app/metadata)
    get wallet info to pinia store and displayed in each page as it needed.
}
asking.
{
  - how to defince training status

  - provied me api call endpoint from backend
}

{
    implement contract call for Attack Defend Train
    implement api call from the nuxt server with the provied endpoints
}




Complete Nuxt app with smart contract/web3 services:

write and implement contract calls for Mint, Attack, Defend & Train functions
get and display updated data associated with each transaction
get and display NFT data for each customer for carousel and NFT selection
write and implement secure api calls from the Nuxt server
replace all mock data currently in front end with data supplied from apis
get treasure wallet balance for live display in ETH & USD
get leaderboard data from api and populate leaderboard page
identify data requirements from api
ensure all links go to the right place
ensure app can be built using Dockerfile
ensure all api keys and urls are not exposed
ensure all animations and effects work
ensure quick map works
advise of new requirements as discovered
apply edits to content as needed (will be provided)
participate in end-to-end testing


Our api takes in a transaction hash from a successful contract call and associated token ids via POST requests, below are the endpoints and request formats:

Method: POST
Description: Currently provides tokenIds owned by an address, will expand to provide all data needed based on front end requirement
URL: https://battle-api-q7axzfehda-uc.a.run.app/metadata
Request body:
{
    "address": "0x687B632693dF5139b8b9C190F240DB894e0ff36d"
}
-------------------------------------------------------------------------------------------------------------------------------
Method: POST
Description: Executes battle between two NFTs, updates off-chain state
URL: https://battle-api-q7axzfehda-uc.a.run.app/attack
Request body:
{
    "attacker_id": 0,
    "defender_id": 2,
    "tx_hash": "0xcfd7d80d235174f8caeb245005584b7e96aa950077c16d6fd7b42e0a7ba3f1cf"
}
-------------------------------------------------------------------------------------------------------------------------------
Method: POST
Description: Adds 24 hrs to NFT's defend time
URL: https://battle-api-q7axzfehda-uc.a.run.app/defend
Request body:
{
    "defender_id": 2,
    "tx_hash": "0x0f278f2a44598b7f081b7293828031a361b0ad94689460d413e9cdef47293f49"
}
-------------------------------------------------------------------------------------------------------------------------------
Method: POST
Description: Executes training on NFT, updates off-chain state
URL: https://battle-api-q7axzfehda-uc.a.run.app/train
Request body:
{
   "trainer_id": 0,
   "tx_hash": "0xf29312b5a8a0c40be044f0cf00348bde20feee52ad79a643efcb0de0f619da9f"
}