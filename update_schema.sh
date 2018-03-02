#!/bin/bash
# Make sure to install apollo-codegen: `npm install -g apollo-codegen`

apollo-codegen introspect-schema http://localhost:3000/graphql --output schema.json
apollo-codegen generate src/app/core/graphql.ts --schema schema.json --target typescript --output src/app/core/graphql-generated.ts