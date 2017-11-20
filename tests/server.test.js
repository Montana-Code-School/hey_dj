import test from "ava";
import config from "../config";
import mongoose from "mongoose";
import User from "../server/models/user";
import fakeController from "../server/controllers/fake";
import userHandling from "../server/controllers/userHandling";
import util from "../server/controllers/util";
var passwordHash = require("password-hash");
test.before(() => {
  mongoose.connect(config.db);
});

// test("test tests", t => t.pass());
//
// test.cb("example test for", t => {
//   const mockReq = { body: { data: 13 } };
//   const mockRes = {
//     json: data => {
//       t.deepEqual(data, { route: "fake" });
//       t.end();
//     }
//   };
//   fakeController.fakeRoute(mockReq, mockRes);
// });

const createUser = async (username, password) => {
  return await User.create({
    username,
    password
  });
};

test.cb("routifyPromise should return the results of a promise as json", t => {
  const fn = (req, res) => Promise.resolve({ result: true });
  const req = {};
  const res = {
    json: response => {
      t.is(response.result, true);
      t.end();
    }
  };
  util.routifyPromise(fn)(req, res);
});

test.cb("routifyPromise should return 500 status if the promise rejects", t => {
  const fn = (req, res) => Promise.reject({ result: false });
  const req = {};
  const json = response => {
    t.is(response.result, false);
    t.end();
  };
  const res = {
    status: statusCode => {
      t.is(statusCode, 500);
      return { json };
    }
  };
  util.routifyPromise(fn)(req, res);
});

test("It should create a user with a username and password", async t => {
  const mockReq = { body: { username: "default2", password: "default" } };
  const userResponse = await userHandling.createUser(mockReq);
  t.is(userResponse.success, true);
  t.is(userResponse.username, "default2");
  t.is(passwordHash.verify("default", userResponse.password), true);
});

test("login user", async t => {
  // 'Basic ZGVmYXVsdDpkZWZhdWx0' is the encrypted version of sending username: 'default' and password: 'default'
  const user = await createUser("default", "default");
  const mockReq = { headers: { authorization: "Basic ZGVmYXVsdDpkZWZhdWx0" } };
  const mockApp = {
    get: () => config.key
  };
  const loginResp = await userHandling.loginUser(mockApp)(mockReq);
  t.is(loginResp.success, true);
  t.truthy(loginResp.token);
});

test.after.always(() => {
  User.remove({ username: "default" }).exec();
  User.remove({ username: "default2" }).exec();
});
