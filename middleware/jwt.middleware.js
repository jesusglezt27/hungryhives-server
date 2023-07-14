const { expressjwt: jwt } = require("express-jwt");

// Instantiate the JWT token validation middleware
const isAuthenticated = jwt({
  secret: process.env.TOKEN_SECRET,
  algorithms: ["HS256"],
  requestProperty: "payload",
  getToken: getTokenFromHeaders,
});

// Function used to extract the JWT token from the request's 'Authorization' Headers
function getTokenFromHeaders(req) {
  // Check if the token is available on the request Headers
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    // Get the encoded token string and return it
    const token = req.headers.authorization.split(" ")[1];
    return token;
  }

  return null;
}

// Middleware to handle expired tokens and renew them
const handleExpiredToken = (err, req, res, next) => {
  if (err.name === "UnauthorizedError" && err.expiredAt) {
    // Generate a new token here (based on your authentication logic)
    const newToken = generateNewToken();

    // Set the new token in the response header
    res.set("Authorization", `Bearer ${newToken}`);
    // Set the new token in the request payload for further processing
    req.payload.token = newToken;
  }
  next();
};

// Export the middleware so that we can use it to create protected routes
module.exports = {
  isAuthenticated,
  handleExpiredToken,
};

