class API::ResponsesController < ApplicationController
  def create
    @quiz = Quiz.find(params[:quiz_id])
    @question = Question.where('quiz_id = ?', @quiz.id).find_by_number(params[:question_id])
    @question ||= Question.where('quiz_id = ?', @quiz.id).find(params[:question_id])
    @correct_answer = Answer.where("question_id=?", @question.id).where('correct = ?', true)[0]
    @submitted_answer = Answer.where({question_id: @question.id, id: answer_params[:answer_id]})[0]
    @previous_response = Response.where({user_id: current_user.id, quiz_id: @quiz.id, question_id: @question.id})[0]
    if !@quiz.published
      render json: {error: "Cannot take an unpublished quiz"}, status: :unauthorized
    elsif @previous_response
      render json: {error: "Cannot answer the same question twice"}, status: :unauthorized
    elsif !@submitted_answer
      render json: {error: "Must submit a valid answer the question"}, status: :unprocessable_entity
    else
      @response = Response.new({user_id: current_user.id, question_id: @question.id, quiz_id: @quiz.id, correct: @correct_answer.id == answer_params[:answer_id]}.merge(answer_params))
      if @response.save
        render json: @response, status: :created
      else
        render json: @response.errors, status: :unprocessable_entity
      end
    end
  end

  private

  def answer_params
    params.permit(:answer_id)
  end
end
