// SPDX-License-Identifier: MIT

pragma solidity 0.8.3;

import "./ERC20.sol";

contract GameToken is ERC20 { //0x019E9590Ad2dDaeD10FE3B525b0E7807727F9900 on Energi Testnet

    constructor (string memory name_, string memory symbol_, uint8 decimals_) ERC20(name_, symbol_, decimals_) {}

    function mint(address to, uint256 value) public returns (bool) {
        _mint(to, value);
        return true;
    }
    
}
