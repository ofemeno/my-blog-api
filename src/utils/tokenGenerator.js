import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET;

// function used to sign jsonwebtoken
export function jwtTokenSign(data) {
  const payload = {
    username: data.username,
    id: data._id,
  };
  const token = jwt.sign(payload, jwtSecret, { expiresIn: "1h" });
  return token;
}

// function used to verify jsonwebtoken
export function jwtTokenVerify(token) {
  const decoded = jwt.verify(token, jwtSecret);
  return decoded;
}
