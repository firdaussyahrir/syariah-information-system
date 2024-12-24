const User = require("../models/user.model.js");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      position: user.position,
      role: user.role,
    });
  } catch (err) {
    console.log(`Erorr in login controller ${err.message}`);
    res.status(500).json({
      error: `Internal server error occured: ${err.message}`,
    });
  }
};

module.exports = {
  login,
};
