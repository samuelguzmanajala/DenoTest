FROM denoland/deno:ubuntu

EXPOSE 1993

WORKDIR /code

USER deno

COPY src/dependencies/deps.ts ./dependencies/

CMD ["run", "--allow-net", "main.ts"]
