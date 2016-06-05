// Require Mongoose for MongoDB interaction
var mongoose          = require('mongoose');

// Search Schema
var searchSchema      = mongoose.Schema({
  queryString: {
    type:         String,
    required:     true,
    unique:       true
  },
  count: {
    type:         Number,
    required:     true,
    default:      1 // Might not need to set a default for this field
  },
  firstSearched: {
    type:         Date
  },
  lastSearched: {
    type:         Date
  },
  users: [{
    user_id: {
      type:       String
    },
    summary: {
      type:       String
    }
  }]
}, { timestamps: true });

// Export Search Model
module.exports = mongoose.model("Search", searchSchema);
