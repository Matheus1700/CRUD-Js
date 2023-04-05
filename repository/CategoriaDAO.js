const db = require('../infra/db/mysqldb');


const salvar = async(categoria)=>{
const sqlInsert = 'insert into CATEGORIA(nome,descricao) VALUES (?,?)';
const values = [categoria.nome,categoria.descricao];
const con = await db.getConnection();
    return await con.execute(sqlInsert,values);
}

const listarCategorias = async()=>{
    const sqlSelect  = 'select id, nome, descricao from categoria';
    const con = await db.getConnection();
    return await con.execute(sqlSelect);
}

const removerCategoria = async(id)=>{
    const sqlDelete = 'DELETE FROM categoria WHERE id = ?'
    const values = [id]
    const con = await db.getConnection();
    await con.execute(sqlDelete, values)
}

module.exports = {salvar,listarCategorias, removerCategoria}