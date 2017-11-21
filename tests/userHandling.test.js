import test from "ava";
import config from "../config";
import mongoose from "mongoose";
import User from "../server/models/user";
import fakeController from "../server/controllers/fake";
import userHandling from "../server/controllers/userHandling";
import util from "../server/controllers/util";
var base64 = require("base-64");
var passwordHash = require("password-hash");

test.before(() => {
  mongoose.connect(config.db);
});

const createUser = async (username, password) => {
  return await User.create({
    username,
    password
  });
};

test("create user - successful creation", async t => {
  const mockReq = { body: { username: "default2", password: "default" } };
  const userResponse = await userHandling.createUser(mockReq);
  t.is(userResponse.success, true);
  t.is(userResponse.username, "default2");
  t.is(passwordHash.verify("default", userResponse.password), true);
});

test("login user - successful login", async t => {
  const user = await createUser("default", "default");
  const mockReq = {
    headers: {
      authorization: "Basic " + base64.encode("default" + ":" + "default")
    }
  };
  const mockApp = {
    get: () => config.key
  };
  const loginResp = await userHandling.loginUser(mockApp)(mockReq);
  t.is(loginResp.success, true);
  t.truthy(loginResp.token);
});

test("login user - bad username", async t => {
  const mockReq = {
    headers: {
      authorization: "Basic " + base64.encode("bad_username" + ":" + "default")
    }
  };
  const mockApp = {
    get: () => config.key
  };
  try {
    const loginResp = await userHandling.loginUser(mockApp)(mockReq);
  } catch (e) {
    t.is(e.message, "User not found");
    t.falsy(e.success);
    t.falsy(e.token);
  }
});

test("login user - bad password", async t => {
  const user = await createUser("default3", "default");
  const mockReq = {
    headers: {
      authorization: "Basic " + base64.encode("default3" + ":" + "bad_password")
    }
  };
  const mockApp = {
    get: () => config.key
  };
  try {
    const loginResp = await userHandling.loginUser(mockApp)(mockReq);
  } catch (e) {
    t.is(e.message, "Passwords don't match");
    t.falsy(e.success);
    t.falsy(e.token);
  }
});

test.after.always(() => {
  User.remove({ username: "default" }).exec();
  User.remove({ username: "default2" }).exec();
  User.remove({ username: "default3" }).exec();
});
