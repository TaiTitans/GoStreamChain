# GoStreamChain Project Setup Guide

## Prerequisites
- Node.js (v16 or later)
- Go (v1.20 or later)
- MetaMask browser extension
- Git

## Project Structure
```
GoStreamChain/
├── cmd/
│   └── signaling/     # WebSocket signaling server
├── contracts/         # Solidity smart contracts
├── web/
│   └── react/        # Frontend application
```

## Step 1: Clone the Repository
```bash
git clone https://github.com/TaiTitans/GoStreamChain.git
cd GoStreamChain
```

## Step 2: Setup Backend (Signaling Server)
```bash
# Navigate to signaling server directory
cd cmd/signaling

# Install Go dependencies
go mod tidy

# Start the signaling server
go run main.go
```
The server will start on `localhost:8080`

## Step 3: Setup Smart Contracts
```bash
# Navigate to contracts directory
cd contracts

# Install dependencies
npm install

# Start local Ethereum node
npx hardhat node

# In a new terminal, deploy contracts
npx hardhat run scripts/deploy.js --network localhost
```
Copy the deployed contract address for the next step.

## Step 4: Setup Frontend
```bash
# Navigate to frontend directory
cd web/react

# Install dependencies
npm install

# Create .env file
echo "VITE_WS_URL=ws://localhost:8080/ws
VITE_ETH_NODE_URL=http://localhost:8545
VITE_CONTRACT_ADDRESS=<deployed_contract_address>" > .env

# Start development server
npm run dev
```
The frontend will be available at `http://localhost:5173`

## Step 5: Configure MetaMask
1. Open MetaMask
2. Add network:
   - Network Name: Hardhat Local
   - RPC URL: http://localhost:8545
   - Chain ID: 31337
   - Currency Symbol: ETH
3. Import one of the test accounts using private keys from Hardhat node output

## Step 6: Using the Application
1. Connect MetaMask to the local network
2. Join or create a room
3. Start streaming or chatting

## Troubleshooting
- If WebSocket connection fails, ensure signaling server is running
- If transactions fail, check MetaMask connection and account balance
- If chat doesn't work, verify contract address in .env file

## Development Commands
```bash
# Frontend
npm run dev    # Start development server
npm run build  # Build for production
npm run test   # Run tests

# Smart Contracts
npx hardhat test          # Run contract tests
npx hardhat compile       # Compile contracts
npx hardhat clean        # Clean artifacts

# Backend
go run main.go           # Start signaling server
go test ./...           # Run Go tests
```

## Important Notes
- Keep the signaling server running
- Maintain active Hardhat node
- Ensure MetaMask is connected to correct network
- Use proper contract address in .env