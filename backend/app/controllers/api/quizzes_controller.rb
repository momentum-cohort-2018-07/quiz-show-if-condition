class API::QuizzesController < ApplicationController
  skip_before_action :verify_authentication, only: [:index]
  before_action :set_quiz, only: [:show, :update, :destroy, :publish]

  def index
    @quizzes = Quiz.where(published: true)
  end

  def published_quizzes
    @quizzes = Quiz.where(published: true, user_id: params[:user_id])
    render :index, location: api_quizzes_url
  end

  def unpublished_quizzes
    @quizzes = Quiz.where(published: false, user_id: params[:user_id])
    render :index, location: api_quizzes_url
  end

  def show
    if @quiz.published?
      @question_number = Response.where(user_id: current_user.id, quiz_id: @quiz.id).count + 1
      @question = Question.find_by!(quiz_id: @quiz.id, number:@question_number)
    else
      @question = Question.where(quiz_id:@quiz.id).first
    end
  end

  def create
    if !logged_in?
      render json: {error: "Must be logged in to create a quiz"}, status: :unauthorized
    elsif !current_user.admin? 
      render json: {error: "Must be an admin to create a quiz"}, status: :unauthorized
    else
      @quiz = Quiz.new(title: quiz_params[:title], user_id: current_user.id)
      if @quiz.save
        render :show, status: :created, location: api_quiz_url(@quiz)
      else
        render json: @quiz.errors, status: :unprocessable_entity
      end
    end
  end

  def update
    if current_user.id != @user.id
      render json: {error: "Must be the owner to update this quiz"}, status: :unauthorized
    else
      if @quiz.update(quiz_params)
        render :show, status: :updated, location: api_quiz_url(@quiz)
      else
        render json: @quiz.errors, status: :unprocessable_entity
      end
    end
  end

  def publish
    if current_user.id != @user.id
      render json: {error: "Must be the owner to publish this quiz"}, status: :unauthorized
    elsif Answer.where(question_id: Question.where(quiz_id: @quiz.id, correct: true)).length < @quiz.questions.count
      render json: {error: "All questions must have a correct answer before publishing"}, status: :unprocessable_entity
    elsif Answer.where(question_id: Question.where(quiz_id: @quiz.id, correct: true)).length > @quiz.questions.count
      render json: {error: "One of more questions have multiple correct answer. Please fix before publishing"}, status: :unprocessable_entity
    else
      if @quiz.update(published: true)
        @quiz.questions.sort_by(&:created_at).each_with_index do |question, index|
          question.update(number: index + 1)
        end
        render :show, status: :updated, location: api_quiz_url(@quiz)
      else
        render json: @quiz.errors, status: :unprocessable_entity
      end
    end
  end


  def destroy
    if current_user.id != @user.id
      render json: {error: "Must be the owner to delete this quiz"}, status: :unauthorized
    elsif @quiz.published?
      render json: {error: "Cannot delete a published quiz"}, status: :unauthorized
    else
      @quiz.destroy
    end
  end

  private

  def quiz_params
    params.permit(:title)
  end

  def set_quiz
    @quiz = Quiz.find(params[:id])
    @user = @quiz.user
  end

end
