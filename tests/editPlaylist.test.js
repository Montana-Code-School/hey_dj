import test from "ava";
import config from "../config";
import mongoose from "mongoose";
import Playlist from "../server/controllers/playlistController";
import util from "../server/controllers/util";
mongoose.connect(config.db);
test("editPlaylist test", async t => {
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
  const mockRes1 = await Playlist.createPlaylist(mockReq1);
  const songArr2 = [
    require("mongoose").Types.ObjectId(),
    require("mongoose").Types.ObjectId(),
    require("mongoose").Types.ObjectId()
  ];

  const mockReq2 = {
    body: {
      _id: mockRes1._id,
      songs: songArr2
    }
  };
  const playlist = await Playlist.editPlaylist(mockReq2);
  t.is(playlist.success, true);
  t.is(playlist.owner.toString(), mockReq1.body.owner.toString()); //This is the same as t.deepEqual(mockRes.owner, maker);
  t.deepEqual(playlist.songs.toObject(), songArr2);
});

test("add songs test", async t => {
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
  const mockRes1 = await Playlist.createPlaylist(mockReq1);

  const songArr2 = [
    require("mongoose").Types.ObjectId(),
    require("mongoose").Types.ObjectId(),
    require("mongoose").Types.ObjectId()
  ];

  const mockReq2 = {
    body: {
      _id: mockRes1._id,
      songs: songArr2
    }
  };

  const mockRes2 = await Playlist.addSongs(mockReq2);
  t.is(mockRes2.success, true);
  var joinedSongArr = songArr1.concat(songArr2);
  t.deepEqual(mockRes2.songs.toObject(), joinedSongArr);
});
