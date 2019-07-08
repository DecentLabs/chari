#!/bin/bash -e
mkdir shared/abis
cd deployments
for f in *.json
do
	jq .abi $f > ../shared/abis/$f
done

