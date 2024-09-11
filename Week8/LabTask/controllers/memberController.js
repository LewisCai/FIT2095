const Member = require('../models/member');

// Get all members
exports.getMembers = async (req, res) => {
    try {
        const members = await Member.find();
        res.json(members);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Add a member
exports.addMember = async (req, res) => {
    const member = new Member({
        name: req.body.name,
        age: req.body.age,
        phone: req.body.phone
    });

    try {
        const newMember = await member.save();
        res.status(201).json(newMember);
        res.redirect(`/33120102/members`);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update member
exports.updateMember = async (req, res) => {
    try {
        const member = await Member.findById(req.params.memberId);
        if (!member) return res.status(404).json({ message: "Member not found" });

        member.name = req.body.name || member.name;
        member.age = req.body.age || member.age;
        member.phone = req.body.phone || member.phone;

        const updatedMember = await member.save();
        res.json(updatedMember);
        res.redirect(`/33120102/members`);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
