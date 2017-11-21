import test from "ava";
import config from "../config";
import mongoose from "mongoose";
import fakeController from "../server/controllers/fake";
import playlist from "../server/controllers/createPlaylist";
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

test("playlist test 1", async t => {
  const mockReq = {
    body: {
      songs: ["12", "13", "14", "15", "10978"],
      musicSet: "the crazy number songs",
      owner: "hotBrocolli69"
    }
  };
  const mockRes = await playlist.createPlaylist(mockReq);
  const songs = mockRes.songs;
  t.is(mockRes.success, true);
  t.is(mockRes.owner, "hotBrocolli69");
  t.deepEqual(mockRes.songs, ["12", "13", "14", "15", "10978"]);
});

test("playlist test 2", async t => {
  var mockReqs = new Array(3);
  mockReqs[0] = {
    body: {
      songs: [
        "help i'm alive",
        "highway to hell",
        "rat",
        "the jams",
        "fallout boy"
      ],
      owner: "purple poision"
    }
  };
  mockReqs[1] = {
    body: {
      songs: [
        "help i'm alive",
        "highway to hell",
        "rat",
        "the jams",
        "fallout boy"
      ],
      musicSet: "the crazy number songs"
    }
  };
  mockReqs[2] = {
    body: {
      songs: [
        "help i'm alive",
        "highway to hell",
        "rat",
        "the jams",
        "fallout boy"
      ]
    }
  };

  for (let i = 0; i < mockReqs.length; i++) {
    try {
      const mockRes = await playlist.createPlaylist(mockReqs[i]);
    } catch (e) {
      t.is(e._message, "playlist validation failed");
    }
    t.is(mockReqs.length, 3);
  }
});
