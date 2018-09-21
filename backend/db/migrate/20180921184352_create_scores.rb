class CreateScores < ActiveRecord::Migration[5.2]
  def change
    create_table :scores do |t|
      t.references :user, foreign_key: true
      t.references :quiz, foreign_key: true
      t.integer :number_correct
      t.integer :number_asked

      t.timestamps
    end
  end
end
