const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const config = require('../config');
const Writing = require('./writing');

const Favorite = new Schema({
    writingid: String,
    username: String
})

// create new Writing document
Favorite.statics.isFavorite = function(writingid, username) {
    const favorite = new this({
        writingid,
        username
    })

    return this.findOne({writingid: writingid, username: username}, function(err, isfavorite){
        if(isfavorite){
            isfavorite.remove();
        } else {
            favorite.save();
        }
    });
}

// find one user by using username
Favorite.statics.findOneBy_id = function(_id) {
    return this.findOne({
        writingid : _id
    }).exec()
}

Favorite.statics.addFavorite = function(_id, username) {
    return this.findOne({writingid: _id, username: username}, function(err, favorite){
        // if(favorite){
        //     return favorite
        // }else{
        //     console.log(234);
        // }

        // writing.save(function(err){
        
        // });
    });
}

module.exports = mongoose.model('Favorite', Favorite)