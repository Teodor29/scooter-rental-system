import "dotenv/config"

import express from "express"
import swaggerUi from "swagger-ui-express"
import swaggerConfig from "./config/swagger.mjs"
import cors from "cors"
import customerRoutesV1 from "./src/routes/v1/customer.mjs"
import adminRoutesV1 from "./src/routes/v1/admin.mjs"
import scooterRoutesV1 from "./src/routes/v1/scooters.mjs"
import citiesRoutesV1 from "./src/routes/v1/cities.mjs"
import { rateLimiter } from "./src/middleware/rateLimit.mjs"

const app = express()

app.use(cors())
app.use(express.json())

app.use(rateLimiter)

//Swagger documentation
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerConfig.swaggerSpec),
)

app.get("/", (req, res) => {
  res.json({ hej: "Hello World" })
})

app.use("/api/v1/customers", customerRoutesV1)
app.use("/api/v1/admins", adminRoutesV1)
app.use("/api/v1/scooters", scooterRoutesV1)
app.use("/api/v1/cities", citiesRoutesV1)

export default { app }
