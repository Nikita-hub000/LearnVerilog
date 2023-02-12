const express = require("express");
const Chat = require("../db/schemes/chatScheme");
const router = express.Router();



router.post("/initFriends", async (req, res) => {
    try {
        let userData = await Friend.findOne({ userID: req.body.id });
        if (!userData) {
             userData = await Friend.create({
                userID: req.body.id,
                friends: [],
                requests: [],
                responses: [],
            });
        } 
        return res.status(200).json({friends: {userData}})
    } catch(error) {
        return res.status(500)
    }

  });

  router.post("/addNew", async (req, res) => {
    try {
        let from = await Friend.findOne({userID: req.body.id})
        let to = await Friend.findOne({userID: req.body.friendId})
        from.friends.push(to.userID)
        to.friends.push(from.userID)
        await Friend.findOneAndUpdate({userID: req.body.id}, {responses: from.responses.filter(x => x !== to.userID), friends: from.friends})
        await Friend.findOneAndUpdate({userID: req.body.friendId}, {requests: to.requests.filter(x => x !== from.userID), friends: to.friends})
        return res.status(200).json({message: 1})
    } catch(error) {
        return res.status(500)
    }

  });

  router.post("/decline", async (req, res) => {
    try {
        let from = await Friend.findOne({userID: req.body.id})
        let to = await Friend.findOne({userID: req.body.friendId})
        from.friends.push(to.userID)
        to.friends.push(from.userID)
        await Friend.findOneAndUpdate({userID: req.body.id}, {responses: from.responses.filter(x => x !== to.userID)})
        await Friend.findOneAndUpdate({userID: req.body.friendId}, {requests: to.requests.filter(x => x !== from.userID)})
        return res.status(200).json({message: 1})
    } catch(error) {
        return res.status(500)
    }

  });

  router.post("/check", async (req, res) => {
    try {
      let from = await Friend.findOne({userID: req.body.from})
      let to = await Friend.findOne({userID: req.body.to})
      console.log(from, '/',  to, '/',to.requests)
      if(from.requests.includes(to.userID) || from.requests.includes(from.userID) || to.responses.includes(from.userID) ||  to.responses.includes(to.userID)) {
        return res.status(200).json({message: 1})
      }
      return res.status(200).json({message: 0})
    } catch(error) {
        return res.status(500)
    }

  });

  router.post("/add", async (req, res) => {
    try {
        let from = await Friend.findOne({userID: req.body.from})
        let to = await Friend.findOne({userID: req.body.to})
        if(from.requests.includes(to.id) || to.responses.includes(from.id)) {
          return res.status(200).json({message: 1})
        }
        await Friend.findOneAndUpdate({userID: req.body.from}, {requests: [...from.requests, req.body.to]})
        await Friend.findOneAndUpdate({userID: req.body.to}, {responses: [...to.responses, req.body.from]})
        return res.status(200).json({message: 1})
    } catch(error) {
        return res.status(500)
    }

  });

router.post("/all", async (req, res) => {
  try {
    let userChats = await Chat.find({userId1: req.body.id}) 
    userChats = !!userChats[0].userId1 ? userChats : await Chat.find({userId2: req.body.id})
    // console.log(userChats, req.body.id)
    return res.status(201).json({
      userChats
    });
  } catch (error) {
    console.log(err);
    return res.status(500).json({
      error: err,
    });
  }
});

module.exports = router;
