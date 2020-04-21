const isLoggedIn = (req, res, next) => {
	if (!req.session.userId) return res.send('You are not allowed to perform this action.');
	next();
};

module.exports = isLoggedIn;
