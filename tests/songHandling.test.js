import test from "ava";
import config from "../config";
import mongoose from "mongoose";
import Song from "../server/models/song";
import songHandling from "../server/controllers/songHandling";
import util from "../server/controllers/util";
import TestSong from "./testSong";
var base64 = require("base-64");
var passwordHash = require("password-hash");

test.before(() => {
  mongoose.connect(config.db);
});

test("post song (success) - user creation", async t => {
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
  t.is(songResponse.success, true);
});

test.after.always(() => {
  Song.remove({ username: { $regex: "song." } }).exec();
});
