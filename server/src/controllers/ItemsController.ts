import {Request, Response} from 'express';
import knex from '../database/connections';


class ItemsController {
    async index(request: Request, response: Response) { 
        const items = await knex('items').select('*');  
        /*Sempre que utilizarmos um query p o BD
        devenis usar 'await' antes de defini-la, 
        que ira aguardar a query terminar de executar, 
        para entao mostrar os resultados.
        E tambem o 'async'.
         */
    
        const serializedItems = items.map(item => {
            return { 
                id: item.id,
                title: item.title,
                image_url: `http://localhost:3333/uploads/${item.image}`, 
            };
        });
        /* o termo 'serialized' se refere a tratar um objeto de modo que 
        ficara melhor de trabalhar ou apresentar ao usuario  */
        return response.json(serializedItems)
    }
}

export default ItemsController;