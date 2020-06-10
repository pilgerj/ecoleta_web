import knex from 'knex'
import path from 'path' //biblioteca p caminhos

const connection = knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite') //dirname retorna o folder atual
    },
    useNullAsDefault: true,
});

export default connection;

//Migrations >>'' historico do bd

