#! /bin/bash
# git add to git push
git add .
echo "git add"
git commit -m "feat: update blogs"
echo "git commit"
sleep 5s
echo "sleep 5s for commit"
git push origin master
echo "git push"