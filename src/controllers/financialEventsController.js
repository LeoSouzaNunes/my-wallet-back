import jwt from "jsonwebtoken";
import connection from "../database.js";

export async function postFinancialEvent(req, res) {
    try {
        const user = res.locals.user;

        const { value, type } = req.body;

        if (!value || !type) {
            return res.sendStatus(422);
        }

        const financialTypes = ["INCOME", "OUTCOME"];
        if (!financialTypes.includes(type)) {
            return res.sendStatus(422);
        }

        if (value < 0) {
            return res.sendStatus(422);
        }

        await connection.query(
            `INSERT INTO "financialEvents" ("userId", "value", "type") VALUES ($1, $2, $3)`,
            [user.id, value, type]
        );

        res.sendStatus(201);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export async function getFinancialEvents(req, res) {
    try {
        const user = res.locals.user;

        const events = await connection.query(
            `SELECT * FROM "financialEvents" WHERE "userId"=$1 ORDER BY "id" DESC`,
            [user.id]
        );

        res.send(events.rows);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export async function getSum(req, res) {
    try {
        const user = res.locals.user;

        const events = await connection.query(
            `SELECT * FROM "financialEvents" WHERE "userId"=$1 ORDER BY "id" DESC`,
            [user.id]
        );

        const sum = events.rows.reduce(
            (total, event) =>
                event.type === "INCOME"
                    ? total + event.value
                    : total - event.value,
            0
        );

        res.send({ sum });
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}
