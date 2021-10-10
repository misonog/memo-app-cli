# Memo App CLI

これは[メモアプリコマンドライン版](https://bootcamp.fjord.jp/pages/238) の課題提出用リポジトリです。

## セットアップ

```shell
$ sqlite3 :memo_app.db: < setup.sql
```

## 使い方

```shell
# メモの追加
$ echo 'メモの内容' | ./main.js

# 一覧表示
$ ./main.js -l

# 参照（選択したメモの全文が表示される）
$ ./main.js -r
#? Choose a note you want to see: …
#▸ 晩ご飯のレシピ
#  今日の日記
#  メモ1

# 削除（選択したメモが削除される）
$ .main.js -d
#? Choose a note you want to delete: …
#▸ 晩ご飯のレシピ
#  今日の日記
#  メモ1
```
