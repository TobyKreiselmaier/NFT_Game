pragma solidity 0.5.16;

import { ERC1155} from "../lib/ERC1155.sol";
import { ERC1155Mintable } from "../lib/ERC1155mintable.sol";

contract GameToken is ERC1155, ERC1155Mintable {

    constructor() public {

    }

}
