# FitFlow AI — Personal Fitness Coach

> An AI-powered fitness web app for teens and young adults — complete with body scanning, guided workouts, diet planning, calisthenics training, and progress tracking.

![FitFlow AI](https://img.shields.io/badge/FitFlow-AI%20Powered-00d4ff?style=for-the-badge&logoColor=white)
![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Download](https://img.shields.io/badge/Download-ZIP-00ff88?style=for-the-badge&logo=github&logoColor=black)

---

## Live Demo

**Website:** [singharnavkumar372-cloud.github.io/fitflow-ai](https://singharnavkumar372-cloud.github.io/fitflow-ai)

**Repository:** [github.com/singharnavkumar372-cloud/fitflow-ai](https://github.com/singharnavkumar372-cloud/fitflow-ai)

**Download ZIP:** [Click here to download the full app](https://github.com/singharnavkumar372-cloud/fitflow-ai/archive/refs/heads/main.zip)

---

## About

FitFlow AI is a complete fitness application designed for teenagers, young adults, and adults who want to transform their body. Whether your goal is to lose fat, build muscle, learn calisthenics, or increase height — FitFlow AI gives you a fully personalized plan with video-guided workouts and a weekly diet planner.

All workouts can be done at **home with no equipment** or at the gym.

---

## Features

| Feature | Description |
|---|---|
| AI Body Scanner | Enter your stats for instant body fat, BMI, TDEE analysis and a personalized workout and diet plan |
| 35+ Exercises | Step-by-step guides with in-app YouTube video tutorials for every muscle group |
| Diet Planner | 7-day personalized meal plans with full macro breakdowns for 5 different fitness goals |
| Calisthenics Program | Structured 8-week program from complete beginner to muscle-up and handstand |
| Height Increase Program | 12-week daily routine for spinal decompression and posture correction |
| Progress Tracker | Weight logging, progress charts, and AI weekly reports |
| Home and Gym Workouts | Every exercise has a home alternative — no gym membership required |
| User Accounts | Secure sign-up and sign-in with persistent data saved in the browser |

---

## Workout Categories

- Chest (Push-Up, Diamond Push-Up, Bench Press, Wide Push-Up)
- Back (Pull-Up, Chin-Up, Inverted Row)
- Biceps (Dumbbell Curl, Hammer Curl, Resistance Band Curl)
- Triceps (Tricep Dips, Pushdown, Close-Grip Push-Up)
- Shoulders (Pike Push-Up, Lateral Raise, Military Press)
- Legs (Bodyweight Squat, Lunge, Glute Bridge, Calf Raise)
- Abs / Core (Plank, Crunch, Leg Raise, Bicycle Crunch)
- Cardio (Burpee, Mountain Climbers, High Knees, Jump Rope)
- Calisthenics (Muscle-Up, Handstand Push-Up, L-Sit, Pistol Squat)
- Height Program (Dead Hang, Cobra Stretch, Cat-Cow, Super Cobra)

---

## Diet Plans

Five complete 7-day meal plans, each with full calorie and macro breakdowns:

- Fat Loss — 500 calorie daily deficit, high protein
- Muscle Gain — 300 calorie surplus, optimized for hypertrophy
- Calisthenics Fuel — Performance-focused, high carb and protein
- Height Optimizer — Calcium and vitamin D rich for bone health
- Balanced Fitness — Sustainable everyday nutrition

---

## How to Use

1. Open the app and create a free account
2. Enter your age, weight, height, and fitness goal
3. Run the AI Body Scanner to get your body composition analysis
4. Follow your personalized workout plan with in-app video guides
5. Check your diet plan for daily meal recommendations
6. Log your weight weekly and track progress with charts

---

## Run Locally

No build step or server needed. Pure HTML, CSS, and JavaScript.

1. Download or clone this repository
2. Open `index.html` in any browser
3. That is it — the app runs instantly

```bash
git clone https://github.com/singharnavkumar372-cloud/fitflow-ai.git
cd fitflow-ai
# Open index.html in your browser
```

---

## Project Structure

```
fitflow-ai/
├── index.html          # App shell, sidebar navigation, auth modal
├── style.css           # Complete premium dark design system
├── auth.js             # Authentication and body metric calculations
├── app.js              # SPA router and navigation controller
├── data/
│   ├── exercises.js    # 35+ exercises database across 10 categories
│   ├── diet.js         # 5 weekly meal plan databases
│   └── programs.js     # Calisthenics and Height Increase programs
└── pages/
    ├── landing.js      # Hero landing page
    ├── dashboard.js    # Dashboard with stats and today's workout
    ├── scanner.js      # AI Body Scanner with animated analysis
    ├── workouts.js     # Filterable exercise library with video modal
    ├── diet.js         # Weekly meal planner with macro charts
    ├── programs.js     # Calisthenics and Height programs
    ├── progress.js     # Weight and workout progress charts
    └── profile.js      # Profile management and body metrics
```

---

## Tech Stack

- **HTML5** — Semantic single-page application shell
- **Vanilla CSS** — Custom premium dark design system with glassmorphism effects
- **Vanilla JavaScript** — SPA routing, authentication, and state management
- **Chart.js** — Progress and macro charts
- **Font Awesome** — Icons
- **Google Fonts** — Inter and Outfit typography
- **localStorage** — Client-side data persistence (no backend required)

---

## Target Audience

- Teenagers and young adults looking to get fit
- People who want to train at home without any equipment
- Anyone learning calisthenics from the beginning
- Those wanting to lose fat, build muscle, or grow taller

---

## License

MIT License — free to use, modify, and distribute.

---

Built with passion for fitness and technology.
