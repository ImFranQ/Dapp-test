const path = require('path')
const fs = require('fs')
const compiler = require('solc')

const solPath = path.join(__dirname, '../MyCoin.sol')
const code = fs.readFileSync(solPath, 'utf-8')

const solcSettings = {
  language: 'Solidity',
  sources: {
    'MyCoin.sol': {
      content: code
    }
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*']
      }
    }
  }
}

const output = JSON.parse(compiler.compile(JSON.stringify(solcSettings)))

module.exports = {
  abi: output.contracts['MyCoin.sol'].MyCoin.abi,
  bytecode: output.contracts['MyCoin.sol'].MyCoin.evm.bytecode.object
}
