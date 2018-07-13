@echo on
set target=E:\XAMPP\htdocs\pan2\backend

if exist %target% (
    echo dir is exist
    rd /s/q %target%
)

mkdir %target%

xcopy /s/d  .\backend %target%

