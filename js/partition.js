// deps
var Kinetic = require("kinetic");
var inherits = require("inherits");
var Emitter = require("events").EventEmitter;

var DRAG_INT = 1;

// expose
module.exports = Partition;

function Partition(options){
  if (!(this instanceof Partition)) return new Partition(options);
  if (!options) throw new TypeError("partition settings required");

  this.merge(options);
  this._pos = { x : 10, y : 10 };
  this._width = 20;

  var rectOpt = {
    x: this._pos.x,
    y: this._pos.y,
    width: 20,
    height: 50,
    fill: 'gray',
    strokeWidth: 1,
  }

  var handleOpt = {
    x: this._pos.x + this._width,
    y: this._pos.y,
    width: 4,
    height: 50,
    fill: 'black',
    draggable : true,
    dragBoundFunc : function (pos) {
      return {
        x : pos.x <= 10 ? 10 : (pos.x >= 205 ? 205 : pos.x) ,
        y : this.getAbsolutePosition().y
      }
    }
  }

  var self = this;
  var handle = new Kinetic.Rect(handleOpt);
  var rect = new Kinetic.Rect(rectOpt);

  handle.partition = this;
  handle.on("dragstart", this.observeDrag);
  handle.on("dragend", this.observeDragEnd);

  this.layer.add(rect);
  this.layer.add(handle);

  this.rect = rect;
  this.handle = handle;
}

inherits(Partition, Emitter);

Partition.prototype.observeDrag = function (){
  var handle = this;
  var partition = handle.partition;
  handle.dragTimer = setInterval(function(){
    partition.width = handle.x() - 10;
  }, DRAG_INT);
}

Partition.prototype.observeDragEnd = function () {
  clearInterval(this.dragTimer);
}

// type
Object.defineProperty(Partition.prototype, "width", {
  get : function () {
    return this._width;
  },
  set : function (val) {
    if (this._width != val) {
      this._width = val;
      this.rect.width(this._width);  
      this.emit("change", { prop : "width"});
    }
  }
});

/**
 * Merge `obj`.
 *
 * @param {Object} obj
 * @api private
 */
Partition.prototype.merge = function(obj){
  for (var key in obj) this[key] = obj[key];
};




