var express = require("express");

var routes = function(Lp) {
  var lpRouter = express.Router();

  var lpController = require("../controllers/lpController.js")(Lp);
  lpRouter
    .route("/")
    .post(lpController.post)
    .get(lpController.get)
    .options((req, res) => {
        res.header('Allow', 'GET,POST,OPTIONS');
        res.status(200).send();
    });

  lpRouter.use("/:lpId", function(req, res, next) {
    Lp.findById(req.params.lpId, function(err, lp) {
      if (err) res.status(500).send(err);
      else if (lp) {
        req.lp = lp;
        next();
      } else {
        res.status(404).send("no lp found");
      }
    });
  });

  lpRouter
    .route("/:lpId")

    .get(function(req, res) {
      var returnLps = req.lp.toJSON();
      returnLps._links = {};
      var newLink =
        "http://" + req.headers.host + "/api/lps";
      returnLps._links.collection = {href: newLink};
      returnLps._links.self = {href: newLink + "/" + returnLps._id};
      res.json(returnLps);
    })
    .put(function(req, res) {
      if(!req.body.title &&!req.body.artist&&!req.body.genre){
   res.status(400).send();
   return

    }
      req.lp.title = req.body.title;
      req.lp.artist = req.body.artist;
      req.lp.genre = req.body.genre;
      req.lp.own = req.body.own;
      req.lp.save(function(err) {
        if (err) res.status(500).send(err);
        else {
          res.json(req.lp);
        }
      });
    })
    .patch(function(req, res) {
      if (req.body._id) delete req.body._id;

      for (var p in req.body) {
        req.lp[p] = req.body[p];
      }
      req.lp.save(function(err) {
        if (err) res.status(500).send(err);
        else {
          res.json(req.lp);
        }
      });
    })
    .delete(function(req, res) {
      req.lp.remove(function(err) {
        if (err) res.status(500).send(err);
        else {
          res.status(204).send("Removed");
        }
      });
    })
    .options((req, res) => {
        res.header('Allow', 'GET,PUT,DELETE,OPTIONS');
        res.status(200).send();
    });
  return lpRouter;
};


module.exports = routes;
