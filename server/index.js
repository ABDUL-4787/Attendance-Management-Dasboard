// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// const studentsRouter = require('./routes/students');

// const app = express();
// app.use(cors());
// app.use(express.json());

// const PORT = process.env.PORT || 5000;
// const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/attendance'

// async function start() {
//   try {
//     if (!MONGODB_URI) {
//       console.error('MONGODB_URI is not set');
//       process.exit(1);
//     }
//     await mongoose.connect(MONGODB_URI);
//     console.log('MongoDB connected');
//     // Ensure indexes are in sync with schema (e.g., unique usn)
//     try {
//       const Student = require('./models/Student');
//       // If a legacy unique index exists on `usn`, drop it
//       try {
//         const indexes = await Student.collection.indexes();
//         const usnIndex = indexes.find((idx) => idx.key && idx.key.usn === 1);
//         if (usnIndex && usnIndex.unique) {
//           await Student.collection.dropIndex(usnIndex.name);
//           console.log('Dropped legacy unique index on usn:', usnIndex.name);
//         }
//       } catch (e) {
//         console.warn('Index inspection/drop warning:', e?.message);
//       }
//       await Student.syncIndexes();
//     } catch (e) {
//       console.warn('Index sync warning:', e?.message);
//     }
//     app.use('/api/students', studentsRouter);
//     app.get('/api/health', (req, res) => {
//       res.json({ status: 'ok' });
//     });
//     app.listen(PORT, () => {
//       console.log(`server listening on ${PORT}`);
//     });
//   } catch (err) {
//     console.error('failed to start server', err);
//     process.exit(1);
//   }
// }

// start();
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const studentsRouter = require('./routes/students');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/attendance';

async function start() {
  try {
    if (!MONGODB_URI) {
      console.error('MONGODB_URI is not set');
      process.exit(1);
    }

    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected');

    // Clean up legacy unique indexes on `usn` field
    try {
      const Student = require('./models/Student');
      const indexes = await Student.collection.indexes();

      const usnIndex = indexes.find((idx) => idx.key && idx.key.usn === 1);
      if (usnIndex && usnIndex.unique) {
        await Student.collection.dropIndex(usnIndex.name);
        console.log('Dropped legacy unique index on usn:', usnIndex.name);
      }

      // Sync indexes with the current schema (no unique constraint)
      await Student.syncIndexes();
    } catch (e) {
      console.warn('Index handling warning:', e?.message);
    }

    // Routes
    app.use('/api/students', studentsRouter);

    app.get('/api/health', (req, res) => {
      res.json({ status: 'ok' });
    });

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
}

start();
