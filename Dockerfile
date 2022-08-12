FROM denoland/deno:ubuntu

EXPOSE 1993

WORKDIR /code

USER deno

COPY ./dependencies/deps.ts ./dependencies/

RUN deno cache ./dependencies/deps.ts

ADD . .

RUN deno cache main.ts


CMD ["run", "--allow-net", "main.ts"]
