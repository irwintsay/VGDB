// Require Mongoose for MongoDB interaction and Bcrypt for encryption
var mongoose          = require('mongoose'),
    bcrypt            = require('bcryptjs');

// Require Search Model
// var SearchModel       = require('./search');

// User Schema
var userSchema        = mongoose.Schema({
  username: {
    type:       String,
    required:   true,
    unique:     true
  },
  email: {
    type:       String,
    required:   true,
    unique:     true
  },
  password: {
    type:       String,
    required:   true
  },
  firstName: {
    type:       String
  },
  lastName: {
    type:       String
  }
}, { timestamps: true });

// Hash the password before saving
userSchema.pre("save", function(next){
  if(this.isModified || this.isNew){
    this.password = bcrypt.hashSync(this.password, 10);
  }
  next();
});

userSchema.methods.authenticate = function(submittedPassword){
  return bcrypt.compareSync(submittedPassword, this.password);
};

// Export User Model
module.exports = mongoose.model("User", userSchema);
