import { db } from "../database/database.connection.js"
import dayjs from "dayjs";

export async function postRent(req, res){
    const { customerId, gameId, daysRentend } = res.body;
    const date = dayjs().format('YYYY-MM-DD');

    try {
        const customer = await db.query(`SELECT name FROM customers WHERE id = $1;`,
            [customerId]
        );

        if(customer.rows.length === 0) return res.status(400).send("Cliente não existi");

        const game = await db.query(`SELECT "princePerDay", "stockTotal" FROM games WHERE id = $1;`,
            [gameId]
        );

        if(game.rows.length === 0) return res.status(400).send("Jogo não existi");

        const prince = date * game.rows[0].princePerDay;

        const rents = await db.query(`SELECT games."stockTotal" 
            FROM rentals returnDate 
            JOIN games
                ON rentals."gameId" = games.id
            WHERE games.id = $1`,
            [gameId]
        );

        if(rents.rowCount > 0){
            if(rents.rowCount >= rents.rows[0].stockTotal) return res.status(400).send("Jogo não existi");
        }

        await db.query(`INSERT INTO rentals ("customerId", "gameId", "rentDate", "dayRented", "originalPrice")
            VALUES ($1, $2, $3, $4, $5)`,
            [customerId, gameId, date, daysRentend, prince]
            );

        res.status(201).send("OK")
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function postIdRent(req, res){
    try {
        
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function getRents(req, res){
    try {
        const rents = await db.query(`SELECT rentals.*, 
            JSON_BUILD_OBJECT(
                'id', customers.id,
                'name', customers.name)
            AS customer, 
            JSON_BUILD_OBJECT(
                'id', games.id,
                'name', games.id)
            AS game
            FORM rentals
            JOIN customers
                ON rentals."customerId" = customers.id
            JOIN games
                ON rentals."gameId" = games.id;
        `);

        res.status(200).send(rents.rows);
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function deleteResnt(req, res){
    const { id } = req.params;

    try {
        const rents = await db.query(`SELECT * FROM rentals WHERE id = $1`, [id]);

        if(rents.rows.length === 0) return res.status(404).send("invalido");

        if(!rents.rows[0].returnDate) return res.status(400).send("invalido");

        await db.query(`DELETE FROM rentals WHERE id = $1`, [id]);

        res.status(200).send("OK")
    } catch (error) {
        res.status(500).send(error);
    }
}