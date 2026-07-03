/* ============================================================
   FitFlow AI — Programs Database
   Calisthenics & Height Increase structured programs
   ============================================================ */

const PROGRAMS = {

  calisthenics: {
    id: 'calisthenics',
    title: 'Calisthenics Mastery',
    subtitle: 'From Zero to Advanced — 8 Weeks',
    description: 'A structured 8-week program that takes you from basic bodyweight movements all the way to advanced calisthenics skills like muscle-ups and handstands. Designed for home training with minimal equipment.',
    emoji: '🏆',
    totalWeeks: 8,
    schedule: '4–5 days/week',
    difficulty: 'Beginner → Advanced',
    equipment: ['Pull-up bar', 'Parallel bars or chairs', 'Open floor space'],

    phases: [
      {
        phase: 1, title: 'Foundation', weeks: 'Weeks 1–2',
        emoji: '🏗️', color: 'green',
        focus: 'Build foundational strength and perfect movement technique.',
        description: 'Master the basics before adding volume. Form is everything.',
        exercises: ['Push-Up', 'Bodyweight Squat', 'Plank', 'Inverted Row', 'Glute Bridge', 'Crunch'],
        schedule: 'Mon / Wed / Fri'
      },
      {
        phase: 2, title: 'Intermediate', weeks: 'Weeks 3–4',
        emoji: '🔥', color: 'amber',
        focus: 'Progress to harder variations and build pulling strength.',
        description: 'Increase volume and introduce more challenging movements.',
        exercises: ['Diamond Push-Up', 'Chin-Up', 'Leg Raise', 'Tricep Dips', 'Lunge', 'Bicycle Crunch'],
        schedule: 'Mon / Tue / Thu / Fri'
      },
      {
        phase: 3, title: 'Skill Work', weeks: 'Weeks 5–6',
        emoji: '⚡', color: 'blue',
        focus: 'Develop skill movements and explosive pulling strength.',
        description: 'Begin transitioning to advanced skills with assistance.',
        exercises: ['Pull-Up', 'Pike Push-Up', 'L-Sit (Tuck)', 'Pistol Squat (Assisted)', 'Mountain Climbers'],
        schedule: 'Mon / Tue / Thu / Fri / Sat'
      },
      {
        phase: 4, title: 'Advanced', weeks: 'Weeks 7–8',
        emoji: '🏆', color: 'purple',
        focus: 'Master advanced calisthenics skills and max strength.',
        description: 'Push your limits with elite calisthenics movements.',
        exercises: ['Muscle-Up (Negative)', 'Handstand Push-Up', 'L-Sit', 'Pistol Squat', 'Burpees'],
        schedule: 'Mon / Tue / Thu / Fri / Sat'
      }
    ],

    weeklyPlan: [
      { week:1, title:'Foundation Week 1', desc:'Push-ups 3×10, Squats 3×15, Plank 3×30s, Inverted Rows 3×10, Glute Bridge 3×20. Focus on perfect form.' },
      { week:2, title:'Foundation Week 2', desc:'Push-ups 4×12, Squats 4×20, Plank 4×40s, Inverted Rows 4×12, Glute Bridge 4×25. Add 1 set per exercise.' },
      { week:3, title:'Intermediate Week 1', desc:'Diamond Push-ups 3×8, Chin-ups 3×6, Leg Raises 3×12, Dips 3×10, Lunges 3×10ea. Introduce pulling movements.' },
      { week:4, title:'Intermediate Week 2', desc:'Diamond Push-ups 4×10, Chin-ups 4×8, Leg Raises 4×15, Dips 4×12, Lunges 4×12ea. Increase volume.' },
      { week:5, title:'Skill Week 1', desc:'Pull-ups 4×6, Pike Push-ups 3×10, L-sit Tuck 3×15s, Assisted Pistol 3×5ea, Mountain Climbers 3×30s.' },
      { week:6, title:'Skill Week 2', desc:'Pull-ups 5×7, Pike Push-ups 4×12, L-sit Tuck 4×20s, Assisted Pistol 4×6ea, Burpees 3×10.' },
      { week:7, title:'Advanced Week 1', desc:'Muscle-up negatives 3×4, Wall HSPU 3×5, Full L-sit 3×10s, Pistol Squat 3×4ea. True advanced territory.' },
      { week:8, title:'Advanced Week 2 (Peak)', desc:'Muscle-up negatives 4×5, Wall HSPU 4×6, Full L-sit 4×15s, Pistol Squat 4×5ea. Test your limits.' }
    ],

    tips: [
      '🛌 Rest is where growth happens — sleep 8 hours minimum every night.',
      '📹 Film yourself to compare your form against the videos in the app.',
      '⬆️ Add reps/sets only when you can complete every rep with perfect form.',
      '💧 Hydrate — shoot for 2–3 litres of water per day.',
      '🥗 Hit your protein target — 2g per kg of bodyweight for optimal muscle building.',
      '🧘 Warm up for 5–10 minutes before every session. Don\'t skip this.',
      '⏳ Consistency > intensity. 4 days/week every week beats 7 days/week for 1 week.',
      '📊 Track your reps/sets in the Progress page to see your gains over time.'
    ],

    faq: [
      { q:'I can\'t do a pull-up yet — what do I do?', a:'Start with chin-ups (easier) and inverted rows. Negative pull-ups (jump up, lower slowly) build strength fast. After 4 weeks you\'ll do your first full pull-up.' },
      { q:'How many rest days do I need?', a:'Rest at least 1–2 days between training the same muscle groups. The program schedules this automatically.' },
      { q:'Can I do this at home?', a:'Yes! The program is designed for home training. All you need is a pull-up bar (can be purchased for ~$20) and optional parallel bars or sturdy chairs.' }
    ]
  },

  height: {
    id: 'height',
    title: 'Height Maximizer Program',
    subtitle: 'Posture, Decompression & Growth — 12 Weeks',
    description: 'A science-backed 12-week daily program combining spinal decompression exercises, postural strengthening, and lifestyle optimization to help you stand taller and maximize your natural height potential.',
    emoji: '📏',
    totalWeeks: 12,
    schedule: 'Daily (15–30 min)',
    difficulty: 'Beginner',
    equipment: ['Pull-up bar (for hanging)', 'Yoga mat'],

    phases: [
      {
        phase: 1, title: 'Flexibility Foundation', weeks: 'Weeks 1–3',
        emoji: '🧘', color: 'blue',
        focus: 'Improve spinal flexibility and establish a daily stretching habit.',
        description: 'Start with gentle daily stretches to loosen tight muscles and improve posture.',
        exercises: ['Cobra Stretch', 'Cat-Cow Stretch', 'Dead Hang', 'Child\'s Pose'],
        schedule: 'Daily'
      },
      {
        phase: 2, title: 'Spinal Decompression', weeks: 'Weeks 4–6',
        emoji: '⬆️', color: 'green',
        focus: 'Maximize spinal decompression with targeted exercises.',
        description: 'Focus on exercises that create traction and space between vertebrae.',
        exercises: ['Dead Hang', 'Super Cobra', 'Swimming (Dry Land)', 'Side Stretch'],
        schedule: 'Daily'
      },
      {
        phase: 3, title: 'Postural Strength', weeks: 'Weeks 7–9',
        emoji: '💪', color: 'amber',
        focus: 'Strengthen postural muscles for permanent height improvement.',
        description: 'Build the deep muscles that hold your spine tall every day.',
        exercises: ['Dead Hang', 'Cobra Stretch', 'Cat-Cow', 'Swimming', 'Plank'],
        schedule: 'Daily + 3×/week strength'
      },
      {
        phase: 4, title: 'Lifestyle Integration', weeks: 'Weeks 10–12',
        emoji: '🌟', color: 'purple',
        focus: 'Integrate all habits permanently for sustained results.',
        description: 'Make the routines automatic and optimize all lifestyle factors.',
        exercises: ['Full Stretch Routine', 'Dead Hang', 'Posture Exercises'],
        schedule: 'Daily'
      }
    ],

    weeklyPlan: [
      { week:1,  title:'Posture Awareness', desc:'2min cobra stretch, 2min cat-cow, 1min dead hang. Practice sitting/standing tall all day.' },
      { week:2,  title:'Add Volume', desc:'3×cobra, 3×cat-cow, 2×dead hang (30s each). Begin noticing your posture throughout the day.' },
      { week:3,  title:'Full Routine', desc:'20-minute complete stretch sequence daily. Include hip flexor and hamstring stretches.' },
      { week:4,  title:'Decompression Focus', desc:'Dead hang 3×1min. All Phase 1 stretches. Add super cobra. Aim for 2 inches of posture improvement.' },
      { week:5,  title:'Daily Hanging', desc:'Dead hang 5× spread through day. Add inversion positions. Focus on breathing during hangs.' },
      { week:6,  title:'Peak Decompression', desc:'Maximum hang time — work toward 3min total/day. Add yoga flow session.' },
      { week:7,  title:'Strength Phase 1', desc:'Add back extensions and superman holds 3×/week alongside daily stretching.' },
      { week:8,  title:'Core Strength', desc:'Add plank and bird-dog exercises 3×/week for deep spinal stability.' },
      { week:9,  title:'Full Integration', desc:'All exercises combined — stretching + decompression + strength. Full 30-min daily routine.' },
      { week:10, title:'Lifestyle Optimization', desc:'Focus on sleep quality (8–9h), hydration (3L water), and correct posture at all times.' },
      { week:11, title:'Consistency', desc:'Maintain all routines. Measure height. Track posture photos. Adjust diet for bone health nutrients.' },
      { week:12, title:'Final Measurement', desc:'Measure height at same time as Week 1 measurement. Take progress photos. Plan ongoing maintenance.' }
    ],

    tips: [
      '😴 Sleep 8–9 hours — 80% of growth hormone is released during deep sleep. This is the most important factor.',
      '💧 Stay well-hydrated — spinal discs are 80% water and need hydration to maintain their height.',
      '📏 Measure your height in the morning, immediately after waking — you\'re tallest then.',
      '🎒 Avoid heavy one-sided bags — always use a backpack to distribute weight evenly.',
      '🧠 Maintain correct posture at all times — this alone adds 1–3cm immediately.',
      '🥛 Eat calcium-rich foods daily: milk, yogurt, cheese, leafy greens, almonds.',
      '☀️ Get vitamin D — sunlight + supplementation supports bone density.',
      '🚭 Avoid smoking — it stunts growth and inhibits bone development.',
      '☕ Limit caffeine if you\'re under 18 — it can interfere with calcium absorption.',
      '🏊 Swimming is excellent — decompresses the spine and develops postural muscles.'
    ],

    faq: [
      { q:'Will this actually make me taller?', a:'For adults, exercises help you achieve your maximum height by improving posture (1–3cm gain instantly) and decompressing the spine. For teenagers still growing, optimal nutrition, sleep and exercise genuinely support growth.' },
      { q:'How long before I see results?', a:'Posture improvements happen within days. Spine decompression benefits are measurable within 4–6 weeks of consistent practice.' },
      { q:'What\'s the best age to start?', a:'Teenagers benefit most as they\'re still growing. However, adults of any age benefit from the posture and spinal health improvements.' }
    ]
  }
};
