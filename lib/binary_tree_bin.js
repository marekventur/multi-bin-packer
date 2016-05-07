"use strict";

module.exports = class BinaryTreeBin {
    constructor(maxWidth, maxHeight) {
        this.rootNode = { x: 0, y: 0, width: maxWidth, height: maxHeight };
        this.width = 0;
        this.height = 0;
        this.rects = [];
    }

    add(width, height, data) {
        let node = this.findNode(this.rootNode, width, height)
        if (node) {
            node.children = this.createChildren(node, width, height);
            this.width = Math.max(this.width, node.x + width);
            this.height = Math.max(this.height, node.y + height);
            let rect = {width, height, x: node.x, y: node.y, data};
            this.rects.push(rect);
            return rect;
        }
        return undefined;
    }

    /**
     * Internal
     **/

    findNode(node, width, height) {
        if (node.children) {
            return this.findNode(node.children[0], width, height) ||
                this.findNode(node.children[1], width, height);
        }
        if ((width <= node.width) && (height <= node.height)){
            return node;
        }
        return undefined;
    }

    createChildren(node, width, height) {
        return [
            {
                x: node.x,
                y: node.y + height,
                width: node.width,
                height: node.height - height
            },
            {
                x: node.x + width,
                y: node.y,
                width: node.width - width,
                height: height
            }
        ];
    }
}