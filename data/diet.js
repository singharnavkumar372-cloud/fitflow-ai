/* ============================================================
   FitFlow AI — Diet Plans Database
   Weekly meal plans for each fitness goal
   ============================================================ */

const DIET_PLANS = {
  'fat-loss': {
    name: 'Fat Loss', emoji: '🔥', color: 'green',
    description: 'A calorie-deficit plan designed to burn fat while preserving lean muscle mass.',
    adjustment: -500,
    macros: { protein: 35, carbs: 40, fat: 25 },
    meals: {
      Monday: {
        breakfast: { name:'Protein Oats', desc:'Rolled oats cooked with whey protein, topped with banana slices and almond butter.',     P:35, C:45, F:10, kcal:410 },
        lunch:     { name:'Grilled Chicken Salad', desc:'Grilled chicken over mixed greens with quinoa, cucumber, cherry tomatoes, lemon vinaigrette.', P:45, C:30, F:12, kcal:412 },
        dinner:    { name:'Baked Salmon & Veggies', desc:'Salmon fillet baked with lemon-herb crust, served with steamed broccoli and brown rice.', P:42, C:35, F:14, kcal:434 },
        snack:     { name:'Greek Yogurt & Berries', desc:'Low-fat Greek yogurt with mixed berries and a light drizzle of honey.',               P:18, C:20, F:2, kcal:170 }
      },
      Tuesday: {
        breakfast: { name:'Egg White Omelette', desc:'4 egg whites with baby spinach, mushrooms, and crumbled feta cheese.',                P:28, C:8,  F:7,  kcal:207 },
        lunch:     { name:'Turkey Avocado Wrap', desc:'Whole wheat tortilla with lean turkey breast, avocado, shredded lettuce, and tomato.',  P:38, C:35, F:15, kcal:427 },
        dinner:    { name:'Tofu Stir-Fry', desc:'Firm tofu stir-fried with bell peppers, snap peas, broccoli in a light soy-ginger sauce over brown rice.', P:30, C:40, F:12, kcal:388 },
        snack:     { name:'Protein Shake + Almonds', desc:'Whey protein shake with water and a small handful of raw almonds.',               P:25, C:5,  F:8,  kcal:188 }
      },
      Wednesday: {
        breakfast: { name:'Smoothie Bowl', desc:'Blended frozen mixed berries with protein powder, topped with granola, chia seeds, and sliced kiwi.', P:30, C:50, F:8, kcal:392 },
        lunch:     { name:'Tuna Chickpea Bowl', desc:'Canned tuna over spiced chickpeas with diced cucumber, olive oil, lemon juice, and herbs.', P:42, C:35, F:13, kcal:425 },
        dinner:    { name:'Chicken Stir-Fry Bowl', desc:'Diced chicken breast with broccoli, carrots, zucchini in low-sodium soy sauce over cauliflower rice.', P:40, C:22, F:10, kcal:338 },
        snack:     { name:'Rice Cakes & Peanut Butter', desc:'2 rice cakes with natural peanut butter and banana slices.',                   P:8,  C:30, F:10, kcal:238 }
      },
      Thursday: {
        breakfast: { name:'High-Protein Pancakes', desc:'Oat-banana pancakes made with protein powder and egg whites, served with fresh berries.', P:32, C:48, F:9, kcal:405 },
        lunch:     { name:'Shrimp Quinoa Bowl', desc:'Grilled shrimp over quinoa with roasted peppers, corn, and tahini dressing.',            P:40, C:42, F:11, kcal:427 },
        dinner:    { name:'Lean Beef Meatballs', desc:'95% lean beef meatballs in light marinara sauce with zucchini noodles.',              P:45, C:20, F:12, kcal:368 },
        snack:     { name:'Cottage Cheese & Pineapple', desc:'Low-fat cottage cheese with fresh pineapple chunks for natural sweetness.',      P:20, C:18, F:3,  kcal:179 }
      },
      Friday: {
        breakfast: { name:'Overnight Oats', desc:'Oats soaked in almond milk overnight with chia seeds, topped with walnuts and mixed berries.',  P:22, C:52, F:14, kcal:422 },
        lunch:     { name:'Chicken Veggie Soup', desc:'Hearty chicken and vegetable soup with barley in a light broth.',                      P:38, C:32, F:8,  kcal:360 },
        dinner:    { name:'Grilled Fish Tacos', desc:'Tilapia in corn tortillas with shredded cabbage, pico de gallo, and light lime crema.',   P:38, C:40, F:14, kcal:434 },
        snack:     { name:'Apple & Almond Butter', desc:'Fresh apple slices with 1 tablespoon natural almond butter.',                        P:6,  C:28, F:9,  kcal:217 }
      },
      Saturday: {
        breakfast: { name:'Veggie Egg Scramble', desc:'3 whole eggs scrambled with spinach, bell peppers, onions, and diced turkey.',         P:35, C:12, F:16, kcal:332 },
        lunch:     { name:'Mediterranean Bowl', desc:'Grilled chicken over hummus, olives, cucumber, tomato, and whole wheat pita.',           P:40, C:38, F:16, kcal:456 },
        dinner:    { name:'Herb Chicken Thighs', desc:'Herb-marinated chicken thighs with roasted sweet potato wedges and asparagus.',        P:42, C:35, F:14, kcal:434 },
        snack:     { name:'Protein Bar', desc:'A quality protein bar under 250 calories with at least 20g protein.',                          P:20, C:22, F:7,  kcal:231 }
      },
      Sunday: {
        breakfast: { name:'Healthy French Toast', desc:'Whole grain bread dipped in egg-cinnamon-vanilla mixture, pan-cooked, topped with fresh berries.', P:24, C:44, F:8, kcal:344 },
        lunch:     { name:'Meal Prep Bowl', desc:'Weekly prep leftovers — lean protein, grain, roasted vegetables.',                          P:40, C:38, F:12, kcal:420 },
        dinner:    { name:'Pork Tenderloin', desc:'Herb-crusted lean pork tenderloin with cauliflower mash and steamed green beans.',          P:44, C:20, F:10, kcal:346 },
        snack:     { name:'Veggie Hummus Dip', desc:'Carrot sticks, celery, and bell pepper strips with 3 tablespoons hummus.',               P:8,  C:22, F:8,  kcal:192 }
      }
    }
  },

  'muscle-gain': {
    name: 'Muscle Gain', emoji: '💪', color: 'blue',
    description: 'A calorie-surplus plan engineered for muscle hypertrophy and strength gains.',
    adjustment: +300,
    macros: { protein: 30, carbs: 50, fat: 20 },
    meals: {
      Monday: {
        breakfast: { name:'Mass Gainer Oats', desc:'Double oats with whole milk, 2 scoops protein powder, banana, and peanut butter.',        P:50, C:80, F:18, kcal:690 },
        lunch:     { name:'Chicken & Rice Bowl', desc:'200g grilled chicken breast with 200g white rice, broccoli, and teriyaki sauce.',       P:55, C:70, F:10, kcal:590 },
        dinner:    { name:'Steak & Sweet Potato', desc:'Lean sirloin steak (200g) with baked sweet potato and steamed vegetables.',            P:55, C:55, F:18, kcal:606 },
        snack:     { name:'Mass Shake', desc:'2 scoops protein, whole milk, banana, oats — blended. ~550 cal post-workout fuel.',             P:45, C:65, F:12, kcal:548 }
      },
      Tuesday: {
        breakfast: { name:'Egg & Salmon Toast', desc:'4 whole eggs on 2 slices whole grain toast with avocado and smoked salmon.',            P:42, C:40, F:28, kcal:580 },
        lunch:     { name:'Tuna Pasta', desc:'200g pasta with 2 cans tuna, olive oil, garlic, and cherry tomatoes.',                           P:50, C:75, F:16, kcal:632 },
        dinner:    { name:'Salmon & Brown Rice', desc:'Large salmon fillet with 200g brown rice and steamed asparagus drizzled with olive oil.',P:52, C:58, F:20, kcal:620 },
        snack:     { name:'PB&J Whole Grain', desc:'2 slices whole grain bread, natural peanut butter, and fruit-only jam.',                  P:16, C:50, F:18, kcal:422 }
      },
      Wednesday: {
        breakfast: { name:'XL Greek Yogurt Parfait', desc:'Full-fat Greek yogurt with granola, mixed berries, honey, and chopped walnuts.',   P:38, C:60, F:20, kcal:572 },
        lunch:     { name:'Burger Bowl', desc:'Lean beef patty over rice with cheese, lettuce, tomato, onion, and homemade sweet potato fries.',P:52, C:68, F:22, kcal:676 },
        dinner:    { name:'Creamy Chicken Pasta', desc:'Grilled chicken over pasta in light cream sauce with spinach and mushrooms.',          P:55, C:70, F:16, kcal:648 },
        snack:     { name:'Cottage Cheese & Fruit', desc:'Large portion of cottage cheese with sliced peaches, almonds, and a drizzle of honey.', P:30, C:30, F:12, kcal:348 }
      },
      Thursday: {
        breakfast: { name:'XL Protein Pancakes', desc:'6 oat-protein pancakes with maple syrup, butter, plus 2 eggs scrambled on the side.',  P:45, C:75, F:18, kcal:642 },
        lunch:     { name:'Chicken Burrito Bowl', desc:'Large burrito bowl with chicken, rice, black beans, shredded cheese, and guacamole.',  P:52, C:72, F:20, kcal:672 },
        dinner:    { name:'Beef Stir-Fry Noodles', desc:'Sliced lean beef with egg noodles, bok choy, carrots, and savory oyster sauce.',     P:50, C:65, F:18, kcal:634 },
        snack:     { name:'Protein Oat Cookies', desc:'Homemade oat-protein cookies (2) with a large glass of whole milk.',                   P:20, C:45, F:14, kcal:386 }
      },
      Friday: {
        breakfast: { name:'Breakfast Burrito', desc:'Large whole wheat tortilla with 4 eggs, low-fat cheese, turkey, peppers, and salsa.',    P:44, C:52, F:20, kcal:564 },
        lunch:     { name:'Salmon Sushi Bowl', desc:'Salmon, avocado, edamame, and cucumber over sushi rice with low-sodium soy sauce.',      P:48, C:68, F:16, kcal:608 },
        dinner:    { name:'BBQ Chicken Plate', desc:'BBQ chicken breast with corn on the cob, creamy coleslaw, and baked beans.',             P:50, C:65, F:14, kcal:586 },
        snack:     { name:'Trail Mix', desc:'Mixed nuts, dried mango, cranberries, and dark chocolate chips.',                                 P:12, C:42, F:24, kcal:428 }
      },
      Saturday: {
        breakfast: { name:'XL French Toast', desc:'4 slices French toast with maple syrup, fresh berries, plus scrambled eggs on the side.',  P:42, C:78, F:16, kcal:628 },
        lunch:     { name:'Chicken & Sweet Potato', desc:'Grilled chicken breast with large baked sweet potato, broccoli, and olive oil drizzle.', P:52, C:70, F:16, kcal:632 },
        dinner:    { name:'Healthy Pizza', desc:'Whole wheat crust pizza loaded with chicken, peppers, onions, spinach, and moderate mozzarella.', P:48, C:70, F:18, kcal:634 },
        snack:     { name:'Protein Ice Cream', desc:'Blended frozen banana and protein powder topped with granola — macro-friendly dessert.',  P:28, C:45, F:8,  kcal:364 }
      },
      Sunday: {
        breakfast: { name:'Big Muscle Breakfast', desc:'4 eggs, 4 strips turkey bacon, 2 slices whole grain toast with butter, and fresh orange juice.', P:44, C:50, F:20, kcal:564 },
        lunch:     { name:'Batch Cook Sunday', desc:'Bulk-cooked chicken, brown rice, and mixed roasted vegetables — prep for the week.',     P:55, C:68, F:14, kcal:622 },
        dinner:    { name:'Roast Chicken Dinner', desc:'Half roasted chicken with roasted potatoes, glazed carrots, peas, and chicken gravy.', P:55, C:60, F:20, kcal:640 },
        snack:     { name:'Cheese & Crackers', desc:'Whole grain crackers with aged cheddar cheese and fresh apple slices.',                  P:18, C:40, F:16, kcal:376 }
      }
    }
  },

  'general': {
    name: 'Balanced Fitness', emoji: '⚖️', color: 'amber',
    description: 'A balanced, sustainable diet for overall health, energy, and fitness maintenance.',
    adjustment: 0,
    macros: { protein: 25, carbs: 50, fat: 25 },
    meals: {
      Monday:    { breakfast:{name:'Balanced Oatmeal',desc:'Oatmeal with banana, walnuts, cinnamon, and honey.',P:18,C:52,F:12,kcal:388}, lunch:{name:'Chicken Wrap',desc:'Grilled chicken, mixed salad, avocado in a whole wheat wrap.',P:38,C:42,F:12,kcal:432}, dinner:{name:'Baked Fish & Chips',desc:'Oven-baked white fish with homemade sweet potato chips and peas.',P:36,C:48,F:12,kcal:444}, snack:{name:'Mixed Nuts',desc:'A small handful of mixed nuts.',P:6,C:8,F:16,kcal:196} },
      Tuesday:   { breakfast:{name:'Avocado Egg Toast',desc:'2 poached eggs on whole grain toast with smashed avocado.',P:22,C:30,F:16,kcal:352}, lunch:{name:'Tuna Pasta Salad',desc:'Whole wheat pasta with canned tuna, olives, cucumber, and light dressing.',P:36,C:50,F:10,kcal:434}, dinner:{name:'Chicken Curry & Rice',desc:'Mild coconut chicken curry served over basmati rice.',P:38,C:52,F:14,kcal:482}, snack:{name:'Fresh Fruit Bowl',desc:'Seasonal mixed fruits.',P:3,C:30,F:1,kcal:141} },
      Wednesday: { breakfast:{name:'Green Smoothie',desc:'Spinach, banana, mango, protein powder, and almond milk blended smooth.',P:24,C:42,F:8,kcal:336}, lunch:{name:'Tomato Soup & Sandwich',desc:'Homemade tomato soup with a turkey and cheese sandwich on whole grain.',P:32,C:45,F:10,kcal:402}, dinner:{name:'Lean Steak Salad',desc:'Sliced lean sirloin over mixed greens with balsamic vinaigrette and croutons.',P:42,C:20,F:16,kcal:392}, snack:{name:'Yogurt & Berries',desc:'Low-fat yogurt with fresh strawberries and blueberries.',P:14,C:20,F:3,kcal:163} },
      Thursday:  { breakfast:{name:'Buckwheat Pancakes',desc:'Buckwheat pancakes with fresh berries and maple syrup.',P:16,C:55,F:8,kcal:360}, lunch:{name:'Veggie Burrito Bowl',desc:'Black beans, brown rice, roasted peppers, guacamole, and salsa.',P:22,C:60,F:14,kcal:458}, dinner:{name:'Pan-Seared Salmon',desc:'Salmon with couscous, roasted cherry tomatoes, and a lemon-herb sauce.',P:40,C:40,F:18,kcal:482}, snack:{name:'Hummus & Veggies',desc:'Hummus with carrot sticks and celery.',P:8,C:18,F:6,kcal:158} },
      Friday:    { breakfast:{name:'Whole Grain Cereal',desc:'High-fibre cereal with semi-skimmed milk and sliced banana.',P:12,C:48,F:6,kcal:296}, lunch:{name:'Tuna Sandwich',desc:'Tuna, light mayo, and lettuce on whole grain bread with a side salad.',P:32,C:42,F:12,kcal:408}, dinner:{name:'Homemade Pizza',desc:'Thin-crust whole wheat pizza with mixed vegetables and mozzarella.',P:28,C:58,F:14,kcal:474}, snack:{name:'Dark Chocolate',desc:'2 squares of 85% dark chocolate with a cup of green tea.',P:3,C:14,F:9,kcal:147} },
      Saturday:  { breakfast:{name:'Full Breakfast',desc:'2 eggs, 2 strips turkey bacon, baked beans, and 2 slices whole grain toast.',P:28,C:45,F:14,kcal:422}, lunch:{name:'Fish Tacos',desc:'Grilled fish tacos with cabbage slaw, avocado, and fresh salsa.',P:32,C:45,F:12,kcal:416}, dinner:{name:'Sunday Roast (Sat)',desc:'Roast chicken with roasted potatoes, carrots, parsnips, and gravy.',P:42,C:52,F:14,kcal:498}, snack:{name:'Popcorn',desc:'Air-popped popcorn with a sprinkle of sea salt — satisfying low-cal snack.',P:4,C:22,F:4,kcal:140} },
      Sunday:    { breakfast:{name:'Brunch Omelette',desc:'3-egg omelette with cheddar, mushrooms, and chives.',P:26,C:8,F:18,kcal:294}, lunch:{name:'Sunday Roast',desc:'Full traditional roast with all the trimmings — a weekly treat!',P:45,C:60,F:18,kcal:582}, dinner:{name:'Light Salad',desc:'Large mixed salad with grilled chicken, quinoa, and balsamic.',P:32,C:22,F:10,kcal:306}, snack:{name:'Cheese & Crackers',desc:'A small cheese board with whole grain crackers and grapes.',P:12,C:18,F:16,kcal:264} }
    }
  },

  'calisthenics': {
    name: 'Calisthenics Fuel', emoji: '🏆', color: 'purple',
    description: 'High-protein, performance-focused plan to power calisthenics skill development.',
    adjustment: +100,
    macros: { protein: 32, carbs: 48, fat: 20 },
    meals: {
      Monday:    { breakfast:{name:'Protein Power Oats',desc:'Oats with 2 scoops protein, mixed berries, and chia seeds.',P:45,C:55,F:12,kcal:508}, lunch:{name:'Tuna Rice Bowl',desc:'Brown rice with tuna, edamame, avocado, and sesame-ginger dressing.',P:48,C:52,F:14,kcal:530}, dinner:{name:'Chicken & Quinoa',desc:'Herb-grilled chicken breast over quinoa with roasted vegetables.',P:50,C:48,F:12,kcal:500}, snack:{name:'Peanut Butter Banana',desc:'Banana with 2 tbsp natural peanut butter for pre-workout fuel.',P:8,C:35,F:16,kcal:312} },
      Tuesday:   { breakfast:{name:'Egg Scramble',desc:'3 whole eggs scrambled with avocado, tomato, and whole grain toast.',P:28,C:36,F:22,kcal:452}, lunch:{name:'Chicken Burrito',desc:'Grilled chicken burrito with black beans, brown rice, and guacamole.',P:50,C:62,F:18,kcal:610}, dinner:{name:'Salmon & Asparagus',desc:'Baked salmon with roasted asparagus and sweet potato mash.',P:48,C:45,F:18,kcal:538}, snack:{name:'Protein Shake',desc:'Post-workout protein shake with milk and banana.',P:35,C:42,F:8,kcal:380} },
      Wednesday: { breakfast:{name:'Smoothie Bowl',desc:'Acai smoothie bowl with granola, banana, honey, and mixed seeds.',P:32,C:58,F:14,kcal:482}, lunch:{name:'Beef Rice Bowl',desc:'Lean ground beef with brown rice, broccoli, and soy-ginger sauce.',P:50,C:55,F:16,kcal:572}, dinner:{name:'Chicken Pasta',desc:'Grilled chicken with whole wheat pasta in tomato-basil sauce.',P:48,C:60,F:12,kcal:540}, snack:{name:'Greek Yogurt & Honey',desc:'Full-fat Greek yogurt with honey and mixed nuts.',P:20,C:25,F:12,kcal:284} },
      Thursday:  { breakfast:{name:'Protein Pancake Stack',desc:'Protein pancakes with syrup and fresh strawberries.',P:38,C:65,F:12,kcal:520}, lunch:{name:'Shrimp & Brown Rice',desc:'Stir-fried shrimp with brown rice, bok choy, and teriyaki.',P:42,C:58,F:10,kcal:490}, dinner:{name:'Turkey Meatballs',desc:'Lean turkey meatballs in marinara over whole wheat spaghetti.',P:50,C:62,F:14,kcal:578}, snack:{name:'Trail Mix',desc:'Nuts, seeds, and dried fruit mix for energy.',P:10,C:30,F:20,kcal:336} },
      Friday:    { breakfast:{name:'Big Egg Breakfast',desc:'4 eggs, turkey sausage, whole grain toast, and tomato.',P:42,C:36,F:20,kcal:488}, lunch:{name:'Chicken Caesar Wrap',desc:'Grilled chicken caesar wrap in whole wheat tortilla.',P:45,C:42,F:18,kcal:510}, dinner:{name:'Lean Steak Dinner',desc:'Lean sirloin with roasted vegetables and sweet potato.',P:52,C:48,F:18,kcal:562}, snack:{name:'Cottage Cheese',desc:'Cottage cheese with pineapple chunks — slow-release protein.',P:25,C:22,F:5,kcal:233} },
      Saturday:  { breakfast:{name:'Power Omelette',desc:'5-egg omelette with cheese, peppers, and mushrooms.',P:45,C:10,F:24,kcal:436}, lunch:{name:'Sushi Bowl',desc:'Salmon, tuna, avocado over sushi rice with pickled ginger.',P:48,C:65,F:16,kcal:592}, dinner:{name:'Chicken & Rice',desc:'Classic grilled chicken breast, steamed rice, and stir-fried greens.',P:52,C:60,F:14,kcal:572}, snack:{name:'Protein Bar',desc:'High-protein bar for a quick hit — aim for 25g+ protein.',P:25,C:25,F:9,kcal:281} },
      Sunday:    { breakfast:{name:'Recovery Breakfast',desc:'Overnight oats with protein, fruit, and nut butter.',P:35,C:60,F:16,kcal:528}, lunch:{name:'Batch Cook Bowl',desc:'Prepped chicken, quinoa, and roasted vegetables — meal prep for the week.',P:52,C:60,F:14,kcal:578}, dinner:{name:'Salmon Dinner',desc:'Pan-seared salmon with wild rice and steamed broccoli.',P:50,C:52,F:18,kcal:570}, snack:{name:'Milk & Banana',desc:'Glass of whole milk and a banana — perfect recovery snack.',P:12,C:38,F:8,kcal:276} }
    }
  },

  'height': {
    name: 'Height Optimizer', emoji: '📏', color: 'blue',
    description: 'Nutrition optimized for bone health, posture, and growth hormone support.',
    adjustment: 0,
    macros: { protein: 25, carbs: 50, fat: 25 },
    meals: {
      Monday:    { breakfast:{name:'Calcium Oatmeal',desc:'Oats made with full-fat milk, topped with almonds, seeds, and fruit.',P:20,C:55,F:14,kcal:430}, lunch:{name:'Grilled Fish & Veggies',desc:'Vitamin D-rich salmon with leafy greens and fortified whole grain bread.',P:40,C:38,F:14,kcal:434}, dinner:{name:'Chicken & Dairy',desc:'Grilled chicken with a glass of milk, cottage cheese, and mixed salad.',P:45,C:30,F:14,kcal:426}, snack:{name:'Milk & Banana',desc:'Full glass of whole milk and a banana.',P:10,C:32,F:6,kcal:218} },
      Tuesday:   { breakfast:{name:'Eggs & Whole Toast',desc:'3 boiled eggs with whole grain toast and a glass of orange juice (vitamin C for absorption).',P:24,C:38,F:14,kcal:374}, lunch:{name:'Tuna Salad',desc:'Tuna on dark leafy greens with olives, tomatoes, and feta cheese.',P:40,C:18,F:14,kcal:362}, dinner:{name:'Beef & Spinach',desc:'Lean beef with iron-rich spinach, brown rice, and roasted broccoli.',P:48,C:45,F:14,kcal:498}, snack:{name:'Yogurt & Seeds',desc:'Full-fat yogurt with pumpkin seeds and berries.',P:16,C:22,F:12,kcal:260} },
      Wednesday: { breakfast:{name:'Green Smoothie',desc:'Kale, banana, milk, protein, almond butter — a calcium powerhouse.',P:28,C:48,F:12,kcal:412}, lunch:{name:'Chicken & Broccoli',desc:'Vitamin-K-rich broccoli and chicken breast over quinoa.',P:45,C:42,F:10,kcal:438}, dinner:{name:'Salmon Dinner',desc:'Salmon (vitamin D) with sweet potato and steamed greens.',P:46,C:48,F:16,kcal:524}, snack:{name:'Cheese & Nuts',desc:'Calcium-rich cheese with a handful of zinc-rich nuts.',P:14,C:10,F:20,kcal:276} },
      Thursday:  { breakfast:{name:'Dairy Pancakes',desc:'Pancakes made with whole milk and eggs, topped with fruit and honey.',P:22,C:55,F:12,kcal:416}, lunch:{name:'Egg & Veggie Bowl',desc:'Boiled eggs over mixed greens with avocado and whole grain crackers.',P:28,C:30,F:18,kcal:390}, dinner:{name:'Roast Chicken',desc:'Protein-rich roast chicken with roasted vegetables and mashed potato (with milk).',P:48,C:50,F:14,kcal:530}, snack:{name:'Milk & Almonds',desc:'Warm milk with a small handful of almonds.',P:14,C:18,F:16,kcal:272} },
      Friday:    { breakfast:{name:'Fortified Cereal',desc:'Whole grain cereal with full-fat milk and sliced almonds.',P:18,C:52,F:10,kcal:370}, lunch:{name:'Sardine Toast',desc:'Sardines (calcium in bones!) on whole grain toast with avocado.',P:34,C:32,F:16,kcal:408}, dinner:{name:'Beef & Dairy',desc:'Lean beef stir-fry with milk-based sauce, brown rice, and greens.',P:50,C:52,F:16,kcal:556}, snack:{name:'Fruit & Yogurt',desc:'Mixed fruit with full-fat Greek yogurt.',P:14,C:28,F:6,kcal:222} },
      Saturday:  { breakfast:{name:'Full Milk Breakfast',desc:'3 eggs, whole grain toast, baked beans, and a large glass of milk.',P:32,C:48,F:14,kcal:446}, lunch:{name:'Tuna Rice Bowl',desc:'Tuna, brown rice, edamame, and leafy greens with sesame dressing.',P:44,C:52,F:12,kcal:488}, dinner:{name:'Chicken & Sweet Potato',desc:'Grilled chicken with sweet potato (vitamin A) and asparagus.',P:48,C:48,F:12,kcal:488}, snack:{name:'Cheese & Crackers',desc:'Calcium-rich cheddar with whole grain crackers.',P:12,C:20,F:14,kcal:254} },
      Sunday:    { breakfast:{name:'Egg Scramble & Milk',desc:'Scrambled eggs with spinach, mushrooms, and a glass of whole milk.',P:30,C:18,F:18,kcal:350}, lunch:{name:'Sunday Roast',desc:'Traditional roast with chicken, potatoes, and calcium-rich broccoli.',P:45,C:55,F:16,kcal:548}, dinner:{name:'Salmon & Veggies',desc:'Baked salmon with roasted mixed vegetables and couscous.',P:44,C:45,F:16,kcal:504}, snack:{name:'Bedtime Milk',desc:'Warm glass of whole milk before bed supports overnight recovery.',P:8,C:12,F:5,kcal:125} }
    }
  }
};

const DAYS_ORDER = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

const MEAL_TYPES = [
  { key:'breakfast', label:'Breakfast', emoji:'🌅' },
  { key:'lunch',     label:'Lunch',     emoji:'☀️' },
  { key:'dinner',    label:'Dinner',    emoji:'🌙' },
  { key:'snack',     label:'Snack',     emoji:'🍎' }
];
