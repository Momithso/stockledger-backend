import express, { Request, Response } from "express";
import mainRoutes from './routes/routes'
import { MongoClient } from "mongodb";

const app = express();
const PORT = process.env.PORT || 3000;
const DB_URI = process.env.MONGO_URI || "<>";
export let dbClient: MongoClient;

/**
 * Main Router
 */
app.use('/api/v1', mainRoutes);

/**
 * Greeting message
 */
app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Welcome to the Express + TypeScript Server!" });
});

/**
 * Start server
 */
async function start() {
  try {
    dbClient = new MongoClient(DB_URI);
    await dbClient.connect();
    console.log('Connected to MongoDB');

    // Beispiel: Sammlung referenzieren
    const db = dbClient.db(process.env.MONGO_INITDB_DATABASE || 'appdb');
    app.locals.db = db;

    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  }
}

start();

/**
 * Stop server with db
 */
process.on('SIGINT', async () => {
    console.log('SIGINT received, closing MongoDB connection');
    if (dbClient) await dbClient.close();
    process.exit(0);
});