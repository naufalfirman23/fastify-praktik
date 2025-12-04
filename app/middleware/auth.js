export async function authenticate(request, reply) {
    try {
        const authHeader = request.headers.authorization;
        if (!authHeader  || !authHeader.startsWith('Bearer ')) {
            reply.code(401)
            throw new Error('Unauthorized: Missing or invalid Authorization header');
        }
        const token = authHeader.split(' ')[1];
        const decoded = await request.jwtVerify(token);
        request.user = decoded;
    } catch (error) {
        if (error.message.includes('Expired token')) {
            reply.code(401)
            throw new Error('Unauthorized: Token has expired');
        }

        if (error.message.includes('Invalid token')) {
            reply.code(401)
            throw new Error('Unauthorized: Invalid token');
        }

        reply.code(401)
        throw new Error('Authentication failed');
    }
}


export function authorize(roles = []) {
    return async (request, reply) => {
        if (!request.user) {
            reply.code(401)
            throw new Error('Authorization required');
        }

        if (roles.length > 0  && !roles.includes(request.user.role)) {
            reply.code(403);
            throw new Error('Insufficient permissions');
        }
    };
}


export async function refreshToken(request, reply) {
    try {
        const refreshToken = request.headers['x-refresh-token'];

        if (!refreshToken) {
            reply.code(401);
            throw new Error('Refresh token required');
        }

        const decoded = await request.jwtVerify(refreshToken, {
            secret: process.env.JWT_REFRESH_SECRET || 'refresh_secret_key'
        });

        // Get user information to create new access token
        const newAccessToken = await request.jwt.sign({
            id: decoded.id,
            email: decoded.email,
            role: decoded.role
        }, {
            expiresIn: process.env.JWT_ACCESS_EXPIRE_TIME || '15m'
        });

        return newAccessToken;
    } catch (error) {
        reply.code(401);
        throw new Error('Failed to refresh token');
    }

}