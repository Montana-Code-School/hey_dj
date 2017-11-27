import test from "ava";
import config from "../config";
import mongoose from "mongoose";
import createMusicSet from "../server/controllers/createMusicSet";
import musicSet from "../server/models/musicSet";
import util from "../server/controllers/util";

mongoose.connect(config.db);

test("Test should return an accurate document", async t => {
  const mockReq = {
    body: {
      customValues: {
        releaseDate: new Date(),
        physiological: { type: "hot moms", required: true },
        genre: "Oula",
        emotion: "hot moms are great"
      },
      title: "test title",
      userId: "5a1602f712af126b3e0f79d4"
    }
  };
  const newDoc = await createMusicSet.createMusicSet(mockReq);
  t.is(newDoc.title, "test title");
  t.is(newDoc.userId.toString(), "5a1602f712af126b3e0f79d4");
});
