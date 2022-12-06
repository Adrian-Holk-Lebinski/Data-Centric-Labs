git add .
set /P msg="Commit Message: "
git commit -m "%msg%"
git push
set /P stall=""