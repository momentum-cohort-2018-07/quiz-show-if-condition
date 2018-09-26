class API::QuestionsController < ApplicationController
  before_action :set_question

  def index
    if @quiz.published?
      @questions = Question.where(quiz_id: @quiz.id).order(:number)
    else
      @questions = Question.where(quiz_id: @quiz.id).order(:id)
    end
  end

  def show
  end

  def create
    if current_user.id != @quiz.user.id
      render json: {error: "Must own the quiz to add a new question"}, status: :unprocessable_entity
    elsif @quiz.published?
      render json: {error: "Cannot edit a published quiz"}, status: :unauthorized
    else
      @question = Question.new(text: question_params[:text], quiz_id: @quiz.id)
      if @question.save
        render :show, status: :created, location: api_quiz_question_url(@quiz, @question.id)
      else
        render json: @question.errors, status: :unprocessable_entity
      end
    end
  end

  def update
    if current_user.id != @quiz.user.id
      render json: {error: "Must be the owner to update this quiz"}, status: :unauthorized
    elsif @quiz.published?
      render json: {error: "Cannot edit a published quiz"}, status: :unauthorized
    else
      if @question.update(question_params)
        render :show, status: :updated, location: api_quiz_question_url(@quiz, @question.id)
      else
        render json: @quiz.errors, status: :unprocessable_entity
      end
    end
  end

  def destroy
    if current_user.id != @quiz.user.id
      render json: {error: "Must be the quiz owner to delete a question"}
    elsif @quiz.published?
      render json: {error: "Cannot edit a published quiz"}, status: :unauthorized
    else
      @question.destroy
      render json: @user.questions
    end
  end

  private

  def question_params
    params.permit(:text)
  end

  def set_question
    @quiz = Quiz.find(params[:quiz_id])
    if params.key?(:id)
      @question = Question.find_by(quiz_id: @quiz.id, number: params[:id]) || Question.find_by(quiz_id: @quiz.id, id: params[:id])
    end
  end
end
