#!/bin/bash -e
mkdir abis
for f in deployments/*.json
do
    FILENAME=`basename $f`
	../node_modules/node-jq/bin/jq .abi deployments/$FILENAME > abis/$FILENAME
done

