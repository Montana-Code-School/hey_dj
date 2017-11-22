import test from "ava";
import config from "../config";
import mongoose from "mongoose";
import playlist from "../server/controllers/playlistController";
import util from "../server/controllers/util";
test("edit playlist test 1", async t => {
  const songArr1 = [
    require("mongoose").Types.ObjectId(),
    require("mongoose").Types.ObjectId(),
    require("mongoose").Types.ObjectId()
  ];
  const set = require("mongoose").Types.ObjectId();
  const maker = require("mongoose").Types.ObjectId();
  var mockReq1 = {
    body: {
      songs: songArr1,
      musicSet: set,
      owner: maker
    }
  };
  const mockRes1 = await playlist.createPlaylist(mockReq1);

  const songArr2 = [
    require("mongoose").Types.ObjectId(),
    require("mongoose").Types.ObjectId(),
    require("mongoose").Types.ObjectId()
  ];

  mockReq2 = {
    body: {
      _id: mockRes1._id,
      songs: songArr2
    }
  };

  const mockRes2 = await playlist.addSongs(mockReq2);
  t.is(mockRes.success, true);
  t.is(mockRes.owner.id, maker.id); //This is the same as t.deepEqual(mockRes.owner, maker);
  t.deepEqual(mockRes.songs, songArr);
});

test("edit playlist test 2", async t => {
  const songArr1 = [
    require("mongoose").Types.ObjectId(),
    require("mongoose").Types.ObjectId(),
    require("mongoose").Types.ObjectId()
  ];
  const set = require("mongoose").Types.ObjectId();
  const maker = require("mongoose").Types.ObjectId();
  var mockReq1 = {
    body: {
      songs: songArr1,
      musicSet: set,
      owner: maker
    }
  };
  const mockRes1 = await playlist.createPlaylist(mockReq1);

  const songArr2 = [
    require("mongoose").Types.ObjectId(),
    require("mongoose").Types.ObjectId(),
    require("mongoose").Types.ObjectId()
  ];

  mockReq2 = {
    body: {
      _id: mockRes1._id,
      songs: songArr2
    }
  };

  const mockRes2 = await playlist.addSongs(mockReq2);
  t.is(mockRes.success, false);
  t.is(mockRes.owner.id, maker.id); //This is the same as t.deepEqual(mockRes.owner, maker);
  t.deepEqual(mockRes.songs, songArr);
});

test("test 3", async t => {
  const songArr1 = [
    require("mongoose").Types.ObjectId(),
    require("mongoose").Types.ObjectId(),
    require("mongoose").Types.ObjectId()
  ];
  const set = require("mongoose").Types.ObjectId();
  const maker = require("mongoose").Types.ObjectId();
  var mockReq1 = {
    body: {
      songs: songArr1,
      musicSet: set,
      owner: maker
    }
  };
  const mockRes1 = await playlist.createPlaylist(mockReq1);

  t.is(mockRes.success, true);
  t.is(mockRes.owner.id, maker.id); //This is the same as t.deepEqual(mockRes.owner, maker);
  t.deepEqual(mockRes.songs, songArr);

  const songArr2 = [
    require("mongoose").Types.ObjectId(),
    require("mongoose").Types.ObjectId(),
    require("mongoose").Types.ObjectId()
  ];

  mockReq2 = {
    body: {
      _id: mockRes1._id,
      songs: songArr2
    }
  };

  const mockRes2 = await playlist.removeSongs(mockReq2);
  t.is(mockRes.success, true);
  //t.is(mockRes.owner.id, maker.id); //This is the same as t.deepEqual(mockRes.owner, maker);

  t.deepEqual(mockRes.songs, songArr2);
});
