package ethclient

import (
	"context"
	"fmt"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/ethereum/go-ethereum/event"
	"time"
)

// Service để thao tác với Smart Contract
type Service struct {
	client          *ethclient.Client
	signaling       *Ethclient // Changed to match generated binding
	contractAddress common.Address
}

const defaultNodeURL = "http://127.0.0.1:8545"

func Connect(url string) (*ethclient.Client, error) {
	if url == "" {
		url = defaultNodeURL
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	client, err := ethclient.DialContext(ctx, url)
	if err != nil {
		return nil, fmt.Errorf("failed to connect to Ethereum client at %s: %w", url, err)
	}

	// Verify connection
	_, err = client.ChainID(ctx)
	if err != nil {
		client.Close()
		return nil, fmt.Errorf("failed to verify connection: %w", err)
	}

	return client, nil
}

// NewService tạo kết nối mới
func NewService(url string, contractAddr string) (*Service, error) {
	client, err := ethclient.Dial(url)
	if err != nil {
		return nil, fmt.Errorf("failed to connect to node: %w", err)
	}

	address := common.HexToAddress(contractAddr)
	signaling, err := NewEthclient(address, client) // NewEthclient được abigen generate
	if err != nil {
		return nil, fmt.Errorf("failed to bind to contract: %w", err)
	}

	return &Service{
		client:          client,
		signaling:       signaling,
		contractAddress: address,
	}, nil
}

// SendMessage calls the smart contract's sendMessage function
func (s *Service) SendMessage(opts *bind.TransactOpts, roomID string, clientID string, content string) (*types.Transaction, error) {
	return s.signaling.SendMessage(opts, roomID, clientID, content)
}

// WatchMessageSent subscribes to MessageSent events
func (s *Service) WatchMessageSent(opts *bind.WatchOpts, sink chan<- *EthclientMessageSent) (event.Subscription, error) {
	return s.signaling.WatchMessageSent(opts, sink)
}

// Close đóng kết nối
func (s *Service) Close() {
	if s.client != nil {
		s.client.Close()
	}
}

func LoadSignalingContract(client *ethclient.Client, address string) (*Ethclient, error) {
	contractAddress := common.HexToAddress(address)
	instance, err := NewEthclient(contractAddress, client)
	if err != nil {
		return nil, err
	}
	return instance, nil
}
