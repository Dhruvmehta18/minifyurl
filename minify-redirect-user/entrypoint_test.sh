#!/bin/bash

cd /usr/src/
cp -r /cache/node_modules/ /node-app/node_modules/
exec yarn test