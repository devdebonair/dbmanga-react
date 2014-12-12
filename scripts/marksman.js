var Marksman = require("./dbmarksman");

var marksman = new Marksman();

var html = marksman.toHtml(require("./markup.json"));
