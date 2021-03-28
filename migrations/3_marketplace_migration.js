const Token = artifacts.require('GameToken');
const Marketplace = artifacts.require('Marketplace');

module.exports = (deployer) => deployer
    .then( () => deployMarketplace(deployer));

    function deployMarketplace(deployer){
        return deployer.deploy(Marketplace, Token.address);
    }