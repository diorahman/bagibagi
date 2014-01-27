var Kinetic = require("kinetic");
var Disk = require("./disk");

var options = {
  container : "container",
  width : 400,
  height : 400
};

var stage = new Kinetic.Stage(options);

// empty main layer
var layer = new Kinetic.Layer();

var disk = new Disk({ stage : stage, layer : layer });

stage.add(layer);




