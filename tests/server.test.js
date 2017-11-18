import test from "ava";
import config from "../config";
import mongoose from "mongoose";
import User from "../server/models/user";
import fakeController from "../server/controllers/fake";
import userHandling from "../server/controllers/userHandling";
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

test.cb("create user", t => {
  const mockReq = { body: { username: "default", password: "default" } };
  const mockRes = {
    json: data => {
      t.is(data.success, true);
      t.is(data.username, "default");
      t.is(data.password, "default");
      t.end();
    }
  };
  userHandling.createUser(mockReq, mockRes);
});

// still working on this. Test stalls when running

// test.cb("login user", t => {
//   const mockReq = { body: { username: "default", password: "default" } };
//   const mockRes = {
//     json: data => {
//       t.is(data.success, true);
//       t.truthy(data.token);
//       t.end();
//     }
//   };
//   userHandling.loginUser(mockReq, mockRes);
// });

test.afterEach.always(() => {
  User.remove({ username: "default" }).exec();
});
