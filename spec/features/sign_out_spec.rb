require 'rails_helper'

feature 'user signs out' do
  context 'as an authenticated user' do
    let(:user) { FactoryGirl.create(:user) }

    before :each do
      sign_in_as(user)
    end

    scenario 'User signs out' do
      click_link 'Sign out'
      expect(page).to have_content('Log in')
    end
  end
end
