module.exports = (req, res, next) => {
	//check if we have a session and if inside that section there's a user property
	if (req.session && req.session.user) {
		next();
	} else {
		res.status(401).json({ error: 'you shall not pass' });
	}
};
