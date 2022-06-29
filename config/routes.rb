Rails.application.routes.draw do
  resources :users, except: [:update, :destroy]
  resources :companies, only: [:index, :create]


  post '/login', to: 'sessions#login'
  delete '/logout', to: 'sessions#logout'
  

  get '*path',
  to: 'fallback#index',
  constraints: ->(req) { !req.xhr? && req.format.html? }
end
