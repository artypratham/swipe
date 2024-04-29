const express = require("express");
const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors(
  {
    origin: ["https://swipe-frontend-six.vercel.app"],
    methods: ["GET","POST","PUT"],
    credentials: true
  }
));
app.use(express.json());
const PORT = process.env.PORT || 8000;
const uri = process.env.MONGODB_URI;
app.get("/", (req, res) => {
  res.json("Hello");
});

app.post("/login", async (req, res) => {
  const client = new MongoClient(uri);
  const { email, password } = req.body;

  try {
    await client.connect();
    const database = client.db("tinder-app-data");
    const users = database.collection("users");
    const user = await users.findOne({ email });

    if (!user) {
      // If no user found, return an error
      return res.status(400).json("Invalid Credentials");
    }

    const correctPassword = await bcrypt.compare(
      password,
      user.hashed_password
    );

    if (user && correctPassword) {
      const token = jwt.sign(user, email, {
        expiresIn: 60 * 24,
      });
      res.status(201).json({ token, userId: user.user_id });
    }
    res.status(400).json("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
});

app.post("/signup", async (req, res) => {
  const client = new MongoClient(uri);
  const { email, password } = req.body;

  const generatedUserId = uuidv4();
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await client.connect();
    const database = client.db("tinder-app-data");
    const users = database.collection("users");
    const existingUser = await users.findOne({ email });

    if (existingUser) {
      return res.status(409).send("User already exists. Please login");
    }
    const sanitizedEmail = email.toLowerCase();

    const data = {
      user_id: generatedUserId,
      email: sanitizedEmail,
      hashed_password: hashedPassword,
    };
    const insertedUser = await users.insertOne(data);
    const token = jwt.sign(insertedUser, sanitizedEmail, {
      expiresIn: 60 * 24,
    });
    res.status(201).json({ token, userId: generatedUserId });
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
});

app.get("/user", async (req, res) => {
  const client = new MongoClient(uri);
  const userId = req.query.userId;

  try {
    await client.connect();
    const database = client.db("tinder-app-data");
    const users = database.collection("users");

    const query = { user_id: userId };
    const user = await users.findOne(query);
    res.send(user);
  } finally {
    await client.close();
  }
});

// app.get("/users", async (req, res) => {
//   const client = new MongoClient(uri);

//   try {
//     await client.connect();
//     const database = client.db("tinder-app-data");
//     const users = database.collection("users");

//     // const query = {user_id: userId}
//     const returnedUsers = await users.find().toArray();
//     res.send(returnedUsers);
//   } finally {
//     await client.close();
//   }
// });

app.get("/users", async (req, res) => {
  const client = new MongoClient(uri);
  const userId = req.query.userId;

  try {
    await client.connect();
    const database = client.db("tinder-app-data");
    const users = database.collection("users");

    const user = await users.findOne({ user_id: userId });
    const matchedUserIds = user?.matches
      .map(({ user_id }) => user_id)
      .concat(userId);

    const query = { user_id: { $nin: matchedUserIds } }; // Exclude matched users
    const returnedUsers = await users.find(query).toArray();

    res.send(returnedUsers);
  } finally {
    await client.close();
  }
});

app.get("/users1", async (req, res) => {
  const client = new MongoClient(uri);
  const userIds = JSON.parse(req.query.userIds);

  try {
    await client.connect();
    const database = client.db("tinder-app-data");
    const users = database.collection("users");

    const pipeline = [
      {
        $match: {
          user_id: {
            $in: userIds,
          },
        },
      },
    ];
    const foundUsers = await users.aggregate(pipeline).toArray();

    res.send(foundUsers);
  } finally {
    await client.close();
  }
});

app.put("/user", async (req, res) => {
  const client = new MongoClient(uri);
  const formData = req.body;

  try {
    await client.connect();
    const database = client.db("tinder-app-data");
    const users = database.collection("users");
    const query = { user_id: formData.user_id };
    const updateDocument = {
      $set: {
        first_name: formData.first_name,
        dob_day: formData.dob_day,
        dob_month: formData.dob_month, 
        dob_year: formData.dob_year,
        // show_gender: formData.show_gender,
        gender_identity: formData.gender_identity,
        url: formData.url,
        about: formData.about,
        matches: formData.matches,
        git_url: formData.git_url,
        linkedin_url: formData.linkedin_url,
        department : formData.department,
        class: formData.class,
        look_for: formData.look_for,
        selectedSkillsSet: formData.selectedSkillsSet,
      },
    };
    const updatedUser = await users.updateOne(query, updateDocument);
    res.send(updatedUser);
  } finally {
    await client.close();
  }
});

app.put("/addmatch", async (req, res) => {
  const client = new MongoClient(uri);
  const { userId, matchedUserId } = req.body;

  try {
    await client.connect();
    const database = client.db("tinder-app-data");
    const users = database.collection("users");

    const query = { user_id: userId };
    const updateDocument = {
      $push: { matches: { user_id: matchedUserId } },
    };
    const user = await users.updateOne(query, updateDocument);
    res.send(user);
  } finally {
    await client.close();
  }
});

app.get("/messages", async (req, res) => {
  const client = new MongoClient(uri);
  const { userId, correspondingUserId } = req.query;

  try {
    await client.connect();
    const database = client.db("tinder-app-data");
    const messages = database.collection("messages");

    const query = {
      from_userId: userId,
      to_userId: correspondingUserId,
    };
    const foundMessages = await messages.find(query).toArray();
    res.send(foundMessages);
  } finally {
    await client.close();
  }
});


app.post("/message", async (req, res) => {
  const client = new MongoClient(uri);
  const message = req.body.message;

  try {
    await client.connect();
    const database = client.db("tinder-app-data");
    const messages = database.collection("messages");
    const insertedMessage = await messages.insertOne(message);
    res.send(insertedMessage);
  } finally {
    await client.close();
  }
});

app.listen(PORT, () => console.log("Server running on PORT " + PORT));
