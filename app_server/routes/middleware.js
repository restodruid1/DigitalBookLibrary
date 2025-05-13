var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  //const authHeader = req.headers["authorization"];
  const authHeader = req.cookies.token;

    if (!authHeader) {
        return res.status(403).json({ message: "No token provided" });
    }

    // Extract the token from "Bearer <token>"
    const token = authHeader.split(" ")[1];

    jwt.verify(authHeader, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Invalid or expired token" });
        }

        req.user = decoded; // Save user info for later
        next(); // Move to next middleware or route
    });
};  


module.exports = verifyToken;
