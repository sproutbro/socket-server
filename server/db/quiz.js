import { db } from "./index.js";

export async function findScoreById(userId) {
    const result = await db.query(
        `SELECT 
            SCORE
        FROM 
            QUIZ 
        WHERE
            USER_ID = $1`,
        [userId]
    )

    return result.rows[0]?.score ?? null;
}

export async function findUser(userId) {
    const result = await db.query(
        `SELECT 
            USER_ID
        FROM 
            QUIZ 
        WHERE
            USER_ID = $1`,
        [userId]
    )

    return result.rows[0]?.user_id ?? null;
}

export async function saveNewUser(userId) {
    const result = await db.query(
        `INSERT INTO 
            QUIZ (user_id)
        VALUES
            ($1)
        RETURNING 
            USER_ID`,
        [userId]
    )

    return result.rows[0] ?? null;
}

export async function updateScore(userId, score) {
    const result = await db.query(
        `UPDATE 
            QUIZ 
        SET 
            SCORE = $2
        WHERE 
            USER_ID = $1`,
        [userId, score]
    )

    return result.rows[0] ?? null;
}

