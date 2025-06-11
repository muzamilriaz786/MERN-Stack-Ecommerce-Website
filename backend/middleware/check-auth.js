export const checkAuth = (req,res) => {
    if (req.session.user) {
      res.json({
        isAuthenticated: true,
        role: req.session.user.role,
      });
    } else {
      res.status(401).json({ isAuthenticated: false });
    }
}