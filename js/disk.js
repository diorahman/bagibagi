// disk model

// deps
var inherits = require("inherits");
var Emitter = require("events").EventEmitter;

// expose
module.exports = Disk;

function Disk(options){

  if (!(this instanceof Disk)) return new Disk(options);
  if (!options) throw new TypeError("disk settings required");

  this.merge(options);

  // primary : { size, label}
  //  `-- a 
  //  `-- b
  //  `-- c
  //  `-- d

  // extended : { size, label}
  //  `-- logical 1 .. n

}

inherits(Disk, Emitter);

Disk.prototype.test = function() {

  var rect = new Kinetic.Rect({
    x: 10,
    y: 10,
    width: 50,
    height: 50,
    fill: 'green',
    stroke: 'black',
    strokeWidth: 4
  });

  this.layer.add(rect);
  this.stage.draw();
};

Disk.prototype.show = function(){

};

/**
 * Merge `obj`.
 *
 * @param {Object} obj
 * @api private
 */
Disk.prototype.merge = function(obj){
  for (var key in obj) this[key] = obj[key];
};
