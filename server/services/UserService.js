const UserModel = require("../db/User");

module.exports = {
  createUser: async (req, res) => {
    try {
      const walletAddress = req.body.walletAddress;
      const points = req.body.points;
      await UserModel.findOne({
        walletAddress: walletAddress,
        points: points,
      }).then(async (addr) => {
        if (addr !== null) {
          res.status(404).send("User already exists");
        } else {
          const newUser = new UserModel({
            walletAddress: walletAddress,
            points: points,
          });
          await newUser.save().then((docs) => {
            res.status(200).json({
              status: "success",
              user: docs,
              message: "User Created Successfully",
            });
          });
        }
      });
    } catch (error) {
      res.send(error);
    }
  },

  //GET ALL USERS
  getAllUsers: async (req, res) => {
    try {
      const result = await UserModel.find().lean();
      res.send(result);
    } catch (e) {
      res.send(e);
    }
  },

  //GET  USER BY ADDR
  userGet: async (req, res) => {
    try {
      const addr = req.params.addr;

      await UserModel.findOne({ walletAddress: addr }).then(async (user) => {
        if (user == null) {
          res.status(404).send("User not found");
        } else {
          res.status(200).json(user);
        }
      });
    } catch (error) {
      res.send(error);
    }
  },

  //UPDATE USER
  updateUser: async (req, res) => {
    try {
      const { walletAddress, points, counter } = req.body;

      const result = await UserModel.findOneAndUpdate(
        { walletAddress: walletAddress },
        { points: points },
        { new: true }
      );
      if (result) {
        res.status(200).json({
          status: "success",
          data: result,
          message: "User Updated Successfully",
        });
      } else {
        res.status(404).json({ message: "Not Successful" });
      }
    } catch (error) {
      res.send(error);
    }
  },
};
