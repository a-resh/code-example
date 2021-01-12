# What is TotemFI?

TotemFI is a community-driven Decentralised Finance (DeFI) platform which provides access to prediction markets using blockchain technology to solve issues with traditional markets. This innovative, minimal-risk prediction protocol rewards individuals and groups of users for accurately predicting the price of a given asset or outcome of an event. Initially TotemFI will focus on the price of Bitcoin (BTC), with expansion to other coins and events due further along the roadmap.

## Totem token

The totem token is created for operations within our system. You can find the contract of your Totem Token at the following link.

```bash
There will be a fixed supply of TOTM - 10 million.
```
Link in test net:
[Ropsten](https://ropsten.etherscan.io/address/0x3d7110669742df6bff99bbf5b6d579ee1767de16#code)


## Structure of contracts batch
At the moment, the project contains several contracts that implement the logic of the token itself, its distribution, control over the creation of draws and the draws themselves.

`TotemToken.sol` - the token itself with a description and the number of issued tokens

`Distribution.sol` - description of token distribution

`PlaygroundMain.sol` - draw management and creation of new draws

`PlaygrounRound.sol` - a description of the logic of a single draw
## License
[UNLICENSED](https://choosealicense.com/licenses/UNLICENSED/)