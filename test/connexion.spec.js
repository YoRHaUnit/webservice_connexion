const app = require('../app');
const request = require('supertest');

describe('Test de l"api de connexion', () => {
    it ('test initialisation route', async () => {
        const response = await request(app).get('/');
        expect(response.text).toBe('{"info":"Node.js, Express, and Postgres API"}');
    });
    it('test post creation utilisateur', async () => {
        const res = await request(app)
            .post('/users')
            .send({
                login: "test",
                password: "test",
                nom: "test",
                prenom: "test",
                email: "test@hotmail.com"
            });
        expect(res.statusCode).toEqual(201)
    });
    it('test si aucun résultat est renvoyer lors de passage de mauvaise information', async () => {
        const res = await request(app)
            .get('/users?login=test&password=test');
        expect(res.statusCode).toEqual(204)
        // expect(res.body).toHaveProperty('post')
    });
    it('test avec le login et le password ', async () => {
        const res = await request(app)
            .get('/users?login=kirby&password=test');
        expect(res.statusCode).toEqual(200)
    })
});
