import bcrypt from 'bcrypt';
import User from '../models/User.js';

const register = async (req, res) => {
    try {
        const { name, birth_date, email, password, role } = req.body;

        if (!name || !birth_date || !email || !password) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const existingUser = await User.findOne({ where: { email } });
        
        if (existingUser) {
            return res.status(403).json({ error: "Email already registered" });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const user = await User.create({
            name: name.trim(),
            birth_date,
            email: email.trim(),
            password: passwordHash,
            role: role === 'admin' ? 'admin' : 'user',
            status: 'active'
        });

        console.log("Registered user:", user.toJSON());

        req.session.user = { id: user.id, role: user.role, email: user.email, name: user.name };
        
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Missing email or password' });
        }

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const passwordCheck = await bcrypt.compare(password, user.password);

        if (!passwordCheck) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        if (user.status !== 'active') {
            return res.status(403).json({ error: 'User is blocked' });
        }

        req.session.user = { id: user.id, role: user.role, email: user.email, name: user.name };

        res.json({ message: 'Login successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        if (parseInt(req.session.user.id) !== parseInt(id) && req.session.user.role !== 'admin') {
            return res.status(403).json({ error: 'Forbidden' });
        }

        const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({ attributes: { exclude: ['password'] } });
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }   
};

const blockUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (parseInt(req.session.user.id) !== parseInt(id) && req.session.user.role !== 'admin') {
            return res.status(403).json({ error: 'Forbidden' });
        }

        const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.status ='inactive';
        await user.save();

        res.json({ message: 'User blocked successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export default {
    register,
    login,
    getUserById,
    getAllUsers,
    blockUser
};