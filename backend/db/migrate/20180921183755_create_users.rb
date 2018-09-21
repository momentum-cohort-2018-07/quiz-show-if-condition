class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :username
      t.string :password_digest
      t.string :token
      t.boolean :admin

      t.timestamps
    end
    add_index :users, :token, unique: true
  end
end
