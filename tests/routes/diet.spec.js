const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Diet, conn } = require('../../src/db.js');

const agent = session(app);
const diet = {
  name: 'Mediterranea'
};

xdescribe('Diet routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Diet.sync({ force: true })
    .then(() => Diet.create(diet)));
  xdescribe('GET /diets', () => {
    it('should get 200', () =>
      agent.get('/diets').expect(200)
    );
  });
});