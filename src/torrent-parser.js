const fs = require('fs');
const bencode = require('bencode');
const crypto = require('crypto');
//const bign//const bignum = require('bignum');
const bn = require('bn.js');

module.exports.open = (filepath) => {
    return bencode.decode(fs.readFileSync(filepath));
};

module.exports.size = torrent => {
    const size = torrent.info.files ?
        torrent.info.files.map(file => file.length).reduce((a, b) => a + b) :
        torrent.info.length;

    // return bignum.toBuffer(size, { size: 8 });
    return new bn(size).toBuffer('be', 8);
};

module.exports.infoHash = torrent => {
    const info = bencode.encode(torrent.info);
    return crypto.createHash('sha1').update(info).digest();
};