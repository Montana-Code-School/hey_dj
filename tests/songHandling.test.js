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
  const customValues = {};
  customValues["Test value!"] = "Good";
  const mockReq = {
    body: {
      spotifyData: TestSong,
      customValues: customValues,
      musicSetId: "5a14b423fdf946604f017a91"
    }
  };
  const songResponse = await songHandling.postSong(mockReq);
  tempTestSongs.push(songResponse._id);
  t.is(songResponse.success, true);
});

test("post song (fail) - no spotify data passed", async t => {
  const customValues = {};
  customValues["Test value!"] = "Good";
  const mockReq = {
    body: {
      customValues: customValues,
      musicSetId: "5a14b423fdf946604f017a91"
    }
  };
  try {
    const songResponse = await songHandling.postSong(mockReq);
    tempTestSongs.push(songResponse._id);
  } catch (e) {
    t.is(
      e.message,
      "Song validation failed: spotifyData: Path `spotifyData` is required."
    );
  }
});

test("post song (fail) - no music set passed", async t => {
  const customValues = {};
  customValues["Test value!"] = "Good";
  const mockReq = {
    body: {
      spotifyData: TestSong,
      customValues: customValues
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
