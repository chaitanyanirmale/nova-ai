import test from "node:test";
import assert from "node:assert";
import request from "supertest";

import app from "../app.js";

test("GET /api/", async () => {
  const response = await request(app).get("/api/");

  assert.strictEqual(response.status, 200);
  assert.strictEqual(response.body.success, true);
  assert.strictEqual(response.body.message, "NOVA API is running");
});