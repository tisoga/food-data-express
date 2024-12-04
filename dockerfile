###################
# BUILD FOR PRODUCTION
###################

FROM node:18 As build

WORKDIR /app

COPY --chown=node:node . .

RUN yarn install --frozen-lockfile


USER node

###################
# PRODUCTION
###################

# Not Natively support ARM64 (M1)
FROM alpine:3.17 As production

ENV PORT=8080


WORKDIR /app
COPY --chown=node:node package.json .
COPY --chown=node:node prisma ./prisma/
COPY --chown=node:node . .

RUN apk add --update nodejs
RUN apk add --update \
    curl \
    openssl1.1-compat \
    npm \
    # npx will look the local node_modules first, if not it will install globally
    # Ref: https://stackoverflow.com/questions/22420564/install-only-one-package-from-package-json
    && PRISMA_CLIENT_VERSION=$(node -pe "require('./package').dependencies['@prisma/client']") \
    && PRISMA_VERSION=$(node -pe "require('./package').dependencies['prisma']") \

    && npm install @prisma/client@$PRISMA_CLIENT_VERSION \
    && npm install -D prisma@$PRISMA_VERSION \
    && npm install --global yarn \

    # Prepare prisma library
    # If we don't have package.json, prisma will create for you, and create a local node_modules
    && npx prisma generate \
    # Prune non-used files
    && npm prune --production \
    # Clean Prisma non-used files https://github.com/prisma/prisma/issues/11577
    && rm -rf node_modules/.cache/ \
    && rm -rf node_modules/@prisma/engines/ \
    && rm -rf node_modules/@prisma/engines-version \
    && rm -rf node_modules/prisma \
    # Remove cache
    && rm -rf /root/.cache/ \
    && rm -rf /root/.npm/ \
    # Remove all unused dependecies
    && apk del openssl1.1-compat npm curl

EXPOSE ${PORT}

# Create a group and user
RUN addgroup -g 1000 node \
    && adduser -u 1000 -G node -s /bin/sh -D node

USER node

CMD [ "yarn", "dev" ]
