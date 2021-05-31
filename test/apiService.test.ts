// @ts-nocheck
export {};
const app = require('../server-test');
const mongoose = require('mongoose');
const User = mongoose.model('users');
const expect = require('chai').expect;
const request = require('supertest');
const { stub, spy } = require('sinon');
const { logger } = require("../utils/logUtils")
const passport = require("passport");
const apiService = require("../services/apiService");
const authenticated = require('../middlewares/authenticated');

// persist auth cookies using agent
const agentOne = request.agent(app);
const agentTwo = request.agent(app);

before(async () => { // runs before the first test case

});

after(async () => {

})

beforeEach(function () {

});

afterEach(async () => {

})

describe('GET /api/health-check', () => {
    it('health-check should return 200', async () => {
        const res = await agentOne
            .get('/api/health-check')
            .expect(200)
    });
});

describe('POST /api/user/register', () => {
    it('should register user', async () => {
        const res = await agentOne
            .post('/api/user/register')
            .send({ email: "test@test.com", password: "aA1111111#"})
            .set('Content-Type', 'application/json')
            .expect(200)
    })

    it('should register additional user', async () => {
        const res = await agentTwo
            .post('/api/user/register')
            .send({ email: "hello@world.com", password: "aA1111111#"})
            .set('Content-Type', 'application/json')
            .expect(200)
    })

    it('should not register user without a password', async () => {
        const res = await agentOne
            .post('/api/user/register')
            .send({ email: "test@test.com", password: null})
            .set('Content-Type', 'application/json')
            .expect(400)
    })

    it('should not register user with a weak password', async () => {
        const res = await agentOne
            .post('/api/user/register')
            .send({ email: "hello@world.com", password: "weakpw"})
            .set('Content-Type', 'application/json')
            .expect(400)
    })

    it('should not register user with email that already exists', async () => {
        const res = await agentOne
            .post('/api/user/register')
            .send({ email: "test@test.com", password: "aA1111111#"})
            .set('Content-Type', 'application/json')
            .expect(403)
    })
})

describe('POST /api/user/login', () => {
    it('should return 200 when user successfully logged in', async () => {
        const res = await agentOne
            .post('/api/user/login')
            .send({ email: "test@test.com", password: "aA1111111#"})
            .set('Content-Type', 'application/json')
            .expect(200)
    })

    it('should return 401 when user provides incorrect password', async () => {
        const res = await agentOne
            .post('/api/user/login')
            .send({ email: "test@test.com", password: "wrong_password#"})
            .set('Content-Type', 'application/json')
            .expect(401)
    })

    it('should return 401 when user not found', async () => {
        const res = await agentOne
            .post('/api/user/login')
            .send({ email: "user@doesnotexist.com", password: "helloworld123!"})
            .set('Content-Type', 'application/json')
            .expect(401)
    })

    it('should return 400 when `email` missing from request', async () => {
        const res = await agentOne
            .post('/api/user/login')
            .send({ password: "helloworld123!"})
            .set('Content-Type', 'application/json')
            .expect(400)
    })

    it('should return 400 when `password` missing from request', async () => {
        const res = await agentOne
            .post('/api/user/login')
            .send({ email: "test@test.com"})
            .set('Content-Type', 'application/json')
            .expect(400)
    })

    it('should return 200 when additional user successfully logged in', async () => {
        const res = await agentTwo
            .post('/api/user/login')
            .send({ email: "hello@world.com", password: "aA1111111#"})
            .set('Content-Type', 'application/json')
            .expect(200)
    })
})

describe('GET /api/current-user', () => {
    it ('should return 401 for unauthenticated user', async () => {
        const res = await request(app) // don't use agent that contains cookies
            .get('/api/current-user')
            .expect(401)
    })
    it ('should return 200 for authenticated user', async () => {
        const res = await agentOne
            .get('/api/current-user')
            .expect(200)
    })
})

describe('GET /api/user/confirm-email', () => {
    it ('should return 400 if `email` and `token` query params not provided', async () => {
        const res = await agentOne
            .post('/api/user/confirm-email')
            .set('Content-Type', 'application/json')
            .expect(400)
    })

    it ('should return 400 if `email` query param not provided', async () => {
        const res = await agentOne
            .post('/api/user/confirm-email?token=my_token')
            .set('Content-Type', 'application/json')
            .expect(400)
    })

    it ('should return 400 if `token` query param not provided', async () => {
        const res = await agentOne
            .post('/api/user/confirm-email?email=my_email')
            .set('Content-Type', 'application/json')
            .expect(400)
    })

    it ('should return 404 if user with provided `email` and `token` does not exist', async () => {
        const res = await agentOne
            .post('/api/user/confirm-email?email=my_email&token=my_token')
            .set('Content-Type', 'application/json')
            .expect(404)
    })
})

describe('GET /api/user/reset-password', () => {
    it ('should return 400 if `email` not provided in request body', async () => {
        const res = await agentOne
            .post('/api/user/confirm-email')
            .send({ password: "password", token: "token"})
            .set('Content-Type', 'application/json')
            .expect(400)
    })

    it ('should return 400 if `password` not provided in request body', async () => {
        const res = await agentOne
            .post('/api/user/confirm-email')
            .send({ email: "email", token: "token"})
            .set('Content-Type', 'application/json')
            .expect(400)
    })

    it ('should return 400 if `token` not provided in request body', async () => {
        const res = await agentOne
            .post('/api/user/confirm-email')
            .send({ email: "email", password: "password"})
            .set('Content-Type', 'application/json')
            .expect(400)
    })
})
