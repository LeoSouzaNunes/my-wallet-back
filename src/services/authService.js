import bcrypt from "bcrypt";
import * as authRepository from "../repositories/authRepository.js";

export async function signUp(name, email, password) {
    const existingUsers = await authRepository.selectUsers(email);

    if (existingUsers.rowCount > 0) {
        throw { type: "conflict", message: "User already exists" };
    }

    const hashedPassword = bcrypt.hashSync(password, 12);
    await authRepository.createUser(name, email, hashedPassword);
}

export async function signIn(email, password) {
    const { rows } = await authRepository.selectUsers(email);
    const [user] = rows;

    if (!user || !bcrypt.compareSync(password, user.password)) {
        throw { type: "unauthorized", message: "Unauthorized" };
    }

    const token = jwt.sign(
        {
            id: user.id,
        },
        process.env.JWT_SECRET
    );

    return token;
}
