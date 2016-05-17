"use strict";

module.exports = class BinaryTreeBin {
    constructor(maxWidth, maxHeight, padding) {
        this.width = 0;
        this.height = 0;
        this.maxWidth = maxWidth;
        this.maxHeight = maxHeight;
        this.padding = padding || 0;
        this.rootNode = { x: 0, y: 0, width: maxWidth + this.padding, height: maxHeight + this.padding};
        this.rects = [];
    }

    add(width, height, data) {
        let node = this.findNode(this.rootNode, width + this.padding, height + this.padding);
        if (node) {
            node.children = this.createChildren(node, width + this.padding, height + this.padding);
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
            for (let i=0; i<node.children.length; i++) {
                let found = this.findNode(node.children[i], width, height);
                if (found) {
                    return found;
                }
            }
            return undefined;
        }
        if ((width <= node.width) && (height <= node.height)){
            return node;
        }
        return undefined;
    }

    createChildren(node, width, height) {
        let children = [];

        if (node.height - height > 0 && node.x < this.maxWidth) {
            children.push({
                x: node.x,
                y: node.y + height,
                width: node.width,
                height: node.height - height
            });
        }

        if (node.width - width > 0 && node.y < this.maxHeight) {
            children.push({
                x: node.x + width,
                y: node.y,
                width: node.width - width,
                height: height
            });
        }

        return children;
    }
}