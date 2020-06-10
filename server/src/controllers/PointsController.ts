import { Request, Response } from 'express';
import knex from '../database/connections';

class PointsController {

    async index (request: Request, response: Response){       
        const {
            city,
            uf  ,
            items
        } = request.query; // Query Params >> usado para filtros, paginação.
        
        const parsedItems = String(items)
                            .split(',')
                            .map( item => Number(item.trim()));
        
        const points = await knex('points')
                            .select('points.*')
                            .distinct()
                            .join('point_items',' points.id', '=', 'point_items.point_id')
                            .whereIn('point_items.item_id', parsedItems)
                            .where('city', String(city))
                            .where('uf', String(uf));
                    
 
        return response.json(points);
    }

    async show (request: Request, response: Response) {
        const {id} = request.params; // request params é usado quando se tem parametro na rota

        const point = await knex('points').where('id', id).first();

        if (!point){
            return response.status(400).json({message: 'Point not found'});
        }

        const items = await knex('items')
                            .join('point_items', 'items.id' , '=', 'point_items.item_id')
                            .where('point_items.point_id', id)
                            .select('items.title');
        /** SELECT title FROM items
         *  JOIN point_items ON items.id = point_items.item_id
         * WHERE point_items.point_id = {id} */                            

        return response.json({point, items})
    }

    async create (request: Request, response: Response) {
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = request.body; // request body >> usado para criação e alteração de algum dado.

        /**
         * O jeito usado acima é chamado de 'Desestruturação, 
         * usado quando uma variavel terá o mesmo nome da coluna do banco, por exemplo.
         * E é equivalente aos seguintes assign:
         * 
         * const name = request.body.name;
         * const email = request.body.email;
         * 
         */

        const trx = await knex.transaction();
        /* o transaction é usado para executar os 2 insert somente se nao der erro
        caso de erro em 1 insert, o outro nao sera executado.
        Para usarmos, basta usar o 'trx' no lugar do 'knex', quando chama o metodo insert
        */
    
        const point = {
            image: 'https://cdn.pixabay.com/photo/2015/11/07/11/51/bazaar-1031565_960_720.jpg?w=400',
            name,   // equivalente a name(atributo) = name (variavel)
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        }

        const insertedIds = await /*knex*/trx('points').insert(point);
    
        const point_id = insertedIds[0];
        
        const pointItems = items.map((item_id: number) => {
            return {
                item_id,
                point_id,
            };
        });
        
        await /*knex*/trx('point_items').insert(pointItems);
    
        await trx.commit();

        return response.json({
            id: point_id,
            ...point,

        });
    }
}


export default PointsController;