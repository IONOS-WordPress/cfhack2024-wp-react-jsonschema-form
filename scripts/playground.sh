# Simple Utility Function to build a wordpress Plugin

Deploy () {
  # ensure that pnpm has installed all dependencies and built all plugins
  pnpm install
  pnpm build

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
  zip -r $pluginName.zip ./* -x \*src\ -x \*node_modules\
  mv $pluginName.zip $callingDir/dist/
  cd $callingDir
}

Deploy
