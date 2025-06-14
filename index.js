require('dotenv').config();

const express       = require('express');
const path          = require('path');
const cookieParser  = require('cookie-parser');
const cors          = require('cors');
const morgan        = require('morgan');
const layouts       = require('express-ejs-layouts');
const bodyParser    = require('body-parser');

const config        = require('./config/config');
const indexRouter   = require('./routes/index');
const submitRouter  = require('./routes/submit');

const app = express();

// — View Engine untuk sambutan ——
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(layouts);
app.set('layout', 'layouts/main');
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// — Static, cors, logger, cookieParser dsb. —
app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// — Route sambutan —
app.use('/', indexRouter);

// — Khusus /submit: pasang text‑parser & router —  
//    kita pindahkan parser URL‑encoded hanya untuk /submit,
//    sehingga tidak ganggu route lain.
app.use(
  '/submit',
  bodyParser.text({ type: 'application/x-www-form-urlencoded' }),
  submitRouter
);

// — Fallback JSON parser untuk API lain (jika perlu) —
// app.use(bodyParser.json());

// — 404 & error handler JSON —
app.use((req, res) => res.status(404).json({ success: false, error: 'Not Found' }));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ success: false, error: err.message });
});

const port = config.PORT;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
