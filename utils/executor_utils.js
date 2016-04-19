var bCrypt = require('bcrypt-nodejs');
var crypto = require('crypto'), algorithm = 'aes-256-ctr', password = 'd6F3Efeq';


var createHash = function (password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}


var isValidPassword = function (user, password) {
    return bCrypt.compareSync(password, user.password);
}

var encrypt = function (text) {
    var cipher = crypto.createCipher(algorithm, password)
    var crypted = cipher.update(text, 'utf8', 'hex')
    crypted += cipher.final('hex');
    return crypted;
}

var decrypt = function (text) {
    var decipher = crypto.createDecipher(algorithm, password)
    var dec = decipher.update(text, 'hex', 'utf8')
    dec += decipher.final('utf8');
    return dec;
}


module.exports = {
    createHash: createHash,
    isValidPassword: isValidPassword,
    encrypt: encrypt,
    decrypt: decrypt
}