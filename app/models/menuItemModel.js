var mongoose = require('mongoose');
var Schema = mongoose.scheme;

var menuItemScheme = new Schema({
    Name: {type: String, required: true},
    Description: String,
    Price: {type: Number, required: true},
    Type: {type: String, enum:['main','salad','starter','drink'], required: true}
});

var menuItem = mongoose.model('menuItem',menuItemScheme);

module.exports = menuItem;