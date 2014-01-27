// disk model

// deps to system
var inherits = require("inherits");
var Emitter = require("events").EventEmitter;

// deps 
var Partition = require("./partition");

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

  this.on("change", this.refresh);
}

inherits(Disk, Emitter);

Disk.prototype.refresh = function(){
  console.log("refresh");
  this.layer.draw();
}

Disk.prototype.addPartition = function(options) {
  // primary or extended
}

Disk.prototype.primaryParts = function () {

}

Disk.prototype.test = function() {

  var rect = new Kinetic.Rect({
    x: 10,
    y: 10,
    width: 200,
    height: 50,
    fill: 'white',
    stroke: 'black',
    strokeWidth: 1
  });

  this.layer.add(rect);
  this.emit("change");

  var part = new Partition({ layer : this.layer });
  var self = this;

  part.on("change", function(obj){})
  
  this.emit("change");  
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
