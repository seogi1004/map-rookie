# Map Rookie

## Deployment

### Installation

```bash
brew tap heroku/brew && brew install heroku
heroku login
```

### Check

```bash
heroku ps:scale web=1
heroku open
```

### Logging

```bash
heroku logs --tail
```
