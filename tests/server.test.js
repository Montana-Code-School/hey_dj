import test from "ava";
import config from "../config";
import mongoose from "mongoose";
import playlist from "../server/controllers/playlistController";
import userHandling from "../server/controllers/userHandling";
import util from "../server/controllers/util";

test.before(() => {
  mongoose.connect(config.db);
});

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
