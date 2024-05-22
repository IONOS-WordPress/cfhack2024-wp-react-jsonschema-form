# Simple Utility Function to build a wordpress Plugin

Deploy () {
  plugins=`find ./packages/wp-content/plugins -maxdepth 1 -mindepth 1 -type d`
  for plugin in $plugins; do
    BuildPLugin $plugin
  done
}

BuildPLugin () {
  pluginPath=$1
  DistFolder="./dist"
  pluginName=$(basename $pluginPath)

  printf "Building Plugin: $pluginName\n"
  # ensure the dist folder exists
  mkdir -p $DistFolder

  # Zip the plugin folder
  zip -r -q $DistFolder/${pluginName}.zip $pluginPath
}

Deploy
