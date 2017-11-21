import test from "ava";
import config from "../config";
import mongoose from "mongoose";
import fakeController from "../server/controllers/fake";
<<<<<<< HEAD
=======
import userHandling from "../server/controllers/userHandling";
import util from "../server/controllers/util";

>>>>>>> 138cc9d7c244f0921a4f8291035339b5f7830834
test.before(() => {
  mongoose.connect(config.db);
});

<<<<<<< HEAD
test("test tests", t => t.pass());

test.cb("example test for", t => {
  const mockReq = { body: { data: 13 } };
  const mockRes = {
    json: data => {
      t.deepEqual(data, { route: "fake" });
      t.end();
    }
  };
  fakeController.fakeRoute(mockReq, mockRes);
=======
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
>>>>>>> 138cc9d7c244f0921a4f8291035339b5f7830834
});
