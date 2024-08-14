class Product {
    constructor(pName, pCategory, pCost) {
        this.id = this.generateProductId();
        this.pName = pName;
        this.pCategory = pCategory;
        this.pCost = pCost;

    }

    generateProductId() {
        //random 7 digits number
        return Math.floor(1000000 + Math.random() * 9000000);
    }
}

module.exports = Product;
