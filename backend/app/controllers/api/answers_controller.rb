class API::AnswersController < ApplicationController
  before_action :set_answer

  def index
    @answers = Answer.where("question_id=?", @question.id)
  end

  def show
  end

  def create
    if current_user.id != @quiz.user.id
      render json: {error: "Must own the quiz to add a new answer"}, status: :unprocessable_entity
    elsif @quiz.published
      render json: {error: "Cannot edit a published quiz"}, status: :unauthorized
    elsif answer_params.key?(:correct) && answer_params[:correct]
      @correct_answer = Answer.where("question_id=?", params[:question_id]).where('correct = ?', true)[0]
      if !@correct_answer.nil?
        render json: {error: "Cannot mark more than one answer correct"}, status: :unauthorized
      end
    else
      @answer = Answer.new({question_id: @question.id}.merge(answer_params))
      if @answer.save
        render :show, status: :created, location: api_quiz_question_answer_url(@quiz, @question, @answer)
      else
        render json: @answer.errors, status: :unprocessable_entity
      end
    end
  end

  def update
    if current_user.id != @quiz.user.id
      render json: {error: "Must be the quiz owner to update a question"}
    elsif @quiz.published
      render json: {error: "Cannot edit a published quiz"}, status: :unauthorized
    elsif answer_params.key?(:correct) && answer_params[:correct]
      @correct_answer = Answer.where("question_id=?", params[:question_id]).where('correct = ?', true)[0]
      if @correct_answer && @correct_answer.id != @answer.id
        render json: {error: "Cannot mark more than one answer correct"}, status: :unauthorized
      end
    else
      if @answer.update({question_id: @question.id}.merge(answer_params))
        render :show, status: :ok, location: api_quiz_question_answer_url(@quiz, @question, @answer)
      else
        render json: @answer.errors, status: :unprocessable_entity
      end
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
    @quiz = Quiz.find(params[:quiz_id])
    @question = Question.where('quiz_id = ?', @quiz.id).find_by_number(params[:question_id])
    @question ||= Question.where('quiz_id = ?', @quiz.id).find(params[:question_id])
    @answer = Answer.where('question_id = ?', @question.id).find(params[:id]) if params.key?(:id)
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def answer_params
    params.permit(:text, :correct)
  end
end
