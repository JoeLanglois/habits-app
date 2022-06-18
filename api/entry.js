import express from 'express';
import bodyparser from 'body-parser';

class Rpc {
  constructor(app) {
    this.app = app;
    this.handlers = new Map();

    app.use(bodyparser.json());
    this.setupRoutes();
  }

  expose(methodName, handler) {
    this.handlers.set(methodName, handler);
  }

  setupRoutes() {
    this.app.post('/rpc/:method', async (req, res) => {
      const method = req.params.method;
      return res.json({
        method,
      });
    });
  }

  start(port) {
    this.app.listen(port, () => {
      console.log('> Server started :0');
    });
  }
}

const app = express();
const rpc = new Rpc(app);
rpc.start(1234);
