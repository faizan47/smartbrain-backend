const signOut = async (req, res) => {
	try {
		req.session.userId = null;
		res.status(200).json('You have been signed out!');
	} catch (error) {
		res.status(404).json({ error });
	}
};

module.exports = signOut;
