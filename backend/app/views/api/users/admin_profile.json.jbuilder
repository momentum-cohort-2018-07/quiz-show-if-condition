json.links do
  json.self api_user_path(@user)
  json.list api_users_path
  json.update do
    json.method "PUT"
    json.href api_user_path(@user)
  end
  json.delete do
    json.method "DELETE"
    json.href api_user_path(@user)
  end
end
json.data do
  json.id @user.id
  json.attributes do
    json.username @user.username
    json.token @user.token
    json.admin @user.admin
  end
end