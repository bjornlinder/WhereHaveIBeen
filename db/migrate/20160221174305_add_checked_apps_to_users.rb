class AddCheckedAppsToUsers < ActiveRecord::Migration
  def change
    add_column :users, :checked_apps, :boolean, default: false
  end
end
