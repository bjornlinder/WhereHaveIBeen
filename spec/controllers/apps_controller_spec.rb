require 'rails_helper'

describe AppsController do

  describe '#index' do
    let(:user) { create(:user) }

    context 'when user is not signed in' do
      before do
        allow(controller).to receive(:current_user) { nil }
        get :index
      end

      it { should redirect_to :root }
    end

    context 'when user checked_apps is true' do
      before do
        user = create(:user, checked_apps: true)
        allow(controller).to receive(:current_user) { user }
        get :index
      end

      it { should render_template :index }
    end

    context 'when user checked_apps is false' do
      before do
        allow(controller).to receive(:current_user) { user }
        get :index
      end

      it { should render_template :check_apps }
    end
  end

  describe '#user_apps_callback' do
    before do
      user = create(:user)
      app1 = create(:app, name: 'bob', url: 'http://bob.com/images/topline-logo.jpg')
      app2 = create(:app, name: 'pandora', url: 'http://www.pandora.com/img/pandora-logo-splash-538x110.png')

      allow(controller).to receive(:current_user) { user }
      get :user_apps_callback, apps: "[[\"#{app1.name}\",\"#{app1.url}\"],[\"#{app2.name}\",\"#{app2.url}\"]]"
    end

    it 'creates associations for apps with the current user' do
      expect(User.last.apps.last).to be_present
    end
  end
end
