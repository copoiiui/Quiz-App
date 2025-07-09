const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const users = []; // in-memory storage

app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const existingUser = users.find(u => u.username === username || u.email === email);
  if (existingUser) {
    return res.json({ message: 'Username or email already exists!' });
  }
  const hashedPassword = await bcrypt.hash(password, 8);
  users.push({ username, email, password: hashedPassword });
  res.json({ message: 'Registration successful!' });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username || u.email === username);
  if (!user) {
    return res.json({ message: 'User not found!' });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    res.json({ message: 'Login successful!' });
  } else {
    res.json({ message: 'Incorrect password!' });
  }
});

app.listen(5000, () => console.log('✅ Server running on http://localhost:5000'));

