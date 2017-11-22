import test from "ava";
import config from "../config";
import mongoose from "mongoose";
import playlist from "../server/controllers/createPlaylist";
import util from "../server/controllers/util";

test.before(() => {
  mongoose.connect(config.db);
});

const mockPlaylist = async (songs, musicSet, owner) => {
  return playlist.create({
    songs,
    musicSet,
    owner
  });
};

test("test tests", t => t.pass());

test("playlist test 1", async t => {
  const songArr = [
    require("mongoose").Types.ObjectId(),
    require("mongoose").Types.ObjectId(),
    require("mongoose").Types.ObjectId()
  ];
  const set = require("mongoose").Types.ObjectId();
  const maker = require("mongoose").Types.ObjectId();
  const mockReq = {
    body: {
      songs: songArr,
      musicSet: set,
      owner: maker
    }
  };
  const mockRes = await playlist.createPlaylist(mockReq);

  t.is(mockRes.success, true);
  t.is(mockRes.owner.id, maker.id); //This is the same as t.deepEqual(mockRes.owner, maker);

  t.deepEqual(mockRes.songs, songArr);
});

test("playlist test 2", async t => {
  var mockReqs = new Array(3);
  mockReqs[0] = {
    body: {
      owner: require("mongoose").Types.ObjectId()
    }
  };
  mockReqs[1] = {
    body: {
      musicSet: require("mongoose").Types.ObjectId()
    }
  };
  mockReqs[2] = {
    body: {}
  };

  for (let i = 0; i < mockReqs.length; i++) {
    mockReqs[i].body.songs = new Array(5);
    for (let j = 0; j < 5; j++) {
      mockReqs[i].body.songs[j] = require("mongoose").Types.ObjectId();
    }
  }

  for (let i = 0; i < mockReqs.length; i++) {
    try {
      const mockRes = await playlist.createPlaylist(mockReqs[i]);
    } catch (e) {
      t.is(e._message, "playlist validation failed");
    }
  }
});
