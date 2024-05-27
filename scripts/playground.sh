# Simple Utility Function to build a wordpress Plugin

Deploy () {
  plugins=`find ./packages/wp-content/plugins -maxdepth 1 -mindepth 1 -type d`
  for plugin in $plugins; do
    BuildPLugin $plugin
  done
}

BuildPLugin () {
  pluginPath=$1
  pluginName=$(basename $pluginPath)
  callingDir=$(pwd)

  # ensure dist folder exists
  mkdir -p $callingDir/dist

  cd $pluginPath
  zip -r $pluginName.zip ./* -x \*.git\* \*.DS_Store\* \*.vscode\* \*.idea\* \*.gitignore\* \*.gitattributes\* \*.gitmodules\* \*.gitkeep \dist
  mv $pluginName.zip $callingDir/dist/
  cd $callingDir
}

Deploy
