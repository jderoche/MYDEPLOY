rmdir /Q /S CCodeParser
del /Q RunTest.xml
echo off
echo " ______________________________________"
echo "| E2CAD AUTO DEPLOY TOOLS SYSTEM v1.00 |"
echo "| Node JS v8.9.4                       |"
echo "|______________________________________|"
echo ""
git clone https://github.com/jderoche/CCodeParser.git
cd CCodeParser
build.bat
echo off
echo ""
echo " _______________________________"
echo "|                               |"
echo "| Build And Test Finished....   |"
echo "|_______________________________|"

