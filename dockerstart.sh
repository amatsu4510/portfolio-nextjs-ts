#!/bin/bash

# 1. モード判定（先に判定して、不正な引数なら何もしない）
if [ "$1" = "P" ]; then
    FILE="compose.prod.yaml"
    MODE="Production"
elif [ "$1" = "D" ]; then
    FILE="compose.yaml"
    MODE="Development"
else
    echo "Usage: ./dockerstart.sh [P|D]"
    echo "P: Production mode"
    echo "D: Development mode"
    exit 1
fi

echo "Starting in $MODE mode..."

# 2. 賢く「付け替え」を実行
# downせずにup --buildすることで、停止時間を最小限にします。
# --remove-orphans で、不要になった古いコンテナも自動削除。
docker compose -f $FILE up --build -d --remove-orphans

# 3. 掃除（ビルドに使われなかった古い残骸イメージのみを削除）
# -a を外すことで、現在使っていない「ゴミ」だけを消し、
# 次回のビルドに使えるキャッシュは残します（これで次回以降が速くなります）。
docker image prune -f

echo "Done!"