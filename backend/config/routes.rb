Rails.application.routes.draw do
  namespace :api do
    resource :login, :controller=>"sessions", only: :create
    get 'profile', to: 'users#profile'
    get 'admin_profile', to: 'users#admin_profile'
    resources :users do
      get 'published_quizzes', to: 'quizzes#published_quizzes'
      get 'unpublished_quizzes', to: 'quizzes#unpublished_quizzes'
    end
    resources :quizzes do
      post 'publish', to: 'quizzes#publish'
      post 'score', to: 'scores#create'
      resources :questions, only: [:index, :create, :update, :show, :destroy] do
        resources :answers, only: [:index, :create, :update, :show, :destroy]
        resources :responses, only: :create
      end
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
