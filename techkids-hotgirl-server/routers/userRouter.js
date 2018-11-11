const express = require('express');
const UserRouter = express.Router();

const UserModel = require('../models/userModel');

// Middleware
UserRouter.use((req, res, next) => {
	console.log("User middleware");
	next();
});

// "/api/users" => get all
UserRouter.get("/", (req, res) => {
	console.log("Get all user");
	UserModel.find({}, "name email avatar intro posts")
	.populate("posts","user url title")
	.then(users => res.json({success:1,users}))

	.catch(err =>res.status(500).json({ success: 0, error: err }))
		
});

// get user by id
UserRouter.get("/:id", (req, res) => {
	let userId = req.params.id;
	UserModel.findById(userId, (err, userFound) => {
		if(err) res.status(500).json({ success: 0, message: err })
		else if(!userFound) res.status(404).json({ success: 0, message: "Not found!" })
		else res.json({ success: 1, user: userFound });
	});
});

// Create user
UserRouter.post("/", (req, res) => {
	console.log(req.body)
	const { name, email, password, avatar, intro } = req.body;
	UserModel.create({ name, email, password, avatar, intro }, (err, userCreated) => {
		if(err) res.status(500).json({ success: 0, message: err })
		else res.status(201).json({ success: 1, user: userCreated });
	});
});

// Edit user
UserRouter.put("/:id", (req, res) => {

	// UserModel.findByIdAndUpdate(userId, { name, password, avatar, intro }, { new: true }, (err, userUpdated) => {
	// 	if(err) res.status(500).json({ success: 0, message: err })
	// 	else res.json({ success: 1, user: userUpdated });
	// });
	const userId = req.params.id;
	const { name, password, avatar, intro, posts } = req.body;

	UserModel.findById(userId, (err, userFound) => {
		if(err) res.status(500).json({ success: 0, message: err })
		else if(!userFound) res.status(404).json({ success: 0, message: "Not found!" })
		else {
			for(key in { name, password, avatar, intro, posts }) {
				if(userFound[key] && req.body[key]) userFound[key] = req.body[key];
			}

			userFound.save((err, userUpdated) => {
				if(err) res.status(500).json({ success: 0, message: err })
				else res.json({ success: 1, user: userUpdated });
			});
		};
	});
});

// Delete user => BTVN
UserRouter.delete("/:id", (req, res) => {
	const userId = req.params.id;
	UserModel.remove({ _id: userId }, (err) => {
		if(err) res.status(500).json({ success: 0, message: err})
		else res.json({ success: 1 });
	});
});

module.exports = UserRouter;