const contractAddress = '0xDCBcBD312Ac16855343ED060dD98669782364c4d';
const contractABI = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "description",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "price",
                "type": "uint256"
            }
        ],
        "name": "listModel",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "modelId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "creator",
                "type": "address"
            }
        ],
        "name": "ModelListed",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "modelId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "buyer",
                "type": "address"
            }
        ],
        "name": "ModelPurchased",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "modelId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint8",
                "name": "rating",
                "type": "uint8"
            }
        ],
        "name": "ModelRated",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "modelId",
                "type": "uint256"
            }
        ],
        "name": "purchaseModel",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "modelId",
                "type": "uint256"
            },
            {
                "internalType": "uint8",
                "name": "rating",
                "type": "uint8"
            }
        ],
        "name": "rateModel",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "withdrawFunds",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "balances",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "modelId",
                "type": "uint256"
            }
        ],
        "name": "getModelDetails",
        "outputs": [
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "description",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "price",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "creator",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "averageRating",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "modelCount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "models",
        "outputs": [
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "description",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "price",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "creator",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "totalRatings",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "numberOfRatings",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];
let web3;
let contract;

async function connectWeb3() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log("Connected to Ethereum via MetaMask");
        } catch (error) {
            console.error("User denied account access");
        }
    } else {
        alert('Non-Ethereum browser detected. Please install MetaMask!');
    }
}

async function getContract() {
    if (!web3) {
        await connectWeb3();
    }
    if (!contract) {
        contract = new web3.eth.Contract(contractABI, contractAddress);
    }
    return contract;
}

// Event: Create a New Model
document.getElementById('create-model-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const price = parseFloat(document.getElementById('price').value);

    if (isNaN(price)) {
        alert("Please enter a valid number.");
        return;
    }

    const priceInWei = web3.utils.toWei(price.toString(), 'ether');
    const contract = await getContract();
    const accounts = await web3.eth.getAccounts();

    try {
        await contract.methods.listModel(name, description, priceInWei).send({ from: accounts[0] });
        alert('Model created successfully!');
        loadAvailableModels();
    } catch (error) {
        console.error("Error creating model:", error);
        alert("Failed to create model.");
    }
});

// Load Available Models
async function loadAvailableModels() {
    const contract = await getContract();
    const totalModels = await contract.methods.modelCount().call();
    const modelList = document.getElementById('model-list');
    modelList.innerHTML = '';

    for (let i = 0; i < totalModels; i++) {
        const model = await contract.methods.models(i).call();
        const modelHTML = `
            <div class="col-md-4">
                <div class="card mb-4">
                    <div class="card-body">
                        <h5 class="card-title">${model.name}</h5>
                        <p class="card-text">Price: ${web3.utils.fromWei(model.price, 'ether')} ETH</p>
                        <div class="d-flex justify-content-between">
                            <a href="#" class="btn btn-primary" onclick="viewModel(${i})">View</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        modelList.innerHTML += modelHTML;
    }
}

// View Model Details
async function viewModel(modelId) {
    const contract = await getContract();
    const model = await contract.methods.getModelDetails(modelId).call();

    alert(`
        Name: ${model[0]}
        Description: ${model[1]}
        Price: ${web3.utils.fromWei(model[2], 'ether')} ETH
        Creator: ${model[3]}
        Average Rating: ${model[4]}
    `);
}

document.getElementById('purchase-model-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const modelId = parseInt(document.getElementById('modelId').value);
    const contract = await getContract();
    const accounts = await web3.eth.getAccounts();

    try {
        // Validate the model ID
        const modelCount = await contract.methods.modelCount().call();
        if (modelId >= modelCount) {
            alert("Invalid Model ID. The model does not exist.");
            return;
        }

        // Fetch the model price
        const model = await contract.methods.models(modelId).call();
        const expectedPrice = model.price;

        // Check the user's input price
        const inputPrice = parseFloat(document.getElementById('modelPrice').value);
        const priceInWei = web3.utils.toWei(inputPrice.toString(), 'ether');
        if (priceInWei !== expectedPrice) {
            alert(`Incorrect price. The price for this model is ${web3.utils.fromWei(expectedPrice, 'ether')} ETH.`);
            return;
        }

        // Check user balance
        const balance = await web3.eth.getBalance(accounts[0]);
        if (BigInt(balance) < BigInt(priceInWei)) {
            alert("Insufficient balance to complete the purchase.");
            return;
        }

        // Execute the purchase
        await contract.methods.purchaseModel(modelId).send({
            from: accounts[0],
            value: priceInWei,
            gas: 300000, // Adjust gas limit if necessary
        });

        alert(`Model with ID ${modelId} purchased successfully!`);
    } catch (error) {
        console.error("Error purchasing model:", error);
        alert("Failed to purchase model. Check console for details.");
    }
});


// Rate Model
document.getElementById('rate-model-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const modelId = document.getElementById('rateModelId').value;
    const rating = parseInt(document.getElementById('ratingValue').value);

    if (isNaN(rating) || rating < 1 || rating > 5) {
        alert("Please enter a rating between 1 and 5.");
        return;
    }

    const accounts = await web3.eth.getAccounts();

    try {
        await contract.methods.rateModel(modelId, rating).send({ from: accounts[0] });
        alert(`Model with ID ${modelId} rated successfully with ${rating} stars!`);
    } catch (error) {
        console.error("Error rating model:", error);
        alert("Failed to rate model. Check console for details.");
    }
});


// Withdraw Funds
document.getElementById('withdrawButton').addEventListener('click', async () => {
    const contract = await getContract();
    const accounts = await web3.eth.getAccounts();

    try {
        const balance = await contract.methods.balances(accounts[0]).call();
        if (BigInt(balance) === BigInt(0)) {
            alert("No funds available for withdrawal.");
            return;
        }

        await contract.methods.withdrawFunds().send({
            from: accounts[0],
            gas: 300000, 
        });

        alert('Funds withdrawn successfully!');
    } catch (error) {
        console.error("Error withdrawing funds:", error);
        alert("Failed to withdraw funds. Check console for details.");
    }
});


// Initialize App
connectWeb3();
loadAvailableModels();