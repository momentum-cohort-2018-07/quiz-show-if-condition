Rails.application.routes.draw do
  namespace :api do
    resource :login, :controller=>"sessions", only: :create
    get 'profile', to: 'users#profile'
    get 'admin_profile', to: 'users#admin_profile'
    resources :users do
      resources :scores, only: [:index, :create]
    end
    resources :quizzes do
      post 'publish', to: 'quizzes#publish'
      resources :questions, only: [:create, :update, :show, :destroy] do
        resources :answers, only: [:create, :update, :show, :destroy]
        resources :responses, only: :create
      end
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
