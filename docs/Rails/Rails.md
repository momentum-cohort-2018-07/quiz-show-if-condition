# Modeles (References/Relationships)

  ## User

    * Has_many_quizzes
    * Has_many_questions
    * Has_many_scores
    * Has_many_responses

  ## Quiz

    * Belongs_to_User
    * Has_many_scores
    * Has_many_questions

  ## Question

    * Belongs_to_Quiz
    * Has_many_answers
    * Has_many_repsonses

  ## Answer

    * Belongs_to_User
    * Belongs_to_Question
  

  ## Response

    * Belongs_to_User
    * Belongs_to_Quiz
    * Belongs_to_Question
    * Belongs_to_Answer

  ## Score

    * Belongs_to_User
    * Belongs_to_Quiz
