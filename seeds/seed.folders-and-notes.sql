INSERT INTO folders ("name")
VALUES
  ('Folder One'),
  ('Folder Two'),
  ('Folder Three')
;

INSERT INTO notes ("name", content, folder_id)
VALUES
  ('Note One', 'An impactful note', 1),
  ('Note Two', 'Welcome to the next episode', 1),
  ('Note Three', 'Foo bar baz and some other stuff', 2)
;