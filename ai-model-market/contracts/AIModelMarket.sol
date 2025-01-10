// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AIModelMarketplace {
    struct Model {
        string name;
        string description;
        uint256 price;
        address creator;
        uint256 totalRatings;
        uint256 numberOfRatings;
    }

    uint256 public modelCount = 0;
    mapping(uint256 => Model) public models;
    mapping(address => uint256) public balances;

    event ModelListed(uint256 modelId, string name, address creator);
    event ModelPurchased(uint256 modelId, address buyer);
    event ModelRated(uint256 modelId, uint8 rating);

    function listModel(string memory name, string memory description, uint256 price) public {
        require(price > 0, "Price must be greater than zero");
        models[modelCount] = Model(name, description, price, msg.sender, 0, 0);
        emit ModelListed(modelCount, name, msg.sender);
        modelCount++;
    }

    function purchaseModel(uint256 modelId) public payable {
    require(modelId < modelCount, "Model does not exist");
    Model storage model = models[modelId];
    require(msg.value == model.price, "Incorrect payment amount");

    balances[model.creator] += msg.value;
    emit ModelPurchased(modelId, msg.sender);
}


    function rateModel(uint256 modelId, uint8 rating) public {
        require(rating >= 1 && rating <= 5, "Rating must be between 1 and 5");
        Model storage model = models[modelId];
        model.totalRatings += rating;
        model.numberOfRatings++;
        emit ModelRated(modelId, rating);
    }

    
    function withdrawFunds() public {
    uint256 amount = balances[msg.sender];
    require(amount > 0, "No funds to withdraw");
    balances[msg.sender] = 0;
    (bool success, ) = payable(msg.sender).call{value: amount}("");
    require(success, "Transfer failed");
    }


    function getModelDetails(uint256 modelId) public view returns (
        string memory name,
        string memory description,
        uint256 price,
        address creator,
        uint256 averageRating
    ) {
        Model storage model = models[modelId];
        uint256 averageRating = model.numberOfRatings > 0 
            ? model.totalRatings / model.numberOfRatings 
            : 0;
        return (model.name, model.description, model.price, model.creator, averageRating);
    }
}
