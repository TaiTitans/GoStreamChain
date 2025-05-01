// Code generated - DO NOT EDIT.
// This file is a generated binding and any manual changes will be lost.

package ethclient

import (
	"errors"
	"math/big"
	"strings"

	ethereum "github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/event"
)

// Reference imports to suppress errors if they are not otherwise used.
var (
	_ = errors.New
	_ = big.NewInt
	_ = strings.NewReader
	_ = ethereum.NotFound
	_ = bind.Bind
	_ = common.Big1
	_ = types.BloomLookup
	_ = event.NewSubscription
	_ = abi.ConvertType
)

// EthclientMetaData contains all meta data concerning the Ethclient contract.
var EthclientMetaData = &bind.MetaData{
	ABI: "[{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"string\",\"name\":\"roomID\",\"type\":\"string\"},{\"indexed\":false,\"internalType\":\"string\",\"name\":\"clientID\",\"type\":\"string\"},{\"indexed\":false,\"internalType\":\"string\",\"name\":\"content\",\"type\":\"string\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"timestamp\",\"type\":\"uint256\"}],\"name\":\"MessageSent\",\"type\":\"event\"},{\"inputs\":[{\"internalType\":\"string\",\"name\":\"roomID\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"clientID\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"content\",\"type\":\"string\"}],\"name\":\"sendMessage\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"}]",
}

// EthclientABI is the input ABI used to generate the binding from.
// Deprecated: Use EthclientMetaData.ABI instead.
var EthclientABI = EthclientMetaData.ABI

// Ethclient is an auto generated Go binding around an Ethereum contract.
type Ethclient struct {
	EthclientCaller     // Read-only binding to the contract
	EthclientTransactor // Write-only binding to the contract
	EthclientFilterer   // Log filterer for contract events
}

// EthclientCaller is an auto generated read-only Go binding around an Ethereum contract.
type EthclientCaller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// EthclientTransactor is an auto generated write-only Go binding around an Ethereum contract.
type EthclientTransactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// EthclientFilterer is an auto generated log filtering Go binding around an Ethereum contract events.
type EthclientFilterer struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// EthclientSession is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type EthclientSession struct {
	Contract     *Ethclient        // Generic contract binding to set the session for
	CallOpts     bind.CallOpts     // Call options to use throughout this session
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// EthclientCallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type EthclientCallerSession struct {
	Contract *EthclientCaller // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts    // Call options to use throughout this session
}

// EthclientTransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type EthclientTransactorSession struct {
	Contract     *EthclientTransactor // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts    // Transaction auth options to use throughout this session
}

// EthclientRaw is an auto generated low-level Go binding around an Ethereum contract.
type EthclientRaw struct {
	Contract *Ethclient // Generic contract binding to access the raw methods on
}

// EthclientCallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type EthclientCallerRaw struct {
	Contract *EthclientCaller // Generic read-only contract binding to access the raw methods on
}

// EthclientTransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type EthclientTransactorRaw struct {
	Contract *EthclientTransactor // Generic write-only contract binding to access the raw methods on
}

// NewEthclient creates a new instance of Ethclient, bound to a specific deployed contract.
func NewEthclient(address common.Address, backend bind.ContractBackend) (*Ethclient, error) {
	contract, err := bindEthclient(address, backend, backend, backend)
	if err != nil {
		return nil, err
	}
	return &Ethclient{EthclientCaller: EthclientCaller{contract: contract}, EthclientTransactor: EthclientTransactor{contract: contract}, EthclientFilterer: EthclientFilterer{contract: contract}}, nil
}

// NewEthclientCaller creates a new read-only instance of Ethclient, bound to a specific deployed contract.
func NewEthclientCaller(address common.Address, caller bind.ContractCaller) (*EthclientCaller, error) {
	contract, err := bindEthclient(address, caller, nil, nil)
	if err != nil {
		return nil, err
	}
	return &EthclientCaller{contract: contract}, nil
}

// NewEthclientTransactor creates a new write-only instance of Ethclient, bound to a specific deployed contract.
func NewEthclientTransactor(address common.Address, transactor bind.ContractTransactor) (*EthclientTransactor, error) {
	contract, err := bindEthclient(address, nil, transactor, nil)
	if err != nil {
		return nil, err
	}
	return &EthclientTransactor{contract: contract}, nil
}

// NewEthclientFilterer creates a new log filterer instance of Ethclient, bound to a specific deployed contract.
func NewEthclientFilterer(address common.Address, filterer bind.ContractFilterer) (*EthclientFilterer, error) {
	contract, err := bindEthclient(address, nil, nil, filterer)
	if err != nil {
		return nil, err
	}
	return &EthclientFilterer{contract: contract}, nil
}

