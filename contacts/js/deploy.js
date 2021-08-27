const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')
const {abi, bytecode} = require('./compile')
const { mnemonic } = require('../../config')

const provider = new HDWalletProvider(mnemonic, 'http://localhost:8545')

const web3 = new Web3(provider)

const deploy = async () => {
  const accounts = await web3.eth.getAccounts( )
  const arguments = [
    'MyCoin', // Coin name
    'MCN', // Coin symbol
    '18', // Coin decimals
    '70000000', // Coin suply
  ]

  const gasEstimate = await new web3.eth.Contract(abi)
    .deploy({ data: bytecode, arguments })
    .estimateGas({ from: accounts[0] })

  const result = await new web3.eth.Contract(abi)
    .deploy({ data: bytecode, arguments })
    .send({gas: gasEstimate, from: accounts[0]})

  console.log("Contract deployed to", result.options.address);
}

deploy()