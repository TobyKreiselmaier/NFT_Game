const Token = artifacts.require('GameToken');

module.exports = (deployer) => deployer
    .then( () => deployToken(deployer));

    function deployToken(deployer){
        return deployer.deploy(Token);
    }