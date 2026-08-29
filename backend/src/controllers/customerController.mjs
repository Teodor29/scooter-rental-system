import database from "../../db/database.mjs"
import { ObjectId } from "mongodb"
import bcrypt from "bcrypt"

const SALT_ROUNDS = 10

const customers = {
  getAllCustomers: async function getAllCustomers() {
    let db

    try {
      const db = await database.getCollection("customers")
      const result = await db.collection.find({}).toArray()

      return result
    } catch (error) {
      console.error("Error fetching customers:", error)
      throw new Error("Failed to fetch customers")
    } finally {
      if (db) {
        await db.client.close()
      }
    }
  },

  getCustomer: async function getCustomer(id) {
    let db

    try {
      const db = await database.getCollection("customers")
      const result = await db.collection
        .aggregate([
          { $match: { _id: new ObjectId(id) } },
          {
            $lookup: {
              from: "rentals",
              let: { customerId: "$_id" },
              pipeline: [
                { $match: { $expr: { $eq: ["$customerId", "$$customerId"] } } },
                { $sort: { endTime: -1 } },
              ],
              as: "rentalHistory",
            },
          },
          { $project: { password: 0 } },
        ])
        .toArray()

      return result[0] || null
    } catch (error) {
      console.error("Error fetching customer:", error)
      throw new Error("Failed to fetch customer")
    } finally {
      if (db) {
        await db.client.close()
      }
    }
  },

  getCustomerByEmail: async function getCustomerByEmail(email) {
    let db

    try {
      const db = await database.getCollection("customers")
      const result = await db.collection.findOne({ email })

      return result
    } catch (error) {
      console.error("Error fetching customer by email:", error)
      throw new Error("Failed to fetch customer data")
    } finally {
      if (db) {
        await db.client.close()
      }
    }
  },

  addCustomer: async function addCustomer(data) {
    let db

    try {
      const db = await database.getCollection("customers")
      const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS)
      const result = await db.collection.insertOne({
        balance: 0,
        ...data,
        password: hashedPassword,
      })

      return result
    } catch (error) {
      console.error("Failed to insert data into database:", error)
      throw new Error("Database insertion failed" + error.message)
    } finally {
      if (db) {
        await db.client.close()
      }
    }
  },

  updateCustomer: async function updateCustomer(customerId, updatedData) {
    let db

    try {
      const db = await database.getCollection("customers")
      const result = await db.collection.updateOne(
        { _id: new ObjectId(customerId) },
        { $set: updatedData },
      )

      // Check for matches and updates
      if (result.matchedCount === 0) {
        throw new Error("No customer found with the given ID.")
      }
      return result
    } finally {
      if (db) {
        await db.client.close()
      }
    }
  },

  deleteOneCustomer: async function deleteOneCustomer(id) {
    let db
    try {
      const db = await database.getCollection("customers")
      const result = await db.collection.deleteOne({
        _id: new ObjectId(id),
      })

      return result
    } catch (error) {
      console.error("Error deleting customer from database:", error)
      throw new Error("Customer deletion failed")
    } finally {
      if (db) {
        await db.client.close()
      }
    }
  },

  deleteAllCustomers: async function deleteAllCustomers() {
    let db

    try {
      const db = await database.getCollection("customers")
      const result = await db.collection.deleteMany({})
      return result
    } catch (error) {
      console.error("Error deleting data from MongoDB:", error)
      throw new Error("Database deletion failed")
    } finally {
      if (db) {
        await db.client.close()
      }
    }
  },
}

export default customers
