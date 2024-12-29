-- Seed data for quizzes and questions
DO $$
DECLARE
  quiz_id uuid;
  user_id uuid := '786906cc-1c87-4999-b7b2-204bdd4ae8a2'; -- This will be replaced with actual user ID
BEGIN
  -- Biology 1 Quiz
  INSERT INTO quizzes (title, description, created_by)
  VALUES (
    'Biology 1: Basics of Plants and Animals',
    'Learn about plants and animals in this beginner-level quiz',
    user_id
  ) RETURNING id INTO quiz_id;

  INSERT INTO questions (quiz_id, question, options, correct_answer)
  VALUES
    (
      quiz_id,
      'What do plants use to make their food?',
      '["Sunlight", "Water", "Soil", "Air"]'::jsonb,
      'Sunlight'
    ),
    (
      quiz_id,
      'Which part of the plant is responsible for photosynthesis?',
      '["Roots", "Stem", "Leaves", "Flowers"]'::jsonb,
      'Leaves'
    ),
    (
      quiz_id,
      'Which animal is known as the king of the jungle?',
      '["Elephant", "Tiger", "Lion", "Giraffe"]'::jsonb,
      'Lion'
    ),
    (
      quiz_id,
      'What do fish use to breathe underwater?',
      '["Nose", "Gills", "Fins", "Lungs"]'::jsonb,
      'Gills'
    ),
    (
      quiz_id,
      'What is the main source of energy for most living things?',
      '["Water", "Air", "Sun", "Food"]'::jsonb,
      'Sun'
    ),
    (
      quiz_id,
      'Which animal lays eggs?',
      '["Dog", "Frog", "Cow", "Cat"]'::jsonb,
      'Frog'
    ),
    (
      quiz_id,
      'What do bees collect from flowers?',
      '["Water", "Honey", "Pollen", "Soil"]'::jsonb,
      'Pollen'
    ),
    (
      quiz_id,
      'Which part of the body do birds use to fly?',
      '["Beak", "Tail", "Wings", "Feet"]'::jsonb,
      'Wings'
    ),
    (
      quiz_id,
      'What do cows eat?',
      '["Fish", "Grass", "Grains", "Meat"]'::jsonb,
      'Grass'
    ),
    (
      quiz_id,
      'Which of these animals lives in water?',
      '["Dog", "Dolphin", "Cat", "Horse"]'::jsonb,
      'Dolphin'
    );

  -- Biology 2 Quiz
  INSERT INTO quizzes (title, description, created_by)
  VALUES (
    'Biology 2: Human Body and Ecosystems',
    'Learn about the human body and ecosystems in this beginner-level quiz',
    user_id
  ) RETURNING id INTO quiz_id;

  INSERT INTO questions (quiz_id, question, options, correct_answer)
  VALUES
    (
      quiz_id,
      'Which organ pumps blood through the body?',
      '["Brain", "Heart", "Lungs", "Stomach"]'::jsonb,
      'Heart'
    ),
    (
      quiz_id,
      'What is the main function of the lungs?',
      '["To digest food", "To filter blood", "To help us breathe", "To move muscles"]'::jsonb,
      'To help us breathe'
    ),
    (
      quiz_id,
      'Which organ helps in digestion?',
      '["Liver", "Brain", "Heart", "Lungs"]'::jsonb,
      'Liver'
    ),
    (
      quiz_id,
      'What are animals that eat only plants called?',
      '["Herbivores", "Carnivores", "Omnivores", "Insectivores"]'::jsonb,
      'Herbivores'
    ),
    (
      quiz_id,
      'What is the smallest unit of life?',
      '["Tissue", "Organ", "Cell", "Atom"]'::jsonb,
      'Cell'
    ),
    (
      quiz_id,
      'What do we call a group of animals that live together?',
      '["Herd", "School", "Pack", "All of the above"]'::jsonb,
      'All of the above'
    ),
    (
      quiz_id,
      'What is the function of roots in a plant?',
      '["To make food", "To absorb water", "To provide shade", "To attract insects"]'::jsonb,
      'To absorb water'
    ),
    (
      quiz_id,
      'What is the term for animals that can live on land and in water?',
      '["Mammals", "Reptiles", "Amphibians", "Birds"]'::jsonb,
      'Amphibians'
    ),
    (
      quiz_id,
      'What do we call a scientist who studies the environment?',
      '["Botanist", "Zoologist", "Ecologist", "Geologist"]'::jsonb,
      'Ecologist'
    ),
    (
      quiz_id,
      'What is the process by which plants make their food called?',
      '["Respiration", "Photosynthesis", "Digestion", "Fermentation"]'::jsonb,
      'Photosynthesis'
    );

END $$;