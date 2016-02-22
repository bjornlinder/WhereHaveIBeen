Rails.application.routes.draw do
  devise_for :users, controllers: { registrations: 'accounts' }

  root 'welcome#index'
  post 'user-apps-callback' => 'apps#user_apps_callback'
  get 'apps' => 'apps#index'
end
