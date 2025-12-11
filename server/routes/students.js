// const express = require('express');
// const Student = require('../models/Student');

// const router = express.Router();

// router.get('/', async (req, res) => {
//   try {
//     const items = await Student.find();
//     res.json(items);
//   } catch (e) {
//     res.status(500).json({ error: 'failed' });
//   }
// });

// router.post('/', async (req, res) => {
//   try {
//     const created = await Student.create(req.body);
//     res.status(201).json(created);
//   } catch (e) {
//     res.status(400).json({ error: 'invalid', message: e?.message });
//   }
// });

// router.delete('/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deleted = await Student.findByIdAndDelete(id);
//     if (!deleted) return res.status(404).json({ error: 'not_found' });
//     res.json({ ok: true });
//   } catch (e) {
//     res.status(400).json({ error: 'invalid_id' });
//   }
// });

// module.exports = router;
const express = require('express');
const Student = require('../models/Student');

const router = express.Router();

// Get all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json(students);
  } catch (err) {
    console.error('Error fetching students:', err.message);
    res.status(500).json({ message: 'Server error while fetching students' });
  }
});

// Create a new student
router.post('/', async (req, res) => {
  try {
    const { name, usn } = req.body;

    if (!name || !usn) {
      return res.status(400).json({ message: 'Name and USN are required' });
    }

    const newStudent = new Student({ name, usn });
    await newStudent.save();

    res.status(201).json({
      message: 'Student added successfully',
      student: newStudent,
    });
  } catch (err) {
    console.error('Error adding student:', err.message);

    // Handle duplicate key error (just in case)
    if (err.code === 11000) {
      return res.status(400).json({ message: 'USN already exists' });
    }

    res.status(500).json({ message: 'Server error while adding student' });
  }
});

// Delete a student by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Student.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json({ message: 'Student deleted successfully' });
  } catch (err) {
    console.error('Error deleting student:', err.message);
    res.status(400).json({ message: 'Invalid student ID' });
  }
});

module.exports = router;
