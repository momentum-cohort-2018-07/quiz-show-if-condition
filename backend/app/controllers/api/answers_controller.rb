class API::AnswersController < ApplicationController
  before_action :set_answer, only: [:show, :update, :destroy]

  def index
    @answers = Answer.where("question_id=?", params[:question_id])
  end

  def show
  end

  def create
    @quiz = Quiz.find(params[:quiz_id])
    @question = Question.find(params[:question_id])
    if current_user.id != @quiz.user.id
      render json: {error: "Must own the quiz to add a new question"}, status: :unprocessable_entity
    elsif @quiz.published
      render json: {error: "Cannot edit a published quiz"}, status: :unauthorized
    else
      @answer = Answer.new(answer_params)
      if @answer.save
        render :show, status: :created, location: api_quiz_question_answer_url(@quiz, @question, @answer)
      else
        render json: @answer.errors, status: :unprocessable_entity
      end
    end
  end

  def update
    if answer_params.key?(:correct) && answer_params[:correct]
      @correct_answer = Answer.where("question_id=?", params[:question_id]).where('correct = ?', true)[0]
      if @correct_answer && @correct_answer.id != @answer.id
        render json: {error: "Cannot mark more than one answer correct"}, status: :unauthorized
      end
    end

    if @answer.update(answer_params)
      render :show, status: :ok, location: api_quiz_question_answer_url(@quiz, @question, @answer)
    else
      render json: @answer.errors, status: :unprocessable_entity
    end
  end

  def destroy
    if current_user.id != @quiz.user.id
      render json: {error: "Must be the quiz owner to delete a question"}
    elsif @quiz.published
      render json: {error: "Cannot edit a published quiz"}, status: :unauthorized      
    else
      @answer.destroy
      head :no_content
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_answer
    @answer = Answer.find(params[:id])
    @question = @answer.question
    @quiz = @question.quiz
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def answer_params
    params.permit(:text, :correct)
  end
end
