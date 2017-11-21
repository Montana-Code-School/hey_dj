//import playlist from ".../models/playlist.js";
var playlist = require("../models/playlist.js");

// exports.createPlaylist = function(req, res) {
//   //construct the main create user function
//
//   console.log("req.body is ", req.body);
//
//   playlist.create(req.body, function(err) {
//     if (err) {
//       console.log(err);
//       res.json({ success: false });
//     } else {
//       console.log("playlist created successfully");
//       res.json({ success: true });
//     }
//   });
// };

module.exports = {
  createPlaylist: async (req, res) => {
    const jams = (await playlist.create({
      songs: req.body.songs,
      musicSet: req.body.musicSet,
      owner: req.body.owner
    })).toObject();

    jams.success = true;
    return jams;
  }
};
