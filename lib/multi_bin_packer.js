"use strict";

let OversizedElementBin = require("./oversized_element_bin");
let BinaryTreeBin = require("./binary_tree_bin");

module.exports = class MultiBinPacker {
    constructor(maxWidth, maxHeight, padding) {
        this.maxWidth = maxWidth;
        this.maxHeight = maxHeight;
        this.padding = padding;
        this.bins = [];
    }

    add(width, height, data) {
        if (width > this.maxWidth || height > this.maxHeight) {
            this.bins.push(new OversizedElementBin(width, height, data));
        }
        let added = this.bins.find(bin => bin.add(width, height, data));
        if (!added) {
            let bin = new BinaryTreeBin(this.maxWidth, this.maxHeight, this.padding);
            bin.add(width, height, data);
            this.bins.push(bin);
        }
    }

    sort(rects) {
        return rects.slice().sort((a, b) => Math.max(b.width, b.height) - Math.max(a.width, a.height));
    }

    addArray(rects) {
        this.sort(rects).forEach(rect => this.add(rect.width, rect.height, rect.data));
    }
}