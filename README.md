# Multi Bin Packer
[![Build Status](https://travis-ci.org/marekventur/multi-bin-packer.svg?branch=master)](https://travis-ci.org/marekventur/multi-bin-packer)
[![Dependency Status](https://david-dm.org/marekventur/multi-bin-packer.svg)](https://david-dm.org/marekventur/multi-bin-packer)
[![devDependency Status](https://david-dm.org/marekventur/multi-bin-packer/dev-status.svg)](https://david-dm.org/marekventur/multi-bin-packer#info=devDependencies)

This is a 2d bin packer for the special purpose of creating spritesheets for CSS and games.

It differs from the long list of similar packages by its packing approach: Instead of creating one output bin with a minimum size this package is trying to create a minimum number of bins under a certain size. This avoids problems with single massive image files that are not browser-friendly. This can be especially useful for WebGL games were the GPU will benefit from spritesheets close to mutliple-of-2 sizes.

Usage:
```
npm install multi-bin-packer --save
```

```javascript
let MultiBinPacker = require("multi-bin-packer");
let packer = new MultiBinPacker(1024, 1024);

packer.addArray([
    {width: 600, height: 20, data: {name: "tree", foo: "bar"}},
    {width: 600, height: 20, data: {name: "flower"}},
    {width: 2000, height: 2000, data: {name: "oversized background"}},
    {width: 1000, height: 1000, data: {name: "background"}},
    {width: 1000, height: 1000, data: {name: "overlay"}}
]);

console.log(packer.bins.length); // 3
console.log(packer.bins[0].width, packer.bins[0].height); // 2000 2000
console.log("%j", packer.bins[0].rects); // [{"x":0,"y":0,"width":2000,"height":2000,"data":{"name":"oversized background"},"oversized":true}]
console.log(packer.bins[1].width, packer.bins[1].height); // 1000 1020
console.log("%j", packer.bins[1].rects); // [{"width":1000,"height":1000,"x":0,"y":0,"data":{"name":"background"}},{"width":600,"height":20,"x":0,"y":1000,"data":{"name":"tree","foo":"bar"}}]
console.log(packer.bins[2].width, packer.bins[2].height); // 1000 1020
console.log("%j", packer.bins[2].rects); // [{"width":1000,"height":1000,"x":0,"y":0,"data":{"name":"overlay"}},{"width":600,"height":20,"x":0,"y":1000,"data":{"name":"flower"}}]
```

## API

Note: multi-bin-packer requires node >= 4.0.0

### ```new MultiBinPacker(maxWidth, maxHeight)```
Creates a new Packer. maxWidth and maxHeight are passed on to all bins.

### ```packer.add(width, height, data)```
Adds a rect to an existing bin or creates a new one to accomodate it. ```data``` can be anything, it will be stored along with the position data of each rect.

### ```packer.addArray([{width: width, height: height, data: data}, ...])```
Adds multiple rects. Since the input is automatically sorted before adding this approach usually leads to fewer bins created than separate calls to ```.add()```

### ```packer.bins```
Array of bins. Every bin has a ```width``` and ```height``` parameter as well as an array ```rects```.

### ```packer.bins[n].rects```
Array of rects for a specific bin. Every rect has ```x```, ```y```, ```width```, ```height``` and ```data```. In case of an rect exceeding ```maxWidth```/```maxHeight``` there will also be an ```oversized``` flag set to ```true```.

## Support for oversized rectangles
Nornally all bins are of equal size or smaller than ```maxWidth```/```maxHeight```. If a rect is added that individually does not fit into those constraints a special bin will be created. This bin will only contain a single rect with a special "oversized" flag. This can be handled further on in the chain by displaying an error/warning or by simply ignoring it.

## Packing algorithm
Currently a simple binary tree bin packer algorithm is used. More efficient packing algorithms might be implemented in the future. PRs are welcome.

If ```addArray()``` is used rects are sorted before being packed, leading to improved packing efficiency.