import { db } from "../database/database.connection.js";

export async function postCustomer(req, res) {
  const { name, phone, cpf, birthday } = req.body;

  try {
    const existCustomer = await db.query(
      `SELECT cpf FROM customers WHERE cpf = $1`,
      [cpf]
    );

    if (existCustomer.rowCount > 0) {
      return res.status(409).send("cliente já existe");
    }

    await db.query(
       `INSERT INTO customers (name, phone, cpf, birthday)
        VALUES ($1, $2, $3, $4)`,
      [name, phone, cpf, birthday]
    );

    res.status(201).send("Cliente adicionado");
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function getCustomers(req, res) {
  try {
    const customer = await db.query(`SELECT * FROM customers`);
    res.status(200).send(customer.rows);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function getIdCustomers(req, res) {
  try {
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function putCustomers(req, res) {
  try {
  } catch (error) {
    res.status(500).send(error);
  }
}
