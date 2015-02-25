/**
 * Module dependencies.
 */
var passport = require('passport-strategy')
  , util = require('util');


function Strategy() {
  passport.Strategy.call(this);
  this.name = 'authenticated';
}

/**
 * Inherit from `passport.Strategy`.
 */
util.inherits(Strategy, passport.Strategy);

/**
 * Authenticate request if it has already been authenticated.
 *
 * @param {Object} req
 * @api protected
 */
Strategy.prototype.authenticate = function(req) {
  var property = 'user';
  if (this._passport && this._passport.instance) {
    property = this._passport.instance._userProperty || 'user';
  }
  
  if (req[property]) {
    // Already authenticated.  Note that we call `pass()` here, rather than
    // `success()`, as the request has already been authenticated and no further
    // session handling is neccessary.
    return this.pass();
  }
  
  // Not already authenticated.
  return this.fail();
};


/**
 * Expose `Strategy`.
 */
module.exports = Strategy;
