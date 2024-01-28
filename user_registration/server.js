const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/userRegistration', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Create User Schema and Model
const userSchema = new mongoose.Schema({
  name: String,
  gender: String,
  age: Number,
  fatherName: String,
  email: String,
  address: String,
  occupation: String,
  password: String
});

const User = mongoose.model('User', userSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/register', async (req, res) => {
  const { name, gender, age, fatherName, email, address, occupation, password } = req.body;

  try {
    // Create a new user
    const newUser = new User({ name, gender, age, fatherName, email, address, occupation, password });
    
    // Save the user to the database
    await newUser.save();

    res.send('Registration successful!');
  } catch (error) {
    res.status(500).send('Error registering user');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
