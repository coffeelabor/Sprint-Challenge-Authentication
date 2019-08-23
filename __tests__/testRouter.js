const request = require("supertest");

const db = require("../database/dbConfig.js");
const server = require("../api/server.js");

describe("server", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });
  it('tests are running with DB_ENV set as "testing"', () => {
    expect(process.env.DB_ENV).toBe("testing");
  });
  describe("POST /api/auth/register", () => {
    it("should return 201 when a user is added", () => {
      return request(server)
        .post("/api/auth/register")
        .send({
          username: "test",
          password: "pass"
        })
        .then(res => {
          expect(res.status).toBe(201);
        });
    });
    it("should return JSON to register", () => {
      return request(server)
        .post("/api/auth/register")
        .send({
          username: "test",
          password: "pass"
        })
        .then(res => {
          expect(res.type).toMatch(/json/);
        });
    });
  });
  describe("POST /api/auth/login", () => {
    // it("should return 200 when a user is logging in Async", async () => {
    //   await request(server)
    //     .post("/api/auth/login")
    //     .send({
    //       username: "test",
    //       password: "pass"
    //     });
    //   const stat = await res.status;

    //   expect(stat).toBe(200);
    // });
    // it("succeeds with correct credentials", async () => {
    //   const response = await request(server)
    //     .post(`/api/auth/login`, { username: "test", password: "pass" })
    //     .expect(200);
    // });
    it("succeeds with correct credentials", async () => {
      const response = await request(server)
        .post(`/api/auth/login`)
        .send({ username: "test", password: "pass" })
        .expect(200);
    });
  });

  describe("POST /api/auth/login", () => {
    // it("should return 200 when a user is logging in", () => {
    //   return (
    //     request(server)
    //       .post("/api/auth/login")
    //       // .auth("username", "password")

    //       //   .send({
    //       //     username: "Reed1",
    //       //     password: "password"
    //       //   })
    //       //   .send({
    //       //     id: 1,
    //       //     username: "Reed1",
    //       //     password:
    //       //       "$2a$12$ddjBRmjfnpfJgaIEGdiLI.U2.R24Z0U6d7k7F8OGjozeEvelDFM3m"
    //       //   })
    //       .send({
    //         username: "test",
    //         password: "pass"
    //       })
    //       .then(res => {
    //         expect(res.status).toBe(200);
    //       })
    //   );
    // });
    it("should return JSON to login", () => {
      return request(server)
        .post("/api/auth/login")
        .send({
          username: "test",
          password: "pass"
        })
        .then(res => {
          expect(res.type).toMatch(/json/);
        });
    });
  });
  describe("GET /api/jokes", () => {
    it("should return 200 OK jokes", () => {
      return request(server)
        .get("/api/jokes/")
        .set(
          "Authorization",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6IlJlZWQxIiwiaWF0IjoxNTY2NTc1OTQwLCJleHAiOjE1NjY2NjIzNDB9.qwqEBP-UTEFDRxGJiNH5EPSWTL8gASQ0jOcKbCEFIE4"
        )
        .then(res => {
          expect(res.status).toBe(200);
        });
    });
    it("should return an array", () => {
      return request(server)
        .get("/api/jokes/")
        .set(
          "Authorization",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6IlJlZWQxIiwiaWF0IjoxNTY2NTc1OTQwLCJleHAiOjE1NjY2NjIzNDB9.qwqEBP-UTEFDRxGJiNH5EPSWTL8gASQ0jOcKbCEFIE4"
        )
        .then(res => {
          expect(Array.isArray(res.body)).toBe(true);
        });
    });
  });
  describe("GET /api/users", () => {
    it("Should return 200 OK users", () => {
      return request(server)
        .get("/api/users/")
        .set(
          "Authorization",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6IlJlZWQxIiwiaWF0IjoxNTY2NTc1OTQwLCJleHAiOjE1NjY2NjIzNDB9.qwqEBP-UTEFDRxGJiNH5EPSWTL8gASQ0jOcKbCEFIE4"
        )
        .then(res => {
          expect(res.status).toBe(200);
        });
    });
    it("should return an array", () => {
      return request(server)
        .get("/api/users/")
        .set(
          "Authorization",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6IlJlZWQxIiwiaWF0IjoxNTY2NTc1OTQwLCJleHAiOjE1NjY2NjIzNDB9.qwqEBP-UTEFDRxGJiNH5EPSWTL8gASQ0jOcKbCEFIE4"
        )
        .then(res => {
          expect(Array.isArray(res.body)).toBe(true);
        });
    });
  });
});
