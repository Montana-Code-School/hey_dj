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
  console.log("playlist is ", playlist);
  console.log("mockRes.songs is ", mockRes.songs);
  console.log("the length of mockRes.songs is ", mockRes.songs.length);
  t.is(mockRes.success, true);
  t.is(mockRes.owner, "hotBrocolli69");
  t.deepEqual(mockRes.songs, ["12", "13", "14", "15", "10978"]);
});

test("playlist test 2", async t => {
  const mockReq = {
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
  const mockRes = await playlist.createPlaylist(mockReq);
  t.is(mockRes.success, true);
  t.is(mockRes.owner, "purple poision");
  t.deepEqual(mockRes.songs, [
    "help i'm alive",
    "highway to hell",
    "rat",
    "the jams",
    "fallout boy"
  ]);
});
