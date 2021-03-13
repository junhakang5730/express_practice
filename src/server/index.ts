import "reflect-metadata";
import { createConnection } from "typeorm";
import express, { Request, Response } from "express";

import { Users } from "./entity/Users";
import { Updates } from "./entity/Updates";

const app = express();
app.use(express.json());

//CREATE
app.post("/Users", async (req: Request, res: Response) => {
  const { code, name, address, phone_number, total_weight } = req.body;

  try {
    const user = Users.create({
      code,
      name,
      address,
      phone_number,
      total_weight,
    });

    await user.save();

    return res.status(201).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// READ
app.get("/Users", async (_: Request, res: Response) => {
  try {
    const users = await Users.find();

    return res.status(201).json(users);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// UPDATE
app.put("/Users/:uuid", async (req: Request, res: Response) => {
  const uuid = req.params.uuid;
  const { code, name, address, phone_number, total_weight } = req.body;

  try {
    const user = await Users.findOneOrFail({ uuid });

    user.code = code || user.code;
    user.name = name || user.name;
    user.address = address || user.address;
    user.phone_number = phone_number || user.phone_number;
    user.total_weight = total_weight || user.total_weight;

    await user.save();

    return res.json(user);
  } catch (err) {}
});

// DELETE
app.delete("/Users/:uuid", async (req: Request, res: Response) => {
  const uuid = req.params.uuid;

  try {
    const user = await Users.findOneOrFail({ uuid });
    const user_code = user.code;
    await user.remove();

    return res.status(204).json({ message: `${user_code} is deleted` });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

// ===========================================================================
// 포스팅

// Create a Post
app.post("/posts", async (req: Request, res: Response) => {
  const { user_uuid, title, body } = req.body;

  try {
    const user = await Users.findOneOrFail({ uuid: user_uuid });
    // const post = new Posts({ title, body });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

createConnection()
  .then(async (connection) => {
    app.listen(5000, () => console.log("Server up at http://localhost:5000"));
  })
  .catch((error) => console.log(error));
