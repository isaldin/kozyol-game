## Test actions locallyasdfasdfasdf

We use `act` for testing GitHub Actions.

https://github.com/nektos/act

### If you are using `actions/upload-artifact` or `actions/cache`
Run artifacts mock server:

`docker-compose -f .github/artifact-server-docker-compose.yml up`

in separate terminal from project root.

Also add this to `~/.actrc`:
```
--env ACTIONS_CACHE_URL=http://localhost:8080/
--env ACTIONS_RUNTIME_URL=http://localhost:8080/
--env ACTIONS_RUNTIME_TOKEN=foo
```
