## ERC1155 Implementation Minigame

This little arcade game demonstrates the usage of three ERC1155 tokens currently deployed on the Energi Testnet.
This first one increases the number of coins falling from the sky.
The second allows the knight to run faster.
The third slows down the game timer.

A user can purchase as many of these tokens as they want. Each token exponentially increases that specific game attribute.

Smart contracts can be deployed with `truffle console --network testnet` and then `deploy`.

If you make a fresh set of contracts, please update ABIs and contract address in FE code.

The frontend can be started by calling `index.html` via a live server.