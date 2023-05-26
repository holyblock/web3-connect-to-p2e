// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
import "../openzeppelin-contracts/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../openzeppelin-contracts/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "../openzeppelin-contracts/contracts/access/Ownable.sol";
import "../openzeppelin-contracts/contracts/utils/Strings.sol";

/**
 * @author  jdfwsp.
 * @title   Buccaneers.
 * @dev     double check for type matching and eliminate type casting.
 * @notice  Sets all fees and includes all payable functions for the PotC game.
 */
contract Buccaneers is ERC721URIStorage, ERC721Enumerable, Ownable {
    using Strings for uint16;

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
    event ActionReceipt(string action, uint tokenId);

    struct Fees {
        uint whitelistMintFee;
        uint mintFee;
        uint attackFee;
        uint defendFee;
        uint trainFee;
    }

    Fees private fees;

    string private baseURI = "https://dab-botb.mypinata.cloud/ipfs/";

    //hardhat addresses
    // address payable private our = payable(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266);
    // address payable private charity = payable(0x70997970C51812dc3A010C7d01b50e0d17dc79C8);
    // address payable private treasure = payable(0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC);

// sepolia addresses
    address payable private our = payable(0x7689DE2dd1D9DF3d442DCcFfAACb0017F5DDcc66);
    address payable private charity = payable(0x5FFb4861aBC8EF94f6E796e6790FA2C388783e3A);
    address payable private treasure = payable(0x086B8C2422931011418aB6AE6f872f5Fcf3AACab);

    address private winner;

    constructor() ERC721("BotB Test", "BOTBTG") {
        whitelist[0x687B632693dF5139b8b9C190F240DB894e0ff36d] = true;
        whitelist[0x90F79bf6EB2c4f870365E785982E1f101E93b906] = true;
        fees.whitelistMintFee = 0.00066 ether;
        fees.mintFee = 0.001 ether;
        fees.attackFee = 0.001 ether;
        fees.defendFee = 0.001 ether;
        fees.trainFee = 0.001 ether;
    }
// ----------------------------------------------------------------------------- OWNER OPERATION MODIFIERS & FUNCTIONS
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

    /**
     * @notice  Owner can close minting period.
     */
    function closeMint() external onlyOwner {
        mintOpen = false;
    }

    /**
     * @notice  Owner can open minting period.
     */
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
                "You must pay 0.00066 ether to mint a buccaneer"
            );
            refundIfOver(fees.whitelistMintFee);
        } else {
            require(mintOpen, "Minting is not open");
            require(
                msg.value >= fees.mintFee,
                "You must pay 0.001 ether to mint a buccaneer"
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
// ----------------------------------------------------------------------------- GAMEPLAY FUNCTIONS
    /**
     * @notice  Payable function that attacks another buccaneer.
     * @dev     primary function of gameplay.
     * @param   attacker  ID of attacking buccaneer.
     */
    function attackBuccaneer(uint16 attacker, uint16 defender) external onlyIndividual payable gameStatus {
        require(msg.value >= fees.attackFee, "You must pay 0.001 ether to attack another buccaneer");
        refundIfOver(fees.attackFee);
        require(ownerOf(attacker) == msg.sender, "You do not own this buccaneer");
        require(ownerOf(defender) != msg.sender, "You cannot attack yourself");
        bytes memory str = bytes("attack ");
        bytes memory num = bytes(defender.toString());
        bytes memory attack = abi.encodePacked(str, num);
        emit ActionReceipt(string(attack), attacker);
        _split(40, 40);
    }

    /**
     * @notice  Payable function for defending buccaneer.
     * @dev     consider lengthening protection time.
     * @param   defender  ID of buccaneer to defend.
     */
    function defendBuccaneer(uint16 defender) external onlyIndividual payable gameStatus {
        require(msg.value >= fees.defendFee, "You must pay 0.001 ether to defend your buccaneer");
        refundIfOver(fees.defendFee);
        require(ownerOf(defender) == msg.sender, "You do not own this buccaneer");
        emit ActionReceipt("defend", defender);
        _split(40, 40);
    }

    /**
     * @notice  Payable function for training all traits.
     * @dev     Maybe an onlyOwner function for airdrops.
     * @param   trainee  ID of buccaneer to train.
     */
    function trainBuccaneer(uint16 trainee) external onlyIndividual payable gameStatus {
        require(msg.value >= fees.trainFee, "You must pay 0.001 ether to train your buccaneer");
        refundIfOver(fees.defendFee);
        require(ownerOf(trainee) == msg.sender, "You do not own this buccaneer");
        // console.logUint(tokenId);
        emit ActionReceipt("train", trainee);
        _split(40, 40);
    }
// ----------------------------------------------------------------------------- HELPER FUNCTIONS

    function getTokensOwnedBy(address owner) external view returns (uint256[] memory) {
        uint256 tokenCount = balanceOf(owner);
        uint256[] memory tokenIds = new uint256[](tokenCount);

        for (uint256 i = 0; i < tokenCount; i++) {
            tokenIds[i] = tokenOfOwnerByIndex(owner, i);
        }

        return tokenIds;
    }

    function totalSupply() public view returns (uint256) {
        return _tokenIds;
    }

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

// ----------------------------------------------------------------------------- OVERRIDE FUNCTIONS

    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721URIStorage, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
