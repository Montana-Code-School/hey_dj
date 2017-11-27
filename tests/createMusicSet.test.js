import test from "ava";
import config from "../config";
import mongoose from "mongoose";
import createMusicSet from "../server/controllers/createMusicSet";
import musicSet from "../server/models/musicSet";
import util from "../server/controllers/util";

mongoose.connect(config.db);

test("Test should return an accuarate document", async t => {
  const mockReq = {
    body: { title: "test title", userId: "5a14bccf6353c82692a33741" }
  };
  const newDoc = await createMusicSet.createMusicSet(mockReq);
  t.is(newDoc.title, "test title");
  t.is(newDoc.userId.toString(), "5a14bccf6353c82692a33741");
});

test("Test should reject the document when the music set name is already used by a user", async t => {
  const mockReq = {
    body: { title: "test title", userId: "5a14bccf6353c82692a33741" }
  };
  const newDoc1 = await createMusicSet.createMusicSet(mockReq);
  try {
    const newDoc2 = await createMusicSet.createMusicSet(mockReq);
  } catch (e) {
    t.is(e.message, "musicSet validation failed: title: title must be unique");
  }
});
