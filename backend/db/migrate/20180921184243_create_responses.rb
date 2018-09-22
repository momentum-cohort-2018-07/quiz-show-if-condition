class CreateResponses < ActiveRecord::Migration[5.2]
  def change
    create_table :responses do |t|
      t.references :user, foreign_key: true
      t.references :quiz, foreign_key: true
      t.references :question, foreign_key: true
      t.references :answer, foreign_key: true
      t.boolean :correct

      t.timestamps
    end
  end
end