// bindEthclient binds a generic wrapper to an already deployed contract.
func bindEthclient(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor, filterer bind.ContractFilterer) (*bind.BoundContract, error) {
	parsed, err := EthclientMetaData.GetAbi()
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, *parsed, caller, transactor, filterer), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_Ethclient *EthclientRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _Ethclient.Contract.EthclientCaller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_Ethclient *EthclientRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _Ethclient.Contract.EthclientTransactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_Ethclient *EthclientRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _Ethclient.Contract.EthclientTransactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_Ethclient *EthclientCallerRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _Ethclient.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_Ethclient *EthclientTransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _Ethclient.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_Ethclient *EthclientTransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _Ethclient.Contract.contract.Transact(opts, method, params...)
}

// SendMessage is a paid mutator transaction binding the contract method 0x0eabeffe.
//
// Solidity: function sendMessage(string roomID, string clientID, string content) returns()
func (_Ethclient *EthclientTransactor) SendMessage(opts *bind.TransactOpts, roomID string, clientID string, content string) (*types.Transaction, error) {
	return _Ethclient.contract.Transact(opts, "sendMessage", roomID, clientID, content)
}

// SendMessage is a paid mutator transaction binding the contract method 0x0eabeffe.
//
// Solidity: function sendMessage(string roomID, string clientID, string content) returns()
func (_Ethclient *EthclientSession) SendMessage(roomID string, clientID string, content string) (*types.Transaction, error) {
	return _Ethclient.Contract.SendMessage(&_Ethclient.TransactOpts, roomID, clientID, content)
}

// SendMessage is a paid mutator transaction binding the contract method 0x0eabeffe.
//
// Solidity: function sendMessage(string roomID, string clientID, string content) returns()
func (_Ethclient *EthclientTransactorSession) SendMessage(roomID string, clientID string, content string) (*types.Transaction, error) {
	return _Ethclient.Contract.SendMessage(&_Ethclient.TransactOpts, roomID, clientID, content)
}

// EthclientMessageSentIterator is returned from FilterMessageSent and is used to iterate over the raw logs and unpacked data for MessageSent events raised by the Ethclient contract.
type EthclientMessageSentIterator struct {
	Event *EthclientMessageSent // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *EthclientMessageSentIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(EthclientMessageSent)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(EthclientMessageSent)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *EthclientMessageSentIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *EthclientMessageSentIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// EthclientMessageSent represents a MessageSent event raised by the Ethclient contract.
type EthclientMessageSent struct {
	RoomID    string
	ClientID  string
	Content   string
	Timestamp *big.Int
	Raw       types.Log // Blockchain specific contextual infos
}

// FilterMessageSent is a free log retrieval operation binding the contract event 0x200deb8b3290a27dc66b22678c86aea858eba8208e869bacf3c5b20ab1c13451.
//
// Solidity: event MessageSent(string roomID, string clientID, string content, uint256 timestamp)
func (_Ethclient *EthclientFilterer) FilterMessageSent(opts *bind.FilterOpts) (*EthclientMessageSentIterator, error) {

	logs, sub, err := _Ethclient.contract.FilterLogs(opts, "MessageSent")
	if err != nil {
		return nil, err
	}
	return &EthclientMessageSentIterator{contract: _Ethclient.contract, event: "MessageSent", logs: logs, sub: sub}, nil
}

// WatchMessageSent is a free log subscription operation binding the contract event 0x200deb8b3290a27dc66b22678c86aea858eba8208e869bacf3c5b20ab1c13451.
//
// Solidity: event MessageSent(string roomID, string clientID, string content, uint256 timestamp)
func (_Ethclient *EthclientFilterer) WatchMessageSent(opts *bind.WatchOpts, sink chan<- *EthclientMessageSent) (event.Subscription, error) {

	logs, sub, err := _Ethclient.contract.WatchLogs(opts, "MessageSent")
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(EthclientMessageSent)
				if err := _Ethclient.contract.UnpackLog(event, "MessageSent", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseMessageSent is a log parse operation binding the contract event 0x200deb8b3290a27dc66b22678c86aea858eba8208e869bacf3c5b20ab1c13451.
//
// Solidity: event MessageSent(string roomID, string clientID, string content, uint256 timestamp)
func (_Ethclient *EthclientFilterer) ParseMessageSent(log types.Log) (*EthclientMessageSent, error) {
	event := new(EthclientMessageSent)
	if err := _Ethclient.contract.UnpackLog(event, "MessageSent", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}
