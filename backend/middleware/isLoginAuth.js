export const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    next(); // user is logged in
  } else {
    res.status(401).json({ msg: "Unauthorized. Please log in." });
  }
};
