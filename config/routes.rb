Rails.application.routes.draw do
  
  devise_for :users
  #get 'persons/profile'
  #get 'persons/profile', as: 'users_root'
  resources :articles do
    resources :comments
  end
  root 'welcome#index'

end
