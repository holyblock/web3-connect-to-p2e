// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
import "../openzeppelin-contracts/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../openzeppelin-contracts/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "../openzeppelin-contracts/contracts/access/Ownable.sol";

/**
 * @author  jdfwsp.
 * @title   Buccaneers.
 * @dev     double check for type matching and eliminate type casting.
 * @notice  Sets all fees and includes all payable functions for the PotC game.
 */
contract Buccaneers is ERC721URIStorage, Ownable {
    bool public mintOpen = false;
    bool public gameOpen = false;
    uint private _tokenIds;
    uint private txCounter = 0;
    uint private rewardNonce = 0;

    mapping(address => bool) public whitelist;

    event TxReceipt(address owner, uint charity, uint treasure);
    event AirdropReceipt(uint tokenId, address owner);
    event NewBuccaneer(string message, uint tokenId, address owner);
    event BuccaneerURIUpdate(string message, uint tokenId, string uri);
    event BattleResult(string message, uint16 battleId, uint16 attackerId, uint16 defenderId, uint16 winnerId, uint16 loserId);
    event TrainingResult(string message, uint16 tokenId, string trainingType);
    event CharityReceipt(string message, uint charity);


    struct Fees {
        uint whitelistMintFee;
        uint mintFee;
        uint attackFee;
        uint defendFee;
        uint trainFee;
    }

    Fees private fees;

    string private baseURI = "https://dab-botb.mypinata.cloud/ipfs/";

    // Hardhat addresses 1, 2, 3
    // address payable private our =
    //     payable(address(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266));
    // address payable private charity =
    //     payable(address(0x70997970C51812dc3A010C7d01b50e0d17dc79C8));
    // address payable private treasure =
    //     payable(address(0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC));

// sepolia addresses
    address payable private our = payable(0x7689DE2dd1D9DF3d442DCcFfAACb0017F5DDcc66);
    address payable private charity = payable(0x5FFb4861aBC8EF94f6E796e6790FA2C388783e3A);
    address payable private treasure = payable(0x086B8C2422931011418aB6AE6f872f5Fcf3AACab);

    // Berlin VM on Remix addresses
    // address payable private charity = payable(address(0x583031D1113aD414F02576BD6afaBfb302140225));
    // address payable private treasure = payable(address(0xdD870fA1b7C4700F2BD7f44238821C26f7392148));
    // address payable private our = payable(address(0x5B38Da6a701c568545dCfcB03FcB875f56beddC4));

    address private winner;

    constructor() ERC721("BotB Test", "BOTBTG") {
        whitelist[0x687B632693dF5139b8b9C190F240DB894e0ff36d] = true;
        whitelist[0x90F79bf6EB2c4f870365E785982E1f101E93b906] = true;
        fees.whitelistMintFee = 0.066 ether;
        fees.mintFee = 0.1 ether;
        fees.attackFee = 0.01 ether;
        fees.defendFee = 0.01 ether;
        fees.trainFee = 0.01 ether;
    }
// ----------------------------------------------------------------------------- ADMIN OPERATION MODIFIERS & FUNCTIONS
    /**
     * @notice  Modifier to limit transactions to tx.origin.
     * @dev     .
     */
    modifier onlyIndividual() {
        require(msg.sender == tx.origin, "Function can only be called by an individual account.");
        _;
    }
    
    /**
     * @notice  Verifies that minting is allowed.
     */
    modifier mintingStatus() {
        require(mintOpen, "Minting is not open");
        _;
    }

    /**
     * @notice  Verifies that game is open.
     */
    modifier gameStatus() {
        require(gameOpen, "Game is not open");
        _;
    }

    /**
     * @notice  Owner can open minting period.
     */
    function openMint() external onlyOwner {
        mintOpen = true;
    }

    function openGame() external onlyOwner {
        gameOpen = true;
    }

    /**
     * @notice  Owner can close minting period.
     */
    function closeGame() external onlyOwner {
        mintOpen = false;
        gameOpen = false;
    }
    
// ----------------------------------------------------------------------------- ON-RAMP FUNCTIONS
    /**
     * @notice  Payable function that mints new PGP.
     * @dev     remove console.log.
     */
    function mintBuccaneer() external onlyIndividual payable {
        require(_tokenIds < 1944, "All buccaneers have been minted");
        if (whitelist[msg.sender] || msg.sender == our) {
            require(
                msg.value >= fees.whitelistMintFee,
                "You must pay 0.066 ether to mint a buccaneer"
            );
            refundIfOver(fees.whitelistMintFee);
        } else {
            require(mintOpen, "Minting is not open");
            require(
                msg.value >= fees.mintFee,
                "You must pay 0.1 ether to mint a buccaneer"
            );
            refundIfOver(fees.mintFee);
        }
        _safeMint(msg.sender, _tokenIds);
        string memory uriExtension = "placeholder";
        _setTokenURI(
            _tokenIds,
            string(abi.encodePacked(baseURI, uriExtension))
        );
        string memory message = "New Buccaneer minted";
        emit NewBuccaneer(message, _tokenIds, msg.sender);

        _tokenIds++;
        _split(25, 25);
    }

    /**
     * @notice  Owner only function to set the specific URI for a token.
     * @dev     Called from api after alchemy webhook.
     * @param   newURI  Specific IPFS URI.
     * @param   tokenId  Token ID for specifc NFT.
     */
    function updateURI(uint tokenId, string memory newURI) external onlyOwner {
        _setTokenURI(tokenId, string(abi.encodePacked(baseURI, newURI)));
    }

    /**
     * @notice  Owner only function to send battle results event.
     * @dev     Called from api after alchemy webhook.
     * @param   battleId Reference number for battle.
     * @param   attacker Buccaneer ID that initiated battle.
     * @param   defender Buccaneer ID that was attacked.
     * @param   Winner Victorious Buccaneer.
     * @param   loser Non-victorious Buccaneer.
     */
    function battleResults(uint16 battleId, uint16 attacker, uint16 defender, uint16 Winner, uint16 loser) external onlyOwner {
        string memory message = "Buccaneer Battle Results [Battle ID|Attacker|Defender|Winner|Loser]";
        emit BattleResult(message, battleId, attacker, defender, Winner, loser);
    }

    /**
     * @notice  Owner only function to send training results event.
     * @dev     Called from api after alchemy webhook.
     * @param   tokenId Buccaneer ID that got training.
     * @param   trainingType Specific training that happened.
     */
    function trainingResults(uint16 tokenId, string memory trainingType) external onlyOwner {
        string memory message = "Buccaneer training results [Token ID|Training Type]";
        emit TrainingResult(message, tokenId, trainingType);
    }
// ----------------------------------------------------------------------------- GAMEPLAY FUNCTIONS
    /**
     * @notice  Payable function that attacks another buccaneer.
     * @dev     primary function of gameplay.
     * @param   attacker  ID of attacking buccaneer.
     */
    function attackBuccaneer(uint16 attacker) external payable gameStatus {
        require(msg.value >= fees.attackFee, "You must pay 0.01 ether to attack another buccaneer");
        refundIfOver(fees.attackFee);
        require(ownerOf(attacker) == msg.sender, "You do not own this buccaneer");
        _split(40, 40);
    }

    /**
     * @notice  Payable function for defending buccaneer.
     * @dev     consider lengthening protection time.
     * @param   tokenId  ID of buccaneer to defend.
     */
    function defendBuccaneer(
        uint16 tokenId
    ) external payable gameStatus {
        require(msg.value >= fees.defendFee, "You must pay 0.01 ether to defend your buccaneer");
        refundIfOver(fees.defendFee);
        require(ownerOf(tokenId) == msg.sender, "You do not own this buccaneer");
        _split(40, 40);
    }

    /**
     * @notice  Payable function for training all traits.
     * @dev     Maybe an onlyOwner function for airdrops.
     * @param   tokenId  ID of buccaneer to train.
     */
    function trainBuccaneer(uint16 tokenId) external payable gameStatus {
        require(msg.value >= fees.trainFee, "You must pay 0.01 ether to train your buccaneer");
        refundIfOver(fees.defendFee);
        require(ownerOf(tokenId) == msg.sender, "You do not own this buccaneer");
        // console.logUint(tokenId);
        _split(40, 40);
    }
// ----------------------------------------------------------------------------- AIRDROP FUNCTIONS
    /**
     * @notice  Trains buccaneer in all 3 trait categories.
     * @dev     First iteration of this function.
     * @param   tokenId  ID of the NFT to be rewarded.
     */
    function airdrop(uint tokenId) external onlyOwner {
        emit AirdropReceipt(tokenId, msg.sender);
    }

    function totalSupply() public view returns (uint256) {
        return _tokenIds;
    }
// ----------------------------------------------------------------------------- FINANCIAL FUNCTIONS
    /**
     * @notice  Helper function to split income.
     * @dev     Verify no vulnerabilities.
     * @param   _charity  % going to charity.
     * @param   _treasure  % going to treasure.
     */
    function _split(uint _charity, uint _treasure) internal {
        uint _amount = msg.value / 100;
        uint charityAmount = _amount * _charity;
        uint treasureAmount = _amount * _treasure;

        (bool success, ) = charity.call{value: charityAmount}("");
        require(success, "Charity transfer failed");

        (success, ) = treasure.call{value: treasureAmount}("");
        require(success, "Treasure transfer failed");

        (success, ) = our.call{value: address(this).balance}("");
        require(success, "Our transfer failed");

        emit TxReceipt(msg.sender, charityAmount, treasureAmount);

        string memory message = "Donation to charity";
        emit CharityReceipt(message, charityAmount);
    }

    /**
     * @notice  Helper function to refund if overpaid.
     * @dev     Verify no vulnerabilities.
     * @param   price  Price of transaction.
     */
    function refundIfOver(uint256 price) private {
        require(msg.value >= price, "Not enough Ether sent");
        if (msg.value > price) {
            payable(msg.sender).transfer(msg.value - price);
        }
    }
}
