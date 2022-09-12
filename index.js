const express = require('express');
const app = express();
const router =  require('./routes');
const logger =  require('./utils/logger');

app.use((req, res, next) => {
    req.logger = Object.freeze(logger);
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', router);

app.use((err, req, res, next) => {
    res
    .status(500)
    .json({ message: 'Internal server error' });
})


const port = 3000;
app.listen(port, () => {
    console.log(`Travel application listening on port ${port}`)
});
