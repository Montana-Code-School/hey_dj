import test from "ava";
import config from "../config";
import mongoose from "mongoose";
import playlist from "../server/controllers/playlistController";
import fakeController from "../server/controllers/fake";
import userHandling from "../server/controllers/userHandling";
import util from "../server/controllers/util";

var playlistModel = require("../server/models/playlist.js");

test.before(() => {
  mongoose.connect(config.db);
});

let playlistsToRemove = [];

const mockPlaylist = async (songs, musicSet, owner) => {
  return playlist.create({
    songs,
    musicSet,
    owner
  });
};

test("test tests", t => t.pass());

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
    t.is(response.success, false);
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

test.after.always(() => {
  playlistsToRemove.map(index => playlistModel.remove({ _id: index }).exec());
});
