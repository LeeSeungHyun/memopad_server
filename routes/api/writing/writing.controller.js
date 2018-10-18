const Writing = require ('../../../models/writing')
const Favorite = require ('../../../models/favorite')
/* 
    GET /api/writing/list
*/
exports.list = (req, res) => {
    Writing.find({})
    //     res.json({writings})
    //   }); 
    .then(
        writings => {
            res.json({writings})
        }
    )
}

exports.favoriteList = (req, res) => {
    Favorite.find({})
    .then(
        favorites => {
            res.json({favorites})
        }
    )
}

/*
    POST /api/writing/create
*/
exports.create = (req, res) => {
    const { username, content } = req.body;
    // create a new user if does not exist

    // respond to the client
    const respond = (writing) => {
        res.json({
            data: writing,
        })
    }

    // run when there is an error (username exists)
    const onError = (error) => {
        res.status(409).json({
            message: error.message
        })
    }

    //Writing.findOneByUsername(username)
    Writing.create(username, content)
    .then(respond)
    .catch(onError)
}

/*
    update /api/writing/edit
*/
exports.edit = (req, res) => {
   const writing = req.body;
   // run when there is an error (username exists)
   const respond = () => {
        res.json({
            data: writing
        })
    }
   const onError = (error) => {
        res.status(409).json({
            message: error.message
        })
    }
    //res.send(writing);
    Writing.edit(writing)
    .then(respond)
    .catch(onError);
}


/*
    Delete /api/writing/delete
*/
exports.delete = (req, res) => {
    const _id  = req.body._id;
    console.log(_id);
    const respond = (favorite) => {
        res.json({
            data: _id,
        })
    }

    const onError = (error) => {
        res.status(409).json({
            message: error.message
        })
    }

    Writing.delete(_id)
    .then(respond)
    .catch(onError)
}

/*
    post /api/writing/favorite
*/
exports.isFavorite = (req, res) => {
    const { _id, username } = req.body;

    // respond to the client
    const respond = (favorite) => {
        res.json({
            data: favorite
        })
        // if(favorite){
        //     Writing.favoriteCountDown(_id);
        // } else {
        //     Writing.favoriteCountUp(_id);
        //     Favorite.addFavorite(_id, username)
        //     .then(
        //         favo => {
        //             console.log(favo);
        //         }
        //     );
        // }
    }

    const onError = (error) => {
        res.status(409).json({
            message: error.message
        })
    }

    const changeFavoriteCount = (_id, username) => {
        Favorite.findOne({writingid: _id, username: username})
        .then(
            favorite => {
                if(favorite){
                    Writing.favoriteCountDown(_id);
                } else {
                    Writing.favoriteCountUp(_id);
                    // Favorite.addFavorite(_id, username)
                    // .then(
                    //     favo => {
                    //         Writing.addFavorite(_id, username, favo._id);
                    //     }
                    // );
                }
            }
        )
    }
    
    Favorite.isFavorite(_id, username)
    .then(changeFavoriteCount(_id, username))
    .then(respond)
    .catch(onError)
}


