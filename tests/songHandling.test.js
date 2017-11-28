import test from "ava";
import config from "../config";
import mongoose from "mongoose";
import Song from "../server/models/song";
import songHandling from "../server/controllers/songHandling";
import util from "../server/controllers/util";
import TestSong from "./testSong";
var base64 = require("base-64");
var passwordHash = require("password-hash");

let tempTestSongs = [];

test.before(() => {
  mongoose.connect(config.db);
});

test("post song (success) - song creation", async t => {
  const mockSet = {
    customValues: {
      releaseDate: new Date(),
      physiological: { type: "Your mom", required: true },
      genre: "hot moms",
      emotion: "mgmgfrt"
    },
    title: { type: "Generic set Title", required: true },
    userId: { type: "5a14b423fdf946604f017a91", required: true },
    _id: "5a14b423fdf945604f017a91"
  };
  const mockReq = {
    body: {
      spotifyData: TestSong,
      customValues: mockSet.customValues,
      _id: mockSet._id
    }
  };
  const songResponse = await songHandling.postSong(mockReq);
  tempTestSongs.push(songResponse._id);
  t.is(songResponse.success, true);
});

test("post song (fail) - no spotify data passed", async t => {
  const mockSet = {
    customValues: {
      releaseDate: new Date(),
      physiological: { type: "Your mom", required: true },
      genre: "hot moms",
      emotion: "mgmgfrt"
    },
    title: { type: "Generic set Title", required: true },
    userId: { type: "5a14b423fdf946604f017a91", required: true },
    _id: "5a14b423fdf946604f017a91"
  };
  const mockReq = {
    body: {
      customValues: mockSet.customValues,
      musicSetId: mockSet._id
    }
  };
  try {
    const songResponse = await songHandling.postSong(mockReq);
    tempTestSongs.push(songResponse._id);
  } catch (e) {
    t.is(
      e.message,
      "Song validation failed: musicSetId: Path `musicSetId` is required., spotifyData: Path `spotifyData` is required."
    );
  }
});

test("post song (fail) - no music set passed", async t => {
  const mockSet = {
    customValues: {
      releaseDate: new Date(),
      physiological: { type: "Your mom", required: true },
      genre: "hot moms",
      emotion: "mgmgfrt"
    },
    title: { type: "Generic set Title", required: true },
    userId: { type: "5a14b423fdf946604f017a91", required: true },
    _id: "5a14b423fdf946604f017a91"
  };
  const mockReq = {
    body: {
      spotifyData: TestSong,
      customValues: mockSet.customValues,
      musicSetId: mockSet._id
    }
  };
  try {
    const songResponse = await songHandling.postSong(mockReq);
    tempTestSongs.push(songResponse._id);
  } catch (e) {
    t.is(
      e.message,
      "Song validation failed: musicSetId: Path `musicSetId` is required."
    );
  }
});

test.after.always(() => {
  tempTestSongs.map(index => Song.remove({ _id: index }).exec());
});
