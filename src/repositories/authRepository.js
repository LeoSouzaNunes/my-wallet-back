import connection from "../database.js";

export async function createUser(name, email, hashedPassword) {
    return connection.query(
        `INSERT INTO "users" ("name", "email", "password") VALUES ($1, $2, $3)`,
        [name, email, hashedPassword]
    );
}

export async function selectUsers(email) {
    return connection.query(`SELECT * FROM "users" WHERE "email"=$1`, [email]);
}
