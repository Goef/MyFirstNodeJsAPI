var lpController = function(Lp) {
  var post = function(req, res) {
    var lp = new Lp(req.body);

    if (!req.body.title) {
      res.status(400);
      res.send("Title is required");
      return;
    } else {
      lp.save();
      res.status(201);
      res.send(lp);
    }
  };

  var get = function(req, res) {
    var query = {};
    if (req.query.genre) {
      query.genre = req.query.genre;
    }
    Lp.find(query, function(err, lps) {
      if (err) {
        res.status(500).send(err);
      } else {
        var returnLps = [];
        lps.forEach(function(element) {
          var newLp = element.toJSON();
          newLp._links = {};
          newLp._links.self = {
            href: "http://" + req.headers.host + "/api/lps/" + newLp._id
          };
          returnLps.push(newLp);
        });
        res.json({
          items: returnLps,
          _links: {
            self: {
              href: "http://" + req.headers.host + "/api/lps"
            },
          },
          pagination: {
            error: "Unsupported"
          }
        });
      }
    });
  };
  return {
    post: post,
    get: get
  };
};

module.exports = lpController;
