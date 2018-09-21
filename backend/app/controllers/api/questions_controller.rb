class API::QuestionsController < ApplicationController
  before_action :set_question, only: [:show, :update, :destroy]

  def index
    @questions = Question.where('quiz_id = ?', params[:quiz_id]).order('number')
  end

  def show
  end

  def create
    @quiz = Quiz.find(params[:quiz_id])
    if current_user.id != @quiz.user.id
      render json: {error: "Must own the quiz to add a new question"}, status: :unprocessable_entity
    elsif @quiz.published
      render json: {error: "Cannot edit a published quiz"}, status: :unauthorized
    else
      @question = Question.new(text: question_params[:text], quiz_id: current_user.id)
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
    elsif @quiz.published
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
    elsif @quiz.published
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
    @question = Question.where('quiz_id = ?', params[:quiz_id]).find_by_number(params[:id]) || Question.find(params[:id])
    @quiz = @question.quiz
  end

end
