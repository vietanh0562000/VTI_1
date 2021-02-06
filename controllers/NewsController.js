const db = require('../data/connect');

async function getNews(req, res) {
    try {
        console.log('get News');
        await db.query('SELECT * FROM news', (err, results) => {
            if (err) {
                throw e;
            }
            res.status(200).json(results.rows);
        });
    } catch (e) {
        console.log(e);
    }
}

async function findNews(req, res){
    try{
        console.log('find News');
        let title = req.query.title || "";
        let author = req.query.author || "";
        let description = req.query.description || "";
        await db.query(`SELECT * FROM news WHERE title LIKE '%${title}%' AND author LIKE '%${author}%' AND description LIKE '%${description}%'`, (err, results)=>{
            if (err){
                throw err;
            }
            res.status(200).json(results.rows);
        })
    }catch (e){
        console.log(e);
    }
}

async function addNews(req, res){
    try{
        let id = Math.floor(Math.random() * 1000);
        let title = req.body.title;
        let author = req.body.author;
        let description = req.body.description;
        
        
        await db.query(`INSERT INTO news VALUES ('${id}', '${author}', '${title}', '${description}');`, (err, results)=>{
            if (err){
                throw err;
            }
            res.status(200).json({message: 'ADD SUCCESS'});
        });
    }catch (e){
        console.log(e);
    }
}

async function updateNews(req, res){
    try{
        let id = req.params.id;
        console.log(req.body.title);
        let title = req.body.title;
        let author = req.body.author;
        let description = req.body.description;
        
        await db.query(`UPDATE news SET author = '${author}', title = '${title}', description = '${description}' WHERE id = '${id}'`, (err, results)=>{
            if (err){
                throw err;
            }
            res.status(200).json({message: 'UPDATE SUCCESS'});
        });
    }catch (e){
        console.log(e);
    }
}

async function deleteNews(req, res){
    try{
        let id = req.params.id;
        console.log(id);
        await db.query(`DELETE FROM news WHERE id = '${id}' `, (err, result) =>{
            if (err){
                throw err;
            }
            res.status(200).json({message: 'DELETE SUCCESS'});
        })
    }catch(e){
        console.log(e);
    }
}
module.exports = {
    getNews,
    findNews,
    addNews, 
    updateNews,
    deleteNews,
}