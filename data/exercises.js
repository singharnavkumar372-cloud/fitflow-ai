/* ============================================================
   FitFlow AI — Exercise Database
   30+ exercises across 10 categories
   ============================================================ */

const EXERCISES = [
  // ==================== CHEST ====================
  {
    id:'c001', name:'Push-Up', category:'chest', emoji:'💪',
    muscles:['Chest','Triceps','Shoulders'], level:'beginner', equipment:'home',
    description:'The foundation of upper-body training — builds chest, triceps and shoulder strength using only body weight.',
    steps:[
      'Get into a high plank — hands slightly wider than shoulders, body straight head to heels.',
      'Brace your core and squeeze your glutes so your hips don\'t sag.',
      'Lower your chest toward the floor, elbows at roughly 45° from your torso.',
      'Stop 1–2 inches from the ground — don\'t touch.',
      'Drive through your palms and push back to full arm extension.',
      'Squeeze chest at the top for a half second before the next rep.'
    ],
    tips:['Keep a rigid plank — don\'t let hips pike up or sag.','Breathe in on the way down, out on the way up.','Progress: knee push-up → standard → archer → one-arm.'],
    videoId:'IODxDxX7oi4', sets:3, reps:'10–15', duration:null, calories:8
  },
  {
    id:'c002', name:'Diamond Push-Up', category:'chest', emoji:'💎',
    muscles:['Triceps','Inner Chest'], level:'intermediate', equipment:'home',
    description:'Hands form a diamond shape — isolates the triceps and inner chest far more than a standard push-up.',
    steps:[
      'From a plank, bring hands together directly under your sternum.',
      'Touch index fingers and thumbs to form a diamond / triangle.',
      'Keep your body perfectly rigid and straight.',
      'Lower your chest to your hands, elbows tracking straight back.',
      'Press back up to full extension.'
    ],
    tips:['Start slow — this is significantly harder than standard push-ups.','Keep elbows close to your torso throughout.','If wrists hurt, try doing these on fists.'],
    videoId:'J0DXGHnAMjE', sets:3, reps:'8–12', duration:null, calories:9
  },
  {
    id:'c003', name:'Bench Press', category:'chest', emoji:'🏋️',
    muscles:['Chest','Triceps','Front Delts'], level:'intermediate', equipment:'gym',
    description:'The king of chest exercises — a barbell compound lift for building mass and strength across the entire chest.',
    steps:[
      'Lie flat on a bench, feet planted firmly, eyes under the bar.',
      'Grip the bar slightly wider than shoulder-width with an overhand grip.',
      'Unrack and hold bar directly above your mid-chest.',
      'Lower the bar in a slight arc toward your lower chest — touch lightly.',
      'Press back up explosively along the same arc.',
      'Keep shoulder blades pinched throughout — don\'t let them rise.'
    ],
    tips:['Always use a spotter or safety bars for heavy sets.','Leg drive and a tight arch create a stable base.','Bar path should be a slight diagonal, not straight up.'],
    videoId:'rT7DgCr-3pg', sets:4, reps:'6–10', duration:null, calories:16
  },
  {
    id:'c004', name:'Wide Push-Up', category:'chest', emoji:'🤸',
    muscles:['Outer Chest','Front Delts'], level:'beginner', equipment:'home',
    description:'A push-up variation with wide hand placement to emphasise the outer chest and anterior deltoids.',
    steps:[
      'Place hands 6–8 inches wider than shoulder-width, fingers slightly angled out.',
      'Maintain a straight body plank with core tight.',
      'Lower with elbows flaring at ~70°.',
      'Push back up, squeezing your chest at the top.'
    ],
    tips:['Wider stance = more outer chest stimulation.','Don\'t let elbows travel past 90°.','Pair with diamond push-ups for complete chest coverage.'],
    videoId:'IODxDxX7oi4', sets:3, reps:'12–15', duration:null, calories:7
  },

  // ==================== BACK ====================
  {
    id:'b001', name:'Pull-Up', category:'back', emoji:'🧗',
    muscles:['Lats','Biceps','Rear Delts','Core'], level:'intermediate', equipment:'home',
    description:'The gold standard back exercise — builds wide, powerful lats and overall pulling strength.',
    steps:[
      'Jump up and grip the bar overhand (pronated), hands shoulder-width apart.',
      'Hang in a dead hang — arms fully extended, shoulders slightly active.',
      'Engage your lats by pulling your shoulder blades down and together.',
      'Drive your elbows toward your hips to pull your chest toward the bar.',
      'Clear your chin over the bar.',
      'Lower slowly and with full control back to dead hang.'
    ],
    tips:['Lead with your chest, not your chin.','Full dead hang between reps for maximum range.','Use slow negatives (3–5 sec down) to build strength fast.'],
    videoId:'eGo4IYlbE5g', sets:4, reps:'5–10', duration:null, calories:12
  },
  {
    id:'b002', name:'Chin-Up', category:'back', emoji:'🙌',
    muscles:['Biceps','Lats','Upper Back'], level:'beginner', equipment:'home',
    description:'Underhand-grip pull-up that maximally recruits the biceps alongside the lats — great for beginners.',
    steps:[
      'Grip the bar with an underhand (supinated) grip, hands shoulder-width.',
      'Start from a full dead hang.',
      'Pull your chest toward the bar by squeezing your biceps and lats together.',
      'Bring your chin clear above the bar.',
      'Lower slowly to dead hang — don\'t drop.'
    ],
    tips:['Easier than pull-ups — ideal starting point.','Supinate your wrists completely for maximum bicep activation.','Keep your body still; no kipping.'],
    videoId:'brhRXlOhsAM', sets:3, reps:'6–10', duration:null, calories:11
  },
  {
    id:'b003', name:'Inverted Row', category:'back', emoji:'🔄',
    muscles:['Upper Back','Rear Delts','Biceps'], level:'beginner', equipment:'home',
    description:'A horizontal row using a low bar or table edge — the perfect beginner back-builder that needs zero equipment.',
    steps:[
      'Set a bar at hip height or use a sturdy table edge.',
      'Lie underneath and grip overhand at shoulder-width.',
      'Extend legs and keep body straight heel-to-shoulder.',
      'Pull your chest up to the bar by retracting your shoulder blades.',
      'Lower slowly with control back to start.'
    ],
    tips:['Increase difficulty by lowering the bar or elevating your feet.','Squeeze shoulder blades hard at the top.','This directly transfers to pull-up strength.'],
    videoId:'pvz7k5gO-DE', sets:3, reps:'10–15', duration:null, calories:8
  },

  // ==================== BICEPS ====================
  {
    id:'bi001', name:'Dumbbell Bicep Curl', category:'biceps', emoji:'🦾',
    muscles:['Biceps','Brachioradialis'], level:'beginner', equipment:'gym',
    description:'The most fundamental bicep movement for building size and strength in the upper arm.',
    steps:[
      'Stand holding a dumbbell in each hand, palms facing forward, elbows at sides.',
      'Curl the dumbbells upward by flexing your biceps — don\'t swing.',
      'Supinate (rotate palms outward) fully at the top.',
      'Squeeze hard at the top for 1 full second.',
      'Lower slowly over 3 seconds back to full extension.'
    ],
    tips:['No momentum — control every inch of the lift.','Full extension at the bottom is non-negotiable for growth.','Lower weight = better form = more muscle.'],
    videoId:'ykJmrZ5v0Oo', sets:3, reps:'10–12', duration:null, calories:7
  },
  {
    id:'bi002', name:'Hammer Curl', category:'biceps', emoji:'🔨',
    muscles:['Brachialis','Biceps','Forearms'], level:'beginner', equipment:'gym',
    description:'Neutral-grip curl that targets the brachialis for thicker, more impressive arms from all angles.',
    steps:[
      'Hold dumbbells with a neutral grip (palms facing each other) at your sides.',
      'Curl upward keeping the neutral grip — don\'t rotate wrists.',
      'Squeeze at the top.',
      'Lower slowly and with control.'
    ],
    tips:['Great for forearm size too.','Can be done alternating or both at once.','Works best with moderate weight and high reps.'],
    videoId:'zC3nLlEvin4', sets:3, reps:'10–12', duration:null, calories:7
  },
  {
    id:'bi003', name:'Resistance Band Curl', category:'biceps', emoji:'🎀',
    muscles:['Biceps'], level:'beginner', equipment:'home',
    description:'A home-friendly bicep builder with a resistance band — provides constant tension throughout the entire range.',
    steps:[
      'Stand on the middle of a resistance band with feet hip-width apart.',
      'Hold one end of the band in each hand, palms facing forward.',
      'Curl both hands toward your shoulders against the resistance.',
      'Squeeze at the top.',
      'Lower slowly — the band provides eccentric resistance.'
    ],
    tips:['Wider foot stance = more resistance.','Band provides constant tension (better than dumbbells at the top).','Loop two bands for more resistance.'],
    videoId:'ykJmrZ5v0Oo', sets:3, reps:'12–15', duration:null, calories:6
  },

  // ==================== TRICEPS ====================
  {
    id:'t001', name:'Tricep Dips', category:'triceps', emoji:'⬇️',
    muscles:['Triceps','Lower Chest','Shoulders'], level:'beginner', equipment:'home',
    description:'Bodyweight dipping on parallel bars or chair — one of the best tricep mass builders requiring no gym.',
    steps:[
      'Place palms on two parallel bars or the edge of a sturdy chair.',
      'Straighten arms and lift your body off the surface.',
      'Keep your torso upright and vertical for maximum tricep focus.',
      'Lower by bending elbows behind you until upper arms are parallel to floor.',
      'Press back up to full extension.'
    ],
    tips:['Stay upright for triceps; lean forward slightly for chest.','Keep elbows tracking back — not flaring out.','Add weight between legs to progress.'],
    videoId:'0326dy_-CzM', sets:3, reps:'10–15', duration:null, calories:10
  },
  {
    id:'t002', name:'Tricep Pushdown', category:'triceps', emoji:'📉',
    muscles:['Triceps (all 3 heads)'], level:'beginner', equipment:'gym',
    description:'Cable machine isolation — constant tension on the triceps through a pushing down motion.',
    steps:[
      'Set a cable machine with a rope or straight-bar attachment at high pulley.',
      'Stand close, grab the attachment at chest height, elbows tucked to sides.',
      'Push the weight down by fully extending your elbows.',
      'Spread the rope apart at the bottom for peak contraction.',
      'Slowly return to start without moving your upper arms.'
    ],
    tips:['Upper arms must be stationary — only forearms move.','Squeeze at the bottom for 1–2 seconds.','Don\'t lean over the cable; stay tall.'],
    videoId:'2-LAMcpzODU', sets:3, reps:'12–15', duration:null, calories:7
  },
  {
    id:'t003', name:'Close-Grip Push-Up', category:'triceps', emoji:'🔒',
    muscles:['Triceps','Inner Chest'], level:'beginner', equipment:'home',
    description:'A standard push-up with a narrower grip that dramatically increases tricep recruitment.',
    steps:[
      'Start in a standard push-up position.',
      'Move hands inward so they are directly under your shoulders (not touching).',
      'Keep elbows close to your torso as you lower.',
      'Lower until chest nearly touches hands.',
      'Press back up fully extending the arms.'
    ],
    tips:['Slightly wider than diamond push-up — more joint-friendly.','Slow tempo (3 sec down) maximizes tension.','Excellent finisher after chest sets.'],
    videoId:'IODxDxX7oi4', sets:3, reps:'10–15', duration:null, calories:8
  },

  // ==================== SHOULDERS ====================
  {
    id:'s001', name:'Pike Push-Up', category:'shoulders', emoji:'🔺',
    muscles:['Front Delts','Triceps','Upper Back'], level:'beginner', equipment:'home',
    description:'An inverted push-up variation that loads the shoulders — the home gym substitute for an overhead press.',
    steps:[
      'From a push-up position, walk feet toward hands to form an inverted V (Downward Dog).',
      'Keep your back flat and hips high.',
      'Lower the top of your head toward the floor between your hands.',
      'Push back up through your shoulders.'
    ],
    tips:['Walk feet closer to hands for more difficulty.','Progress: pike → elevated pike → wall HSPU.','Keep heels elevated throughout.'],
    videoId:'x7_I5SUAd00', sets:3, reps:'8–12', duration:null, calories:9
  },
  {
    id:'s002', name:'Lateral Raise', category:'shoulders', emoji:'🦅',
    muscles:['Lateral Delts'], level:'beginner', equipment:'gym',
    description:'Isolation for the side delts — the key to that wide, capped-shoulder look.',
    steps:[
      'Stand holding light dumbbells at sides, slight bend in elbows.',
      'Raise both arms out to the sides simultaneously.',
      'Stop when arms are parallel to the floor — don\'t go higher.',
      'Lower very slowly (3–4 seconds) — the descent builds muscle.',
      'Repeat without swinging.'
    ],
    tips:['Light weight, strict form, slow negatives > heavy and sloppy.','Tilt pinky slightly up at top for better deltoid activation.','Lead with your elbows, not your hands.'],
    videoId:'XPPfnSEATJA', sets:4, reps:'12–15', duration:null, calories:6
  },
  {
    id:'s003', name:'Military Press', category:'shoulders', emoji:'🎖️',
    muscles:['Front Delts','Triceps','Traps'], level:'intermediate', equipment:'gym',
    description:'Standing barbell overhead press — the ultimate compound shoulder strength movement.',
    steps:[
      'Stand with barbell at collarbone height, overhand grip just outside shoulders.',
      'Brace core and squeeze glutes.',
      'Press the bar overhead — move head back slightly as bar passes.',
      'Lock out fully at the top; bar over mid-foot.',
      'Lower with control back to collarbone.'
    ],
    tips:['Don\'t excessively arch lower back — keep core braced.','Bar path is slightly diagonal, not vertical.','Seated version reduces lower-back stress.'],
    videoId:'2yjwXTZQDDI', sets:4, reps:'8–10', duration:null, calories:14
  },

  // ==================== LEGS ====================
  {
    id:'l001', name:'Bodyweight Squat', category:'legs', emoji:'🦵',
    muscles:['Quads','Glutes','Hamstrings','Core'], level:'beginner', equipment:'home',
    description:'The most fundamental lower-body movement — strengthens legs and glutes with zero equipment.',
    steps:[
      'Feet shoulder-width apart, toes pointing 10–30° outward.',
      'Brace core, keep chest up, back straight.',
      'Push hips back and bend knees to descend.',
      'Go until thighs are at least parallel to the floor.',
      'Drive through entire foot (heel to toe) to stand.',
      'Squeeze glutes at the top.'
    ],
    tips:['Knees must track in line with toes.','Chest up — resist the urge to lean too far forward.','Add depth gradually as mobility improves.'],
    videoId:'aclHkVaku9U', sets:3, reps:'15–20', duration:null, calories:9
  },
  {
    id:'l002', name:'Lunge', category:'legs', emoji:'🚶',
    muscles:['Quads','Glutes','Hamstrings'], level:'beginner', equipment:'home',
    description:'Single-leg strengthener that builds lower body muscle and improves balance.',
    steps:[
      'Stand upright, feet together.',
      'Step one foot forward ~2–3 feet.',
      'Lower your back knee toward the floor — stop 1 inch before.',
      'Front knee stays over your front foot — not past toes.',
      'Drive through your front heel to return to start.',
      'Alternate legs or complete all reps on one side.'
    ],
    tips:['Long stride = more glutes; short stride = more quads.','Keep torso upright — don\'t lean forward.','Hold water bottles for added resistance at home.'],
    videoId:'QOVaHwm-Q6U', sets:3, reps:'10 each leg', duration:null, calories:10
  },
  {
    id:'l003', name:'Glute Bridge', category:'legs', emoji:'🌉',
    muscles:['Glutes','Hamstrings','Lower Back'], level:'beginner', equipment:'home',
    description:'Isolates and fires the glutes — essential for both aesthetics and injury prevention.',
    steps:[
      'Lie on back, knees bent, feet flat on floor hip-width apart.',
      'Arms flat at sides for stability.',
      'Drive through heels to thrust hips toward the ceiling.',
      'Squeeze your glutes as hard as possible at the top.',
      'Hold for 2 seconds.',
      'Lower hips slowly — don\'t let them touch the floor between reps.'
    ],
    tips:['Don\'t hyperextend your lower back at the top.','Add a weight plate on hips to increase difficulty.','Progress to single-leg glute bridge.'],
    videoId:'OUgsJ8-Vi0E', sets:3, reps:'15–20', duration:null, calories:7
  },
  {
    id:'l004', name:'Calf Raise', category:'legs', emoji:'👟',
    muscles:['Gastrocnemius','Soleus'], level:'beginner', equipment:'home',
    description:'Build strong and defined calves using just a step or flat ground.',
    steps:[
      'Stand on the edge of a step with heels hanging off.',
      'Lower heels as far as possible for a full stretch.',
      'Rise up onto tiptoes as high as possible.',
      'Pause 1 second at the top.',
      'Lower slowly.'
    ],
    tips:['Slow tempo (1 up, 2 hold, 3 down) is the secret to calf growth.','Single-leg calf raises double the intensity.','Keep knees straight for gastrocnemius; slightly bent for soleus.'],
    videoId:'gwLzBJYoWlI', sets:4, reps:'20–25', duration:null, calories:5
  },

  // ==================== ABS ====================
  {
    id:'a001', name:'Plank', category:'abs', emoji:'🧱',
    muscles:['Core','Shoulders','Glutes'], level:'beginner', equipment:'home',
    description:'The ultimate isometric core exercise — strengthens the entire core without spinal flexion.',
    steps:[
      'Forearms on the floor, elbows directly under shoulders.',
      'Body in a perfectly straight line from head to heels.',
      'Engage core as if bracing for a punch.',
      'Squeeze glutes and quads.',
      'Hold, breathing steadily.',
      'Stop the moment your form breaks.'
    ],
    tips:['Quality time over total time — 30s of perfect plank beats 2min of sagging.','Don\'t hold your breath.','Progression: 20s → 30s → 1min → weighted plank.'],
    videoId:'ASdvN_XEl_c', sets:3, reps:null, duration:'30–60 sec', calories:4
  },
  {
    id:'a002', name:'Crunch', category:'abs', emoji:'🌮',
    muscles:['Rectus Abdominis (Upper)'], level:'beginner', equipment:'home',
    description:'Classic abs isolation — focuses on the upper portion of the six-pack muscles.',
    steps:[
      'Lie on back, knees bent, feet flat on floor.',
      'Fingertips lightly behind your ears — don\'t pull your neck.',
      'Curl your ribcage toward your pelvis — short range of motion.',
      'Hold at the top for 1 second.',
      'Lower with control — don\'t fully relax between reps.'
    ],
    tips:['Eyes toward the ceiling protects your neck.','Exhale hard as you crunch — fully engages the abs.','This is a small movement; don\'t try to sit all the way up.'],
    videoId:'Xyd_fa5zoEU', sets:3, reps:'20–25', duration:null, calories:5
  },
  {
    id:'a003', name:'Leg Raise', category:'abs', emoji:'🦶',
    muscles:['Lower Abs','Hip Flexors'], level:'intermediate', equipment:'home',
    description:'Hits the often-neglected lower abs for a complete, developed six-pack.',
    steps:[
      'Lie flat on back, hands under lower back for support.',
      'Keep legs straight and pressed together.',
      'Raise legs until vertical (90°).',
      'Lower slowly — stop just before feet touch the floor.',
      'Maintain tension throughout.'
    ],
    tips:['Press lower back into the floor to prevent arching.','The slower the descent, the harder it gets.','Bend knees to make this easier if needed.'],
    videoId:'JB2oyawG9KQ', sets:3, reps:'12–15', duration:null, calories:6
  },
  {
    id:'a004', name:'Bicycle Crunch', category:'abs', emoji:'🚲',
    muscles:['Obliques','Upper Abs','Lower Abs'], level:'beginner', equipment:'home',
    description:'Rated by research as one of the most effective abdominal exercises — hits all three ab zones.',
    steps:[
      'Lie on back, hands behind ears, both knees lifted.',
      'Extend your right leg straight while bringing left knee to chest.',
      'Simultaneously rotate your right elbow toward the left knee.',
      'Switch sides in a cycling motion.',
      'Lower back stays pressed to floor throughout.'
    ],
    tips:['Slow and controlled beats fast and sloppy every time.','Rotate your torso — don\'t just move your elbows.','Exhale on each rotation for maximum contraction.'],
    videoId:'9FGilxCbdz8', sets:3, reps:'20 total', duration:null, calories:6
  },

  // ==================== CARDIO ====================
  {
    id:'ca001', name:'Burpee', category:'cardio', emoji:'💥',
    muscles:['Full Body','Cardiovascular System'], level:'intermediate', equipment:'home',
    description:'The ultimate full-body cardio exercise — burns massive calories and builds explosive power.',
    steps:[
      'Stand with feet shoulder-width apart.',
      'Squat down and place hands on the floor in front of you.',
      'Jump (or step) both feet back into a high plank.',
      'Perform a push-up (optional for extra difficulty).',
      'Jump (or step) feet back to hands.',
      'Explode upward into a jump with arms overhead. Land softly and repeat.'
    ],
    tips:['Step instead of jump as a beginner modification.','Rest 15–30 seconds between sets.','10 hard burpees = 1 minute of running in terms of calories burned.'],
    videoId:'dZgVxmf6jkA', sets:3, reps:'10–15', duration:null, calories:15
  },
  {
    id:'ca002', name:'Mountain Climbers', category:'cardio', emoji:'⛰️',
    muscles:['Core','Shoulders','Hip Flexors'], level:'beginner', equipment:'home',
    description:'Dynamic plank cardio — builds core stability and cardiovascular fitness at the same time.',
    steps:[
      'Start in a high plank — hands under shoulders, body straight.',
      'Drive one knee explosively toward your chest.',
      'Immediately switch legs — first leg goes back as the other comes forward.',
      'Alternate rapidly in a running-in-place motion.',
      'Keep hips level — don\'t let them rise.'
    ],
    tips:['Slow for core strength, fast for cardio burn.','Keep wrists under shoulders throughout.','Great as a warm-up or circuit finisher.'],
    videoId:'nmwgirgXLYM', sets:3, reps:null, duration:'30–45 sec', calories:12
  },
  {
    id:'ca003', name:'High Knees', category:'cardio', emoji:'🏃',
    muscles:['Quads','Hip Flexors','Cardio'], level:'beginner', equipment:'home',
    description:'Running in place with exaggerated knee drive — great calorie burner and warm-up exercise.',
    steps:[
      'Stand tall, feet hip-width apart.',
      'Drive one knee up toward your chest as high as possible.',
      'Switch legs rapidly — like sprinting on the spot.',
      'Pump your arms in sync with your legs for speed.',
      'Land on the balls of your feet — never your heels.'
    ],
    tips:['Stay light on your feet.','Keep your core engaged throughout.','Target a high-knee height for best results — hip level minimum.'],
    videoId:'oDdkytliOqE', sets:3, reps:null, duration:'30–45 sec', calories:11
  },
  {
    id:'ca004', name:'Jump Rope', category:'cardio', emoji:'🪢',
    muscles:['Calves','Cardio','Coordination'], level:'beginner', equipment:'home',
    description:'One of the most efficient cardio tools on the planet — burns ~10–12 calories per minute.',
    steps:[
      'Stand with rope handles in each hand, rope behind you.',
      'Swing the rope forward overhead and jump as it comes toward your feet.',
      'Jump only 1–2 inches off the ground — stay efficient.',
      'Land on the balls of your feet every time.',
      'Keep jumps small; use your wrists (not arms) to turn the rope.'
    ],
    tips:['Focus on rhythm before speed.','Soft knees on landing to protect joints.','Double-unders (rope passes twice per jump) are the elite progression.'],
    videoId:'FJmRQ5iTXKE', sets:3, reps:null, duration:'1–3 min', calories:22
  },

  // ==================== CALISTHENICS ====================
  {
    id:'cal001', name:'Muscle-Up', category:'calisthenics', emoji:'🏆',
    muscles:['Lats','Chest','Triceps','Shoulders'], level:'advanced', equipment:'home',
    description:'The holy grail of calisthenics — a pull-up transitioning explosively into a dip above the bar.',
    steps:[
      'Hang from a bar with overhand grip (slightly wider than shoulders).',
      'Build momentum with a controlled kip — swing legs forward then back.',
      'At the top of the pull, drive your hips toward the bar explosively.',
      'Lean forward and pull elbows up and over the bar simultaneously.',
      'Press to full lockout above the bar — like the top of a dip.',
      'Lower under control back to a dead hang.'
    ],
    tips:['Prerequisite: 15 clean pull-ups and 15 dips.','The false grip (wrist on bar) makes the transition easier.','Practice the transition separately with a box for assistance.'],
    videoId:'K07I3VTBEoQ', sets:3, reps:'3–8', duration:null, calories:16
  },
  {
    id:'cal002', name:'Handstand Push-Up', category:'calisthenics', emoji:'🤸',
    muscles:['Shoulders','Triceps','Core'], level:'advanced', equipment:'home',
    description:'Pressing your entire body weight overhead — the most demanding shoulder exercise in calisthenics.',
    steps:[
      'Kick up into a handstand against a wall, hands 6–8 inches from the base.',
      'Hands slightly wider than shoulders, fingers spread.',
      'Lower your head toward the floor in a controlled manner.',
      'Use ab mats or a folded towel to cushion your head.',
      'Press back up to full lockout.'
    ],
    tips:['Master holding a wall handstand for 30+ seconds first.','Pike push-ups → elevated pike push-ups → wall HSPU.','Keep your core rock solid to protect your spine.'],
    videoId:'gajqKkvu3rg', sets:3, reps:'4–8', duration:null, calories:14
  },
  {
    id:'cal003', name:'L-Sit', category:'calisthenics', emoji:'🅻',
    muscles:['Core','Hip Flexors','Triceps','Lats'], level:'advanced', equipment:'home',
    description:'A devastating isometric hold that builds an iron core and sculpted arms simultaneously.',
    steps:[
      'Sit between two parallel bars or place hands on two sturdy chairs/boxes.',
      'Press down through your palms to lift your hips off the surface.',
      'Extend both legs straight out in front — parallel to the floor.',
      'Point your toes.',
      'Hold this position keeping abs braced and shoulders down.',
      'Build up: 5 sec → 10 sec → 30 sec holds.'
    ],
    tips:['Start with a tuck L-sit (knees bent) to build strength.','Shoulders down — don\'t shrug.','Slightly lean forward helps achieve the position.'],
    videoId:'16a529d3bBo', sets:4, reps:null, duration:'10–30 sec', calories:6
  },
  {
    id:'cal004', name:'Pistol Squat', category:'calisthenics', emoji:'🔫',
    muscles:['Quads','Glutes','Balance','Core'], level:'advanced', equipment:'home',
    description:'Single-leg full squat requiring extraordinary strength, balance, and ankle mobility.',
    steps:[
      'Stand on one leg, opposite leg extended forward.',
      'Extend arms forward for counterbalance.',
      'Lower on the standing leg — controlled descent all the way to rock bottom.',
      'Pause briefly at the bottom — thighs past parallel.',
      'Drive through your heel to rise back to standing.',
      'Stay balanced throughout — no grabbing support.'
    ],
    tips:['Use a TRX, ring, or doorframe for assisted pistol squats while building.','Box pistol squats (lowering to a box) build strength safely.','Ankle dorsiflexion mobility is critical — stretch calves daily.'],
    videoId:'vq5-vdgJc0I', sets:3, reps:'5 each leg', duration:null, calories:12
  },

  // ==================== HEIGHT INCREASE ====================
  {
    id:'h001', name:'Dead Hang', category:'height', emoji:'🌂',
    muscles:['Spine Decompression','Lats','Grip Strength'], level:'beginner', equipment:'home',
    description:'Hanging from a bar uses gravity to gently decompress your spine — the most effective height exercise.',
    steps:[
      'Jump and grip a pull-up bar with both hands, slightly wider than shoulders.',
      'Fully relax your body — let gravity stretch your spine completely.',
      'Keep shoulders slightly active (not fully passive) for safety.',
      'Breathe deep and slow — visualize your spine lengthening.',
      'Build time gradually over weeks.',
      'Step down or drop safely when finished.'
    ],
    tips:['Daily hanging is key — consistency beats intensity here.','Morning hangs are most effective (spine is more compressed after sleep).','Progress from 30s to 60s to 2 minutes over time.'],
    videoId:'A1KrXgkUG7E', sets:3, reps:null, duration:'30–60 sec', calories:3
  },
  {
    id:'h002', name:'Cobra Stretch', category:'height', emoji:'🐍',
    muscles:['Spinal Extensors','Abs','Hip Flexors'], level:'beginner', equipment:'home',
    description:'A classic yoga backbend that opens the chest, improves posture and decompresses lumbar vertebrae.',
    steps:[
      'Lie face down, hands placed flat under your shoulders.',
      'Press palms into floor and straighten your arms.',
      'Lift your chest and head upward — gaze toward the ceiling.',
      'Keep hips on the floor and legs together.',
      'Hold for 20–30 seconds, breathing deeply.',
      'Lower slowly back down.'
    ],
    tips:['Focus on lifting the sternum up and forward — not crunching the lower back.','Hold each rep for 20–30 seconds minimum.','Do this every morning for maximum postural benefit.'],
    videoId:'JcNa_xL_ZQQ', sets:3, reps:null, duration:'20–30 sec', calories:2
  },
  {
    id:'h003', name:'Cat-Cow Stretch', category:'height', emoji:'🐱',
    muscles:['Spine','Erectors','Core'], level:'beginner', equipment:'home',
    description:'A flowing yoga movement that lubricates spinal discs and improves range of motion in the entire spine.',
    steps:[
      'Start on hands and knees — tabletop position.',
      'Inhale: drop belly toward floor, lift head and tailbone (Cow).',
      'Exhale: round spine toward ceiling, tuck chin and pelvis (Cat).',
      'Flow between positions slowly.',
      'Match breath to movement: inhale = cow, exhale = cat.'
    ],
    tips:['Move with your breath — don\'t rush.','Do 10–20 cycles for maximum benefit.','Also excellent for relieving back pain.'],
    videoId:'kqnua4rHVVA', sets:2, reps:'15 cycles', duration:null, calories:2
  },
  {
    id:'h004', name:'Swimming (Dry Land)', category:'height', emoji:'🏊',
    muscles:['Spinal Erectors','Glutes','Shoulders'], level:'beginner', equipment:'home',
    description:'A lying exercise that mimics swimming motion to strengthen back muscles and improve posture.',
    steps:[
      'Lie face down, arms extended above head.',
      'Simultaneously lift your right arm and left leg off the floor.',
      'Hold 2 seconds at the top.',
      'Switch to left arm and right leg.',
      'Alternate in a controlled swimming stroke motion.'
    ],
    tips:['Keep movements deliberate and controlled.','Engage your core to support lower back.','Excellent for correcting lower-body-dominant posture issues.'],
    videoId:'JcNa_xL_ZQQ', sets:3, reps:'15 each side', duration:null, calories:3
  },
  {
    id:'h005', name:'Super Cobra', category:'height', emoji:'⚡',
    muscles:['Full Spine','Shoulders','Core'], level:'beginner', equipment:'home',
    description:'Combines cobra and downward dog into a flowing sequence that maximally elongates the entire spine.',
    steps:[
      'Start in a high plank position.',
      'Lower hips to floor and push into Cobra — hold 8 seconds.',
      'Push hips up and back into Downward Dog — hold 8 seconds.',
      'Flow back to Cobra.',
      'Repeat the cycle continuously.'
    ],
    tips:['Breathe through each transition.','Feel the spine stretching in both directions.','Do 10 full cycles daily for best results.'],
    videoId:'JcNa_xL_ZQQ', sets:2, reps:'10 cycles', duration:null, calories:4
  }
];

/* ---------- Category Metadata ---------- */
const CATEGORIES = {
  chest:       { label:'Chest',          emoji:'💪', color:'blue'   },
  back:        { label:'Back',           emoji:'🏋️', color:'purple' },
  biceps:      { label:'Biceps',         emoji:'🦾', color:'amber'  },
  triceps:     { label:'Triceps',        emoji:'⬇️', color:'green'  },
  shoulders:   { label:'Shoulders',      emoji:'🦅', color:'blue'   },
  legs:        { label:'Legs',           emoji:'🦵', color:'amber'  },
  abs:         { label:'Abs / Core',     emoji:'🧱', color:'green'  },
  cardio:      { label:'Cardio',         emoji:'❤️', color:'red'    },
  calisthenics:{ label:'Calisthenics',   emoji:'🏆', color:'purple' },
  height:      { label:'Height Program', emoji:'📏', color:'blue'   }
};

const LEVELS = {
  beginner:     { label:'Beginner',     color:'green'  },
  intermediate: { label:'Intermediate', color:'amber'  },
  advanced:     { label:'Advanced',     color:'purple' }
};

const EQUIPMENT = {
  home: { label:'Home', color:'blue' },
  gym:  { label:'Gym',  color:'amber' }
};
