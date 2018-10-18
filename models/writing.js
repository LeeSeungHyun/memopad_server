const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const config = require('../config');
const Favorite = require ('./favorite')

const Writing = new Schema({
    username: String,
    content:  String,
    createdTime: { type: Date, default: Date.now },
    favoriteCount: { type: Number, default: 0 },
    //favorite : [{ type: Schema.Types.ObjectId, ref: 'Favorite'}]
})

// create new Writing document
Writing.statics.create = function(username, content) {
    const writing = new this({
        username,
        content
    })
    // return the Promise
    return writing.save();
}

// delete new Writing document
Writing.statics.edit = function(writing) {
    return this.findById(writing._id, function(err, write){
        if(write){
            write.content = writing.content;
        }

        write.save(function(err){
        
        });
    });
}

//
Writing.statics.favoriteCountUp = function(_id) {
    this.findById(_id, function(err, writing){
        if(writing){
            writing.favoriteCount++;
        }

        writing.save(function(err){
        
        });
    });
}

//
Writing.statics.favoriteCountDown = function(_id) {
    this.findById(_id, function(err, writing){
        if(writing){
            writing.favoriteCount--;
        }

        writing.save(function(err){
        
        });
    });
}

Writing.statics.addFavorite = function(_id, username, favorite_id) {
    this.findOne({_id: _id, username: username}, function(err, writing){
        if(writing){
            writing.favorite.push(favorite_id);
        }

        writing.save(function(err){
        
        });
    });
}

// delete new Writing document
Writing.statics.delete = function(_id) {
    return this.findOneAndRemove({ _id: _id }, (err) => {
        // if(err){
        //     console.log(err);
        // } else {
        //     console.log('delete success');
        // }
    });
}

// find one user by using username
Writing.statics.findOneByUsername = function(username) {
    return this.findOne({
        username
    }).exec()
}

// create new Writing document
// Writing.statics.isFavorite = function(writingid, username) {
//     const favorite = new this({
//         writingid,
//         username
//     })
//     var temp = Writing;
//     return Favorite.findOne({writingid: writingid, username: username}, function(err, isfavorite){
//         if(isfavorite){
//             isfavorite.remove();
//             //Writing.favoriteCountDown(writingid);
//         } else {
//             Favorite.save(function(err, favorite){
//                 // Writing.findOne({_id: writingid, username: username}, function(err, writing){
//                 //     console.log(favorite);
//                 //     if(writing){
//                 //         writing.favorite.push(favorite._id);
//                 //     }
        
//                 //     writing.save(function(err){
                    
//                 //     });
//                 // });
//             });
//             //Writing.favoriteCountUp(writingid);
//         }
//     });
// }

module.exports = mongoose.model('Writing', Writing)
