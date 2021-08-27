const addressContract = '0xfBBF0e83a5B26D4dbbFbDf1BaA411EDb9cA52438'
const abi = [{ "inputs": [{ "internalType": "string", "name": "name_", "type": "string" }, { "internalType": "string", "name": "symbol_", "type": "string" }, { "internalType": "uint8", "name": "decimals_", "type": "uint8" }, { "internalType": "uint256", "name": "totalSuply_", "type": "uint256" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "_owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "_spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "_value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "_from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "_to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "_value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "address", "name": "", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_spender", "type": "address" }, { "internalType": "uint256", "name": "_value", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "success", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_to", "type": "address" }, { "internalType": "uint256", "name": "_value", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "success", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_from", "type": "address" }, { "internalType": "address", "name": "_to", "type": "address" }, { "internalType": "uint256", "name": "_value", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "success", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }]

const Toast = Swal.mixin({
  toast: true,
  position: 'bottom-end',
  timer: 2000,
  timerProgressBar: true,
})

let web3, account, myCoin
const accountSelected = document.getElementById('accountSelected')
const metamaskBtn = document.getElementById('connectMetamask')

const balanceAddressInput = document.getElementById('balanceAddressInput')
const getBalanceBtn = document.getElementById('getBalanceBtn')
const addresBalance = document.getElementById('addresBalance')

const transferAddressInput = document.getElementById('transferAddressInput')
const transferAmountInput = document.getElementById('transferAmountInput')
const sendTransferButton = document.getElementById('sendTransferButton')

const init = () => {
  if(typeof window.ethereum !== 'undefined'){
    metamaskBtn.classList.remove('d-none')
    metamaskBtn.addEventListener('click', async (e) => {
      const accounts = await ethereum.request({method: 'eth_requestAccounts'})
      
      account = accounts[0]

      metamaskBtn.classList.add('d-none')

      accountSelected.innerHTML = account
      accountSelected.classList.add('border')
      accountSelected.classList.remove('d-none')

      Toast.fire({
        icon: 'success',
        title: 'Account connected'
      })

      web3 = new Web3(window.ethereum)
      myCoin = new web3.eth.Contract(abi, addressContract)

      window.ethereum.on('accountsChanged', detectChangeAccountHandler)

      balanceAddressInput.disabled = false
      getBalanceBtn.disabled = false
      getBalanceBtn.addEventListener('click', getBalanceHandle)

      transferAddressInput.disabled = false
      transferAmountInput.disabled = false
      sendTransferButton.disabled = false
      sendTransferButton.addEventListener('click', sendTansferHandle)
    })
  }
}

const getBalanceHandle = async () => {
  const balanceOf = await myCoin.methods.balanceOf(balanceAddressInput.value).call()
  const balance = web3.utils.fromWei(balanceOf, 'ether')
  addresBalance.innerHTML = balance
}

const detectChangeAccountHandler = (accounts) => {
  account = accounts[0]
  accountSelected.innerHTML = account

  Toast.fire({
    icon: 'success',
    tittle: 'Account changed'
  })
}

const sendTansferHandle = async () => {
  const toAddress = transferAddressInput.value
  const amount = web3.utils.toWei(transferAmountInput.value, 'ether') 
  console.log(amount);
  await myCoin.methods.transfer(toAddress, amount).send({from: account})

  transferAddressInput.value = ''
  transferAmountInput.value = ''

  Toast.fire({
    icon: 'success',
    tittle: 'Transfer sent'
  })
}

window.onload = init