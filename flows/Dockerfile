FROM flowiseai/flowise:latest
WORKDIR /data/flows
COPY . .
EXPOSE 3000
CMD ["flowise", "start", "--flows-dir", "/data/flows"]