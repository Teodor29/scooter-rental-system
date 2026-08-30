import appdata from "./app.mjs"

const app = appdata.app
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
  console.log(`Documentation available at: http://localhost:${PORT}/api-docs`)
})
