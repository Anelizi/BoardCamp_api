import { db } from "../database/database.connection.js";

export async function postCustomer(req, res) {
  const { name, phone, cpf, birthday } = req.body;

  try {
    const existCustomer = await db.query(`SELECT cpf FROM customers WHERE cpf = $1;`,[cpf]);

    if (existCustomer.rowCount > 0) {
      return res.status(409).send("cliente já existe");
    }

    await db.query(
       `INSERT INTO customers ("name", "phone", "cpf", "birthday")
        VALUES ($1, $2, $3, $4);`,
      [name, phone, cpf, birthday]
    );

    res.status(201).send("Cliente adicionado");
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function getCustomers(req, res) {
  try {
    const customer = await db.query("SELECT * FROM customers;");
    res.status(200).send(customer.rows);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function getIdCustomers(req, res) {
    const { id } = req.params;

  try {
    const customer = await db.query(`SELECT * FROM customers WHERE id = $1;`, [id]);

    if(customer.rowCount === 0) return res.status(404).send("cliente não existir")

    res.status(200).send(customer.rows[0]);

  } catch (error) {
    res.status(500).send(error);
  }
}

export async function putCustomers(req, res) {
    const { id } = req.params;
    const { name, phone, cpf, birthday } = req.body;

  try {
    const customer = await db.query(`SELECT cpf FROM customers WHERE cpf = $1 AND id <> $2;`, 
        [cpf, id]
    );

    if(customer.rows.length > 0){
        return res.status(409).send("Cliente não existi")
    }

    await db.query(`UPDATE customers SET "name" = $1, "phone" = $2, "cpf" = $3, "birthday" = $4 WHERE id = $5;`,
        [name, phone, cpf, birthday, id] 
    )

    res.status(200).send("Objeto editado")
  } catch (error) {
    res.status(500).send(error);
  }
}
