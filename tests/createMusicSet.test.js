import test from "ava";
import config from "../config";
import mongoose from "mongoose";
import createMusicSet from "../server/controllers/createMusicSet";
import musicSet from "../server/models/musicSet";
import util from "../server/controllers/util";

mongoose.connect(config.db);

let musicSetToRemove = [];

test("Test should return an accurate document", async t => {
  const mockReq = {
    body: {
      customValues: {
        releaseDate: new Date(),
        physiological: { type: "hot moms" },
        genre: "Oula",
        emotion: "hot moms are great"
      },
      title: "test title",
      userId: "5a1602f712af126b3e0f79d4"
    }
  };
  const newDoc = await createMusicSet.createMusicSet(mockReq);
  musicSetToRemove.push(newDoc._id);
  t.is(newDoc.title, "test title");
  t.is(newDoc.userId.toString(), "5a1602f712af126b3e0f79d4");
});

test("create music set (success) - no customValues passed (not required in model)", async t => {
  const mockReq = {
    body: {
      title: "test title",
      userId: "5a1602f712af126b3e0f79d4"
    }
  };
  const newDoc = await createMusicSet.createMusicSet(mockReq);
  musicSetToRemove.push(newDoc._id);
  t.is(newDoc.title, "test title");
  t.is(newDoc.userId.toString(), "5a1602f712af126b3e0f79d4");
});

test("create music set (fail) - no title passed", async t => {
  const mockReq = {
    body: {
      customValues: {
        releaseDate: new Date(),
        physiological: { type: "hot moms" },
        genre: "Oula",
        emotion: "hot moms are great"
      },
      userId: "5a1602f712af126b3e0f79d4"
    }
  };
  try {
    const newDoc = await createMusicSet.createMusicSet(mockReq);
  } catch (e) {
    console.log("This is a console log", e.message);
    t.is(
      e.message,
      "musicSet validation failed: title: Path `title` is required."
    );
  }
});

test("create music set (fail) - no userId passed", async t => {
  const mockReq = {
    body: {
      customValues: {
        releaseDate: new Date(),
        physiological: { type: "hot moms" },
        genre: "Oula",
        emotion: "hot moms are great"
      },
      title: "test title"
    }
  };
  try {
    const newDoc = await createMusicSet.createMusicSet(mockReq);
  } catch (e) {
    t.is(
      e.message,
      "musicSet validation failed: userId: Path `userId` is required."
    );
  }
});

test("Test should reject the document when the music set name is already used by a user", async t => {
  const mockReq = {
    body: { title: "test title", userId: "5a14bccf6353c82692a33741" }
  };
  const newDoc1 = await createMusicSet.createMusicSet(mockReq);
  musicSetToRemove.push(newDoc1._id);
  try {
    const newDoc2 = await createMusicSet.createMusicSet(mockReq);
  } catch (e) {
    t.is(e.message, "musicSet validation failed: title: title must be unique");
  }
});

test.after.always(() => {
  musicSetToRemove.map(index => musicSet.remove({ _id: index }).exec());
});
