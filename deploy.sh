#! /bin/bash
# git add to git push
echo "git add"
git add .
echo "git commit"
git commit -m "feat: update blogs"
echo "sleep 5s for commit"
sleep 5s
git push origin master
echo "it's done for git push"