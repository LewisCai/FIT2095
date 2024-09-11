const Gym = require('../models/gym');
const Member = require('../models/member');

// Get all gyms
exports.getGyms = async (req, res) => {
    try {
        const gyms = await Gym.find();
        res.json(gyms);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Add a gym
exports.addGym = async (req, res) => {
    const gym = new Gym({
        name: req.body.name,
        location: req.body.location
    });

    try {
        const newGym = await gym.save();
        // Redirect to the getGyms route after a successful gym creation
        res.redirect(`/33120102/gyms`);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


// Add an existing member to a gym
exports.addMemberToGym = async (req, res) => {
    try {
        const gym = await Gym.findById(req.params.gymId);
        if (!gym) {
            return res.status(404).json({ message: 'Gym not found' });
        }

        const member = await Member.findById(req.params.memberId);
        if (!member) {
            return res.status(404).json({ message: 'Member not found' });
        }

        // Check if the member is already in the gym's members array
        const isMemberExists = gym.members.some(m => m._id.equals(member._id));
        if (isMemberExists) {
            return res.status(400).json({ message: 'Member is already in the gym' });
        }

        // Add the member to the gym's members array
        gym.members.push(member);
        await gym.save();

        // Redirect to the gyms list after adding the member
        res.redirect(`/33120102/gyms`);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Delete a gym
exports.deleteGym = async (req, res) => {
    try {
        const gym = await Gym.findById(req.params.id);
        if (!gym) return res.status(404).json({ message: "Gym not found" });
        await gym.remove();
        res.redirect(`/33120102/gyms`);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
