// Require Mongoose for MongoDB interaction
var mongoose          = require('mongoose');

// Search Schema
var searchSchema      = mongoose.Schema({
  queryString: {
    type:         String,
    required:     true
  },
  count: {
    type:         Number,
    required:     true,
    default:      0 // Might not need to set a default for this field
  },
  firstSearched: {
    type:         Date,
    required:     true
  },
  lastSearched: {
    type:         Date,
    required:     true
  }
}, { timestamps: true });

// Export Search Model
module.exports = mongoose.model("Search", searchSchema);
