Rails.application.routes.draw do
  resources :bids
  resources :contacts
  resources :subcontractors
  resources :cost_codes
  resources :divisions
  resources :budget_items
  resources :budgets, only: [:create, :destroy]
  resources :user_projects, only: [:create, :update, :destroy]
  resources :projects
  resources :users, except: [:update, :destroy]
  resources :companies, only: [:index, :create, :show]

  get '/authorized_user', to: 'users#show'
  get '/user_company', to: 'companies#show'

  post '/login', to: 'sessions#login'
  delete '/logout', to: 'sessions#logout'
  

  get '*path',
  to: 'fallback#index',
  constraints: ->(req) { !req.xhr? && req.format.html? }
end
