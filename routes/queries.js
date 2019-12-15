
const Pool = require('pg').Pool;
const pool = new Pool({
    database: 'webservice',
    host: "localhost",
    user: "serviceconnexion",
    password: "Epsi2019!",
    schema: "public",
});
const getUsers = (request, response) => {
    const login = request.query.login;
    const password = request.query.password;

    pool.query("SELECT * FROM public.user WHERE login=$1 and password=$2", [login, password], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
};
const createUser = (request, response) => {
    const { login, password, prenom, nom, email } = request.body;

    pool.query('INSERT INTO public.user (login, password, prenom, nom, email) VALUES ($1, $2, $3, $4, $5)', [login, password, prenom, nom, email], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`User added`)
    })
};

module.exports = {
    getUsers,
    createUser,
};
