# session-manager-to-ecs

🎨🎨🎨 Session Managerを使ってECSに接続してみる！  

[![ci](https://github.com/osawa-koki/session-manager-to-ecs/actions/workflows/ci.yml/badge.svg)](https://github.com/osawa-koki/session-manager-to-ecs/actions/workflows/ci.yml)
[![cd](https://github.com/osawa-koki/session-manager-to-ecs/actions/workflows/cd.yml/badge.svg)](https://github.com/osawa-koki/session-manager-to-ecs/actions/workflows/cd.yml)
[![Dependabot Updates](https://github.com/osawa-koki/session-manager-to-ecs/actions/workflows/dependabot/dependabot-updates/badge.svg)](https://github.com/osawa-koki/session-manager-to-ecs/actions/workflows/dependabot/dependabot-updates)

![成果物](./fruit.gif)  

## 実行方法

`.env.example`をコピーして`.env`ファイルを作成します。  
中身を適切に設定してください。  

DevContainerに入り、以下のコマンドを実行します。  
※ `~/.aws/credentials`にAWSの認証情報があることを前提とします。  

```shell
cdk bootstrap
cdk synth
cdk deploy --require-approval never --all
```

---

GitHub Actionsでデプロイするためには、以下のシークレットを設定してください。  

| シークレット名 | 説明 |
| --- | --- |
| AWS_ACCESS_KEY_ID | AWSのアクセスキーID |
| AWS_SECRET_ACCESS_KEY | AWSのシークレットアクセスキー |
| AWS_REGION | AWSのリージョン |
| DOTENV | `.env`ファイルの内容 |

タグをプッシュすると、GitHub Actionsがデプロイを行います。  
手動でトリガーすることも可能です。  

## デプロイ後の確認方法

まずは、プラグインをインストールします。  

```shell
# MacOSの場合
brew install aws-session-manager-plugin

# Linuxの場合 (arm64)
curl "https://s3.amazonaws.com/session-manager-downloads/plugin/latest/ubuntu_arm64/session-manager-plugin.deb" -o "session-manager-plugin.deb"
dpkg -i session-manager-plugin.deb
rm session-manager-plugin.deb

# Linuxの場合 (x86_64)
curl "https://s3.amazonaws.com/session-manager-downloads/plugin/latest/ubuntu_64bit/session-manager-plugin.deb" -o "session-manager-plugin.deb"
dpkg -i session-manager-plugin.deb
rm session-manager-plugin.deb
```

以下のコマンドでECSに接続します。  

```shell
./connect.sh
```
