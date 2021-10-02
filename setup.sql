DROP TABLE IF EXISTS memo;

/* --- Create memo table --- */
CREATE TABLE memo
(
    content TEXT NOT NULL
);

INSERT INTO memo
VALUES ('晩ご飯のレシピ
カレー
豚肉
じゃがいも
人参
タマネギ
カレールー'),
       ('今日の日記'),
       ('メモ1');
