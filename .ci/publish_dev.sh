#!/bin/bash
echo "\
always-auth=true
registry=https://packagecloud.io/rrooij/development/npm/
//packagecloud.io/rrooij/development/npm/:_authToken=$PACKAGECLOUD_TOKEN
" > $TRAVIS_BUILD_DIR/.npmrc
VERSION=$(cat package.json | jq '.version' | sed 's/"//g')
package_cloud yank rrooij/development/node "@terminusdb/terminusdb-react-graph-$VERSION.tgz"
npm publish
