const router = require("express").Router();
const {
  createUser,
  updateUser,
  userGet,
  getAllUsers,
} = require("../services/UserService");

router.route("/create").post(createUser);
router.route("/updateUser").patch(updateUser);
router.route("/getUser/:addr").get(userGet);
router.route("/getAllUser").get(getAllUsers);

module.exports = router;
