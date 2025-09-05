export const authMiddleware = (req, res, next) => {
    if (!req.session || !req.session.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
};

export const adminOnly = (req, res, next) => {
    if (req.session.user.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden' });
    }
    next();
};