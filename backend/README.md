# Access the database

In order to get access to the database you need to add a .env file in the root of /backend.
The file should contain the following:

//Connect to MongoDB Atlas
MONGODB_URI="<your-mongodb-atlas-connection-string>"

//Used for tests
API_KEY='<your-api-key>'

# API-keys

Ask a maintainer for a valid API key, or generate your own for local development.

### Example usage for requests

```
const response = await fetch(
    'http://localhost:5001/api/v1/customers/all-customers',
    {
        method: 'GET',
        headers: {
            'x-api-key': '<your-api-key>',
            'Content-Type': 'application/json'
        },
    },);
```
