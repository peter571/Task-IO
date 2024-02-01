import { createServer } from 'http';
import { setupApp } from './appSetup';
import { setupSocket } from './socket';
import { connectDB } from './database/database';

(async () => {
  try {
    // Setup Express app
    const app = setupApp();
    const httpServer = createServer(app);

    // Setup Socket.IO
    setupSocket(httpServer);

    // Connect to database
    const CONNECTION_URL = process.env.MONGO_URL || '';
    await connectDB(CONNECTION_URL);

    // Start server
    const PORT = process.env.PORT || 5000;
    httpServer.listen(PORT, () => {
      console.log(`Task IO server listening at PORT:${PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
})();
