set targets = E:\xampp\htdocs\pan2\backend

if exist %target% (
    echo dir is exist
    rd /s/q %target%
)

mkdir %target%



xcopy /s/d  .\backend %target%