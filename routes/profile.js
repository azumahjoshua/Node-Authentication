const router = require("express").Router();
const User = require("../model/User");
const verfiy = require("./verfiytoken")

router.get('/profile', verfiy,async (req, res) => {
    const id = req.user._id
   try {
        //  find user by id
        const userProfile = await User.findById(id)
        const user = {
            name:userProfile.name,
            email:userProfile.email
        }
        res.status(200).json(user)
   } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
   }
});

module.exports = router