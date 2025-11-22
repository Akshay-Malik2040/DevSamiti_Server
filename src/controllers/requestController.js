const Connection = require('../models/Connection')
const User = require('../models/User')

const sendRequest = async (req, res) => {
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedStatus = ['ignored', 'interested'];
        if (!allowedStatus.includes(status)) throw new Error("Invalid Status");

        const existingConnectionRequest = await Connection.findOne({
            $or: [
                {
                    fromUserId, toUserId
                }, {
                    fromUserId: toUserId, toUserId: fromUserId
                }
            ]
        })

        if (existingConnectionRequest) throw new Error("Connection Request already exists")

        const toUser = await User.findById(toUserId).exec();
        if (!toUser) throw new Error("User not found")

        if (toUserId.toString() === fromUserId.toString()) {
            throw new Error("Cannot send req to Yourself")
        }

        const connection = await Connection.create({ toUserId, fromUserId, status });
        res.json({ message: "Request Sent", connection });

    } catch (err) {
        res.status(400).json({ Error: err.message })
    }
}

const reviewRequest = async (req, res) => {

}

module.exports = { sendRequest }