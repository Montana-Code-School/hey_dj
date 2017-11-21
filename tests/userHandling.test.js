import test from "ava";
import config from "../config";
import mongoose from "mongoose";
import User from "../server/models/user";
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

async function checkPassword(t, user, password) {
  const mockReq = { body: { username: user, password: password } };
  try {
    const userResponse = await userHandling.createUser(mockReq);
  } catch (e) {
    t.is(
      e.message,
      `User validation failed: password: Validator failed for path \`password\` with value \`${password}\``
    );
  }
}

test("create user (success) - user creation", async t => {
  const mockReq = { body: { username: "default1", password: "Default1$" } };
  const userResponse = await userHandling.createUser(mockReq);
  t.is(userResponse.success, true);
  t.is(userResponse.username, "default1");
  t.is(passwordHash.verify("Default1$", userResponse.password), true);
});

test("create user (fail) - username is not unique", async t => {
  const mockReq = { body: { username: "default2", password: "Default1$" } };
  const userResponse = await userHandling.createUser(mockReq);
  try {
    const userResponse = await userHandling.createUser(mockReq);
  } catch (e) {
    t.is(
      e.message,
      'E11000 duplicate key error collection: heydj.users index: username_1 dup key: { : "default2" }'
    );
  }
});

test("create user (fail) - short password", checkPassword, "default3", "Def1$");

test(
  "create user (fail) - no special character",
  checkPassword,
  "default4",
  "Default11"
);

test(
  "create user (fail) - no number(s)",
  checkPassword,
  "default4",
  "$Default$"
);

test("login user - successful login", async t => {
  const user = await createUser("default5", "Default1$");
  const mockReq = {
    headers: {
      authorization: "Basic " + base64.encode("default5" + ":" + "Default1$")
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
      authorization:
        "Basic " + base64.encode("bad_username" + ":" + "Default1$")
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
  const user = await createUser("default6", "Default1$");
  const mockReq = {
    headers: {
      authorization: "Basic " + base64.encode("default6" + ":" + "bad_password")
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
  User.remove({ username: { $regex: "default." } }).exec();
});
