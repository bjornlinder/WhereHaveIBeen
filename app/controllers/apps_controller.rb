class AppsController < ApplicationController
  def index
    redirect_to root_path && return if !current_user

    if current_user.checked_apps
      @visited_apps = current_user.apps
      @unvisited_apps = App.where('id NOT IN (SELECT app_id FROM apps_users WHERE user_id = ?)', current_user.id)
    else
      @apps = App.pluck(:name, :url)
      render 'check_apps'
    end
  end

  def user_apps_callback
    if !current_user.checked_apps
      visited_apps = JSON.parse(params['apps'])

      visited_apps.each do |app|
        AppsUser.create(user: current_user, app: App.where(name: app).first)
      end
      current_user.update(checked_apps: true)
    end

    redirect_to action: "index"
  end
end
