import jwt from 'jsonwebtoken';

import auth from '../../config/auth';
import User from '../models/User';

class SessionController {
    async store(request, response) {
        const { email, password } = request.body;

        const user = await User.findOne({ where: { email } });

        if (!user) {
            response.status(401).json({ error: 'User not found' });
        }

        if (!(await user.checkPassword(password))) {
            response.status(401).json({ error: 'Passoword does not match' });
        }

        const { id, name } = user;

        return response.json({
            user: {
                id,
                name,
                email,
            },
            token: jwt.sign({ id }, auth.secret, {
                expiresIn: auth.expiresIn,
            }),
        });
    }
}

export default new SessionController();
