const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const Registration = require("./models/registration");

require("dotenv").config();

// ============================================
// Initialize Express App
// ============================================

const app = express();

// ============================================
// Middleware
// ============================================

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// ============================================
// Health Check Route
// ============================================

app.get("/healthz", (req, res) => {
  res.send("OK");
});

// ============================================
// MongoDB Connection
// ============================================

const dbURI = process.env.MONGO_URI;

if (!dbURI) {
  console.error("❌ Missing MONGO_URI in .env file");
  process.exit(1);
}

mongoose
  .connect(dbURI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error");
    console.error(err.message || err);
  });

// ============================================
// Uploads Folder Setup
// ============================================

const uploadDir = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// ============================================
// Multer Storage Configuration
// ============================================

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// ============================================
// Static Uploads Access
// ============================================

app.use("/uploads", express.static(uploadDir));

// ============================================
// API ROUTES
// ============================================

// Register User
app.post("/api/register", upload.single("receipt"), async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      nickName,
      phone,
      jerseySize,
      role,
      paymentMethod,
      playerType,
    } = req.body;

    const receipt = req.file;

    // Validation
    if (paymentMethod === "online" && !receipt) {
      return res.status(400).json({
        message: "Please upload payment receipt.",
      });
    }

    // Create Registration
    const newRegistration = new Registration({
      firstName,
      lastName,
      nickName,
      phone,
      jerseySize,
      role,
      paymentMethod,
      playerType,
      receipt: receipt ? receipt.path : null,
      status: "pending",
    });

    await newRegistration.save();

    res.status(201).json({
      success: true,
      message: "Registration successful",
    });
  } catch (error) {
    console.error("❌ Registration Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to register user",
    });
  }
});

// Get All Registrations
app.get("/api/registrations", async (req, res) => {
  try {
    const registrations = await Registration.find({});

    res.status(200).json(registrations);
  } catch (error) {
    console.error("❌ Fetch Registrations Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch registrations",
    });
  }
});

// Get Registration By ID
app.get("/api/registrations/:id", async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id);

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json(registration);
  } catch (error) {
    console.error("❌ Fetch User Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch user",
    });
  }
});

// Delete Registration
app.delete("/api/registrations/:id", async (req, res) => {
  try {
    await Registration.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("❌ Delete User Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete user",
    });
  }
});

// ============================================
// FRONTEND BUILD SERVING
// ============================================

const frontendDist = path.join(__dirname, "..", "frontend", "dist");

if (fs.existsSync(frontendDist)) {
  // Serve frontend static files
  app.use(express.static(frontendDist));

  // React Router Catch-All
  app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(frontendDist, "index.html"));
  });
}

// ============================================
// START SERVER
// ============================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
