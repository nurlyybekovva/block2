# AI Model Marketplace dApp

## Team: Alikhan Sailybaev , Zarina Beketova , Alua Nurlybekova

This project demonstrates a basic Ether wallet smart contract that:
- Accepts Ether deposits.
- Allows the owner to withdraw the entire balance.
- Displays the contract's balance.

## Features
## Smart Contract Functionalities:
- List a Model: Add a new AI model with its name, description, and price.
- Purchase a Model: Buy an AI model using its unique ID, with payments sent to the creator.
- Rate a Model: Rate a purchased AI model to contribute to its overall score.
- View Model Details: Access information such as name, description, price, creator, and average rating.
- Withdraw Funds: Allow creators to withdraw earnings from sales.
## Frontend Functionalities:
- Form to list a new model.
- Displaying available models.
- Buttons to purchase and rate models.
- Button to view details of specific models.
- Withdrawal feature for creators.

## Technologies Used
- [Solidity](https://www.soliditylang.org/) - Smart contract language.
- [Web3.js](https://web3js.readthedocs.io/) - Ethereum JavaScript API.
- [Ganache](https://www.trufflesuite.com/ganache) - Local blockchain for development.
- [Node.js](https://nodejs.org/) - JavaScript runtime.
- [dotenv](https://www.npmjs.com/package/dotenv) - Environment variable management.

## Prerequisites
- [Node.js](https://nodejs.org/) installed.
- [Solidity Compiler (`solc`)](https://docs.soliditylang.org/en/v0.8.17/installing-solidity.html) installed.
- [Ganache](https://www.trufflesuite.com/ganache) installed and running.

## Setup

1. **Clone the repository:**
    ```bash
    git clone https://github.com/nurlyybekovva/block2
    cd ai-model-market
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

## Compilation and Deployment

1. **Compile and deploy the Smart Contract:**
    ```bash
    truffle compile
    truffle migrate
    ```

1. **Or compile and deploy it in remix using your net, and then paste abi and contract address in app.js**    
    
## run the server:
```bash
    npm install -g http-server
    http-server
```
## Troubleshooting

- **Invalid Opcode Error:**
  - Ensure that the Solidity compiler version matches the pragma version in `EtherWallet.sol`.
  - Recompile the contract to update the ABI and bytecode.
  - Verify that the `API_KEY` and `MNEMONIC` in the .env file are correct.
  - Restart Ganache to reset the blockchain state and redeploy the contract.

- **Deprecation Warnings:**
  - Update dependencies to replace deprecated modules.
    ```bash
    npm update
    ```


## License

This project is licensed under the MIT License.
