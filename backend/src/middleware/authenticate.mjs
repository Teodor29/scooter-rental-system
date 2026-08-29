import jwt from "jsonwebtoken"

export function authenticate(req, res, next) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({
      message: "Authentication required",
    })
  }

  const token = authHeader.split(" ")[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.customerId = decoded.customerId

    next()
  } catch {
    return res.status(401).json({
      message: "Invalid or expired token",
    })
  }
}
