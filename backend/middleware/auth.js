const jwt = require("jsonwebtoken");

exports.isAuthenticatedUser = (req, res, next) => {
  //Acessing bearer authorization token from the Header
  const authorizationHeader = req.headers.authorization;

  if (authorizationHeader) {
    //spillting and getting token from bearer token string
    const token = authorizationHeader.split(" ")[1];

    try {
      //verifying token
      var decoded = jwt.verify(token, "nothing");

      //if verified successfully then calling the next middleware or function
      if (decoded) next();
    } catch (error) {
      //if token is not verified then sending invalid token reposnse
      res.status(401).json({ message: "Invalid Token" });
    }
  } else {
    //if bearer authorization token not present in the header then sending unauthorized access as response
    res.status(401).json({
      message: "Unauthorized Access",
    });
  }
};
