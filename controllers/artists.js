const cloudinary = require("../middleware/cloudinary");
const Comment = require("../models/User");
const Artist = require("../models/Artist");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const artists = await Artist.find({ user: req.user.id });
      res.render("profile.ejs", { artists: artists, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getAllArtist: async (req, res) => {
    try {
      const artists = await Artist.find().sort({ createdAt: "desc" }).lean();
      res.render("artist.ejs", { artists: artists });
    } catch (err) {
      console.log(err);
    }
  },
  // getArtistInfo: async (req, res) => {
  //     const id = req?.params.id
  //   try {
  //     const artist = await Artist.findById(id);
  //     res.render("artistInfo.ejs", {artist: artist})
      
  //   } catch (err) {
  //     console.log(err);
      
  //   }

  // },
  getArtist: async (req, res) => {
    try {
      const artist = await Artist.findById(req.params.id);
      // populate 'user' gets the details of each commented
      const comments = await Comment.find({artist: req.params.id}).sort({ createdAt: "desc" }).populate('user')

      console.log(comments)
      // res.render("artist.ejs", { artist: artist, user: req.user , comments: comments, user: req.user});
      res.render("artistInfo.ejs", { artist: artist, user: req.user , comments: comments, user: req.user});
    } catch (err) {
      console.log(err);
    }
  },
  getFavoriteArtist: async (req, res) => {

      try {
          const data = await Artist.find().sort({favorite: "desc"}).populate('user').lean()
          console.log(data, req.user)
          res.render("favorite.ejs", {artists: data, user:req.user})
      }
      catch(error) {
          console.error(error)
      }

  },
  // createArtist: async (req, res) => {
  //   try {
  //     // Upload image to cloudinary
  //     // const result = await cloudinary?.uploader?.upload(req.file.path);

  //    const newArtist = await Artist.create({
  //       stageName: req.body.stageName,
  //       age: req.body.age,
  //       birthName: req.body.birthName,
  //       image: req.body.image,
  //       otherNames: req.body.otherNames,
  //       birthYear: req.body.birthYear,
  //       birthLocation: req.body.birthLocation,
  //       origin: req.body.origin,
  //       genre: req.body.genre,
  //       occupation: req.body.occupation,
  //       yearsActive: req.body.yearsActive,
  //       labels: req.body.labels,
  //       children: req.body.children,
  //       favorite: 0,
  //       user: req.user.id
  //     });
  //     console.log("Artist has been added!");
  //    return res.redirect("/profile");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
  createArtist: async (req, res) => {
    console.log(req.body);
    try {
      // Ensure user is authenticated
      if (!req.user) {
        return res.status(401).json({ error: "Unauthorized: No user found" });
      }
  
      // Upload image if `req.file` exists
      // let imageUrl = req.body.image; // Default to req.body.image if already provided
      // if (req.file) {
      //   const result = await cloudinary.uploader.upload(req.file.path);
      //   imageUrl = result.secure_url;
      // }
  
      // Create artist
      const newArtist = await Artist.create({
        stageName: req.body.stageName,
        age: req.body.age,
        birthName: req.body.birthName,
        image: req.body.image,
        otherNames: req.body.otherNames,
        birthYear: req.body.birthYear,
        birthLocation: req.body.birthLocation,
        origin: req.body.origin,
        genre: req.body.genre,
        occupation: req.body.occupation,
        yearsActive: { 
          start: Number(req.body.yearsActive.start), 
          end: Number(req.body.yearsActive.end),
         },
        labels: req.body.labels,
        children: req.body.children,
        favorite: 0,
        user: req.user.id
      });
  
      console.log("Artist has been added!");
      return res.redirect("/profile"); // ✅ Use return to stop execution
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },  
  favoriteArtist: async (req, res) => {
    console.log('hehehe !!!', req.user._id)
    try {
      await Artist.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { favorite: 1 },
        }
      );
      console.log("Favorite +1");
      res.redirect(`/favorite`);
      // res.redirect(`/artist/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteArtist: async (req, res) => {
    try {

      if (!req.params.id) {
        return res.status(401).json({ error: "Unauthorized: No user found" });
      }
      await Artist.deleteOne({ _id: req.params.id });
      console.log("Deleted Artist");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};