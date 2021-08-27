// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract MyCoin {
  address private _owner;
  string public name;
  string public symbol;
  uint8 public decimals;
  uint256 private _totalSuply;

  mapping(address => uint256) public balanceOf;
  mapping(address => mapping(address => uint256)) public allowance;

  event Transfer(address indexed _from, address indexed _to, uint256 _value);
  event Approval(address indexed _owner, address indexed _spender, uint256 _value);
  
  constructor(
    string memory name_,
    string memory symbol_,
    uint8 decimals_,
    uint256 totalSuply_
  ) {
    name = name_;
    symbol = symbol_;
    decimals = decimals_;
    _totalSuply = totalSuply_ * (uint256(10) ** decimals);
    _owner = msg.sender;
    balanceOf[_owner] = _totalSuply;
  }

  /**
   Permite transferir a otra wallet usando su balance
   */
  function transfer(address _to, uint256 _value) public returns (bool success) {
    require(balanceOf[msg.sender] >= _value); // check balance
    balanceOf[msg.sender] -= _value; // discount balance
    balanceOf[_to] += _value; // set balance to receptor

    emit Transfer(msg.sender, _to, _value);
    return true;
  }

  /**
   Permite autorizar a un terceso transferir dinero sin afectar su balance
   */
  function approve(address _spender, uint256 _value) public returns (bool success){
    allowance[msg.sender][_spender] = _value;
    emit Approval(msg.sender, _spender, _value);
    return true;
  }

  /**
   Permite transferir a otra wallet de tercero a otra
   */
  function transferFrom(address _from, address _to, uint256 _value) public returns (bool success){
    require(balanceOf[_from] >= _value);
    require(allowance[_from][msg.sender] >= _value);
    balanceOf[_from] -= _value;
    balanceOf[_to] += _value;
    allowance[_from][msg.sender]-= _value;
    emit Transfer(_from, _to, _value);
    return true;
  }
}