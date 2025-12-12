import bcrypt from "bcryptjs";
import { getConnection } from "../database/connection.js";
import { getUserByEmail, getUserByPhone, createUser } from "./userController.js";

class AuthController {

    async register(request, reply) {
        const {username, email, phone, password, role = 'user'} = request.body;
        if (!username || !email || !password || !phone) {
            reply.code(400);
            throw new Error('Username, email, and password dibutuhkan!');
        }

        if (password.length < 6) {
            reply.code(400);
            throw new Error('Password minamal 6 karakter!');
        }

        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            reply.code(409);
            throw new Error('Email sudah digunakan!');
        }

        const exitingUserwithPhone = await getUserByPhone(phone);
        if (exitingUserwithPhone) {
            reply.code(409);
            throw new Error('Phone sudah digunakan!');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        try{
            const connection = getConnection();
            const [result] = await connection.execute(
                'INSERT INTO users (username, email, phone, password, role) VALUES (?, ?, ?, ?, ?)',
                [username, email, phone, hashedPassword, role]
            );

            console.log('Insert Result:', result);
            const [newUserRows] = await connection.execute(
                'SELECT * FROM users WHERE id = ?',
                [result.insertId]
            );

            const newUser = newUserRows[0];

            if (!newUser) {
                reply.code(500);
                throw new Error('Gagal membuat user!');
            }

            const accessToken = request.server.jwt.sign({
                id: newUser.id,
                email: newUser.email,
                role: newUser.role
            });

            const refreshToken = request.server.jwt.sign(
                {id: newUser.id},
                {expiresIn: '7d'}
            );

            const { password: _, ...userWithoutPassword } = newUser;

            return {
                message: 'User berhasil didaftarkan!',
                user : userWithoutPassword,
                tokens: {
                    accessToken,
                    refreshToken
                }
            }

        }catch(error){
            console.error('Error creating user:', error);
            reply.code(500);
            throw new Error('Gagal membuat user karena kesalahan server!');
        }
    }

    // async register(request, reply) {
    //     const {name, email, password, phone,  role = 'user'} = request.body;
    //     if (!name || !email || !password) {
    //         reply.code(400);
    //         throw new Error('Name, email, and password are required');
    //     }

    //     if (password.length < 6) {
    //         reply.code(400);
    //         throw new Error('Password must be at least 6 characters long');
    //     }

    //     const existingUser = await getUserByEmail(email);
    //     if (existingUser) {
    //         reply.code(409);
    //         throw new Error('Email already in use');
    //     }

    //     const salt = await bcrypt.genSalt(10);
    //     const hashedPassword = await bcrypt.hash(password, salt);

    //     try{
    //         const connection = getConnection();
    //         const [result] = await connection.execute(
    //             'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
    //             [name, email, hashedPassword, role]
    //         );

    //         const [newUserRows] = await connection.execute(
    //             'SELECT * FROM users WHERE id = ?',
    //             [result.insertId]
    //         );

    //         const newUser = newUserRows[0];

    //         if (!newUser) {
    //             reply.code(500);
    //             throw new Error('Failed to create user');
    //         }

    //         const accessToken = request.jwt.sign({
    //             id: newUser.id,
    //             email: newUser.email,
    //             role: newUser.role
    //         });

    //         const refreshToken = request.jwt.sign(
    //             {id: newUser.id},
    //             {expiresIn: '7d'}
    //         );

    //         const { password: _, ...userWithoutPassword } = newUser;

    //         return {
    //             message: 'User registered successfully',
    //             user : userWithoutPassword,
    //             tokens: {
    //                 accessToken,
    //                 refreshToken
    //             }
    //         }

    //     }catch(error){
    //         console.error('Error creating user:', error);
    //         reply.code(500);
    //         throw new Error('Failed to create user due to server error');
    //     }
    // }

    async login(request, reply) {
        const { email, password } = request.body;
        if (!email || !password) {
            reply.code(400);
            throw new Error('Email and password are required');
        }
        const user = await getUserByEmail(email);
        if (!user) {
            reply.code(401);
            throw new Error('Invalid email');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            reply.code(401);
            throw new Error('Invalid password');
        }
        const accessToken = request.server.jwt.sign({
            id: user.id,
            email: user.email,
            role: user.role
        });
        const refreshToken = request.server.jwt.sign(
            {id: user.id},
            {expiresIn: '7d'}
        );

        // Update last login in the database
        const connection = await getConnection();
        await connection.query('UPDATE users SET last_login = ? WHERE id = ?', [new Date(), user.id]);

        const { password: _, ...userWithoutPassword } = user;
        return {
            message: 'Login successful',
            user : userWithoutPassword,
            tokens: {
                accessToken,
                refreshToken
            }
        }
    }
}



export default new AuthController();
