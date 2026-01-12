# 🎥 Browser-Based Screen Recording & Video Delivery System

A lightweight, browser-based screen recording and video sharing platform designed for **personal and small-team workflows**, focusing on **media systems engineering**, **security**, and **cost-aware scalability**.

> **Not a product clone.**
> This project was built to deeply understand how real-world screen recording, video uploads, streaming, and access control systems work under practical constraints.

---

## 🧠 Why I Built This

Most screen recording tools are:

* Optimized for large teams
* Feature-heavy and complex
* Locked behind paid plans

I wanted to:

* Understand **browser-based media capture**
* Build a **secure video upload & delivery pipeline**
* Explore **real-world trade-offs** around performance, storage, and abuse prevention
* Create a **free, minimal internal tool** for personal and small-team usage

This project focuses on **engineering depth**, not competing with existing products.

---

## 🎯 Impact

* 📉 Reduced recording-to-sharing time to **seconds**, removing unnecessary steps
* 🔐 Enabled **secure sharing** with public/private access control
* ⚡ Delivered **low-latency playback** using CDN-based video streaming
* 💸 Designed with **free-tier cost constraints** in mind
* 🧩 Gained hands-on experience with **media systems**, **security**, and **scalable web architecture**

---

## 🛠️ How It Works (High-Level Architecture)

1. **Browser Media Capture**

   * Uses native browser APIs to record screen and audio
   * Handles permissions and recording lifecycle cleanly

2. **Reliable Upload Pipeline**

   * Chunked uploads for large files
   * Retry logic for unstable networks

3. **Video Processing & Delivery**

   * Videos are stored, encoded, and streamed via CDN
   * Optimized for fast playback and scalability

4. **Security & Abuse Protection**

   * Authentication-based access control
   * Rate limiting and bot protection at the edge

---

## 🧪 Key Engineering Decisions & Trade-offs

* **Browser-only recording**
  → Avoids OS-level complexity while focusing on web media APIs

* **Minimal feature set**
  → Depth over breadth to prioritize system reliability and clarity

* **CDN-based delivery**
  → Better performance and scalability than self-hosted streaming

* **Cost-aware design**
  → Optimized for free-tier usage and small-scale workloads

---

## 🚀 Tech Stack

| Layer                    | Technology       |
| ------------------------ | ---------------- |
| Framework                | **Next.js**      |
| Authentication           | **BetterAuth**   |
| Video Hosting & CDN      | **Bunny.net**    |
| Security & Rate Limiting | **Arcjet**       |
| Styling                  | **Tailwind CSS** |
| Language                 | **TypeScript**   |

---

## 🔐 Security & Reliability

* 🔒 Authentication-protected video access
* ⏳ Public / private sharing controls
* 🚫 Rate limiting and bot protection via Arcjet
* ♻️ Upload retry handling for network failures

---

## 📈 What This Project Demonstrates

* Real-world **media system design**
* Handling **large file uploads** reliably
* Secure **content access control**
* Performance and **scalability awareness**
* Intentional scoping and trade-off decisions

---

## 🧭 Future Improvements (Optional)

* Expiring share links
* Transcript search
* Video analytics (views & engagement)
* Download permission controls

---

## 🏁 Final Note

This project was built as a **learning-driven engineering system**, not a commercial product.
It reflects how I approach building software: **clear intent, realistic constraints, and ownership of trade-offs**.

---

📌 *If you’re a recruiter or engineer reviewing this project:*
I’m happy to walk through the architecture, decisions, and challenges in detail.
