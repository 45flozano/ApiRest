var mongoose = require("mongoose");
var url = "mongodb://localhost:27017/users"
mongoose
  .connect(url)
  .then((res)=>{
    console.log("Base de datos conectada "+url)
  })
  .catch((error) => handleError(error));

var User = require("./users");

exports.user_create = async function (req, res) {
  var user = new User({
    name: req.body.name,
    age: req.body.age,
  });
  await user.save(function (err) {
    if (err) {
      return next(err);
    }
    //res.send("message", "Ok");
    res.status(200).send({ message: "Ok" });
  });
};

exports.user_delete = async function (req, res) {
  var user = await User.findByIdAndDelete(req.params.id, (err, user) => {
    if (err) return res.status(500).send(err);
    // We'll create a simple object to send back with a message and the id of the document that was removed
    // You can really do this however you want, though.
    const response = {
      message: "user successfully deleted",
      id: req.params.id,
    };

    return res.status(200).send(response);
  });
};

exports.user_update = async function (req, res) {
  var user = User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, user) => {
      // Handle any possible database errors
      if (err) return res.status(500).send(err);
      return res.send(user);
    }
  );
};

exports.user_find_all = async function (req, res) {
  var user = await User.find((err, user) => {
    if (err) return res.status(500).send(err);

    return res.status(200).send(user);
  });
};
exports.user_find = async function (req, res) {
  var user = await User.findById(req.params.id, (err, user) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(user);
  });
};
