// SPDX-License-Identifier: MIT
pragma solidity 0.8.2;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

contract GameToken is ERC20 {

    constructor (string memory name_, string memory symbol_, uint8 decimals_) ERC20(name_, symbol_, decimals_) {}

    function mint(address to, uint256 value) public returns (bool) {
        _mint(to, value);
        return true;
    }
    
}
