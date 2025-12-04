import jwt from '@fastify/jwt';


export async function setupJWT(app) {
    await app.register(jwt, {
        secret: process.env.JWT_SECRET || 'your-secret-key', // Ganti dengan secret key yang aman
        sign: { expiresIn: '7d'} // Token berlaku selama 1 jam
    });
    app.log.info('JWT setup completed');    
}

export function generateToken(payload) {
    // Pastikan app telah diinisialisasi sebelum memanggil fungsi ini
    if (!payload) {
        throw new Error('Payload is required to generate a token');
    }
    return app.jwt.sign(payload);
}

export async function verifyToken(token) {
    try {
        await await app.jwt.verify(token);
    } catch (err) {
        throw new app.jwt.decode(token);
    }
}

export function decodeToken(token) {
    return app.jwt.decode(token);
}