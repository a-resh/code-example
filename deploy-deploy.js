const compiledContract = require('../build/TotemToken.json');

(async () => {
  const accounts = await web3.eth.getAccounts();

  console.log(`Attempting to deploy from account: ${accounts[0]}`);

  const deployedContract = await new web3.eth.Contract(compiledContract.abi)
    .deploy({
      data: '0x' + compiledContract.evm.bytecode.object,
      arguments: [3, 5],
    })
    .send({
      from: accounts[0],
      gas: '2000000',
    });

  console.log(
    `Contract deployed at address: ${deployedContract.options.address}`
  );

  provider.engine.stop();
})();
