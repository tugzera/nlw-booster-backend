import { Request, Response } from "express";
import knex from "../database/connection";

class PointsController {
  async index(request: Request, response: Response) {
    const { city, uf, items } = request.query;

    const parsedItems = String(items)
      .split(",")
      .map((item) => Number(item));


    const points = await knex("points")
      .join("point_items", "points.id", "=", "point_items.point_id")
      .whereIn("point_items.item_id", parsedItems)
      .where("city", String(city))
      .where("uf", String(uf))
      .distinct()
      .select("points.*");


    return response.status(200).send(points);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const point = await knex("points").where("id", id).first();

    if (!point) {
      return response.status(400).send({ message: "Point not found." });
    }

    const items = await knex("items")
      .join("point_items", "items.id", "=", "point_items.item_id")
      .where("point_items.point_id", id);

    return response.status(200).send({ ...point, items: items });
  }

  async create(request: Request, response: Response) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items,
    } = request.body;

    const trx = await knex.transaction();

    const data = {
      image:
        "https://images.unsplash.com/photo-1542739674-b449a8938b59?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    };
    const insertedIds = await trx("points").insert(data);

    const pointItems = items.map((item_id: number) => ({
      item_id,
      point_id: insertedIds[0],
    }));

    await trx("point_items").insert(pointItems);
    await trx.commit();
    return response.status(201).send({ id: insertedIds[0], ...data });
  }
}

export default PointsController;
