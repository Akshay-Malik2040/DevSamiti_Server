const { validateEditProfileData } = require('../utils/validation')
const profile = async (req, res) => {
    try {
        const loggedInUser = req.user;
        res.json({ loggedInUser });
    } catch (err) {
        res.status(400).json({ Error: err.message });
    }
}

const profileEdit = async (req, res) => {
    try {
        if (!validateEditProfileData(req)) throw new Error("Invalid Edit Request")
        const loggedInUser = req.user;
        Object.keys(req.body).forEach((key)=>loggedInUser[key]=req.body[key]);
        await loggedInUser.save();
        res.json({message:"Profile Updated",loggedInUser})
    } catch (err) {
        res.status(400).json({ Error: err.message })
    }
}

module.exports = { profile,profileEdit };