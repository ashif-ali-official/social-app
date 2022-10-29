const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

//Update User
router.put("/:id", async (req, res) => {
    try{

        if(req.body.userId === req.params.id || req.body.isAdmin){
            if(req.body.password){
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
                res.status(200).json("Password has been updated");
            }
            const user = await User.findByIdAndUpdate(req.params.id,{
                $set: req.body
            });
            res.status(200).json("Account has been updated");

        } else{
            return res.status(403).json("You can only update your account!");
        }

    } catch(err){
        res.status(500).json(err);
    }
});


//Delete User
router.delete("/:id", async (req, res) => {
    try{

        if(req.body.userId === req.params.id || req.body.isAdmin){
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account has been deleted");
        } else{
            return res.status(403).json("You can only delete your account!");
        }

    } catch(err){
        res.status(500).json(err);
    }
});


//Get a User
router.get("/", async (req,res) => {

    const userId = req.query.userId;
    const username = req.query.username;

    try{

        const user = userId ? await User.findById(userId) :  await User.findOne({username: username});
        const { password, updatedAt, isAdmin, ...other} = user._doc;
        res.status(200).json(other);

    } catch(err){
        res.status(500).json(err);
    }
});

//Get friends
router.get("/friends/:userId", async (req, res) => {
    try{

        const user = await User.findById(req.params.userId);
        const friends = await Promise.all(
            user.following.map( (friendId) => {
                return User.findById(friendId);
            })
        )

        let friendList = [];
        friends.map( (friend) => {
            const { _id, username, profilePicture} = friend;
            friendList.push({ _id, username, profilePicture });
        });
 
        res.status(200).json(friendList);

    } catch(err){
        res.status(500).json(err);
    }
})


//Follow a User
router.put("/:id/follow", async (req, res) => {

    try{
        
        if(req.body.userId !== req.params.id){

            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);

            if(!user.followers.includes(req.body.userId)){

                await user.updateOne({$push: { followers: req.body.userId }});
                await currentUser.updateOne({$push: { following: req.params.id }});
                res.status(200).json("User has been followed");

            }else{
                res.status(403).json("You already follow");
            }

        } else{
            res.status(403).json("You can't follow yourself");
        }

    } catch(err){
        res.status(500).json(err);
    }

});


//Unfollow a User
router.put("/:id/unfollow", async (req, res) => {

    try{
        
        if(req.body.userId !== req.params.id){

            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);

            if(user.followers.includes(req.body.userId)){

                await user.updateOne({$pull: { followers: req.body.userId }});
                await currentUser.updateOne({$pull: { following: req.params.id }});
                res.status(200).json("User has been unfollowed");

            }else{
                res.status(403).json("You don't follow");
            }

        } else{
            res.status(403).json("You can't unfollow yourself");
        }

    } catch(err){
        res.status(500).json(err);
    }

});

module.exports = router;