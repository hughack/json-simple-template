# JSON Template Populator Action

A GitHub Action that populates JSON templates with configuration values. Ideal for setting up distinct environments, such as development and production, for cloud-hosted applications.

## How It Works

- Define a JSON template with placeholders marked as `$variableName` for single value replacements, or use backtick strings with `${variableName}` for in-string replacements.
- Supply a configuration JSON file containing values for these placeholders.
- The action will output a new JSON file with all placeholders replaced by the corresponding values from the configuration.

## Usage

Include the action in your workflow configuration:

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2

    - name: Populate JSON Template
      uses: hughack/json-simple-template@v0.2.0
      with:
        config-file: 'path/to/config.json'
        template-file: 'path/to/template.json'
        output-file: 'path/to/output.json'
```

## Environment-Based Examples

Assuming a web application needs different configurations for its development and production cloud environments.

**Template File (`template.json`):**
```json
{
  "databaseEndpoint": $dbEndpoint,
  "assetsDomain": `https://${assetDomain}`,
  "loggingLevel": $logLevel,
  "cache": {
    "type": $cacheType,
    "duration": $cacheDuration
  }
}
```

### Development Config (`dev-config.json`):
```json
{
  "dbEndpoint": "https://dev-db.mysite.cloud",
  "assetDomain": "dev-assets.mysite.cloud",
  "logLevel": "verbose",
  "cacheType": "memory",
  "cacheDuration": 3600
}
```

### Production Config (`prod-config.json`):
```json
{
  "dbEndpoint": "https://db.mysite.cloud",
  "assetDomain": "assets.mysite.cloud",
  "logLevel": "error",
  "cacheType": "redis",
  "cacheDuration": 86400
}
```

**Output for Development:**
```json
{
  "databaseEndpoint": "https://dev-db.mysite.cloud",
  "assetsDomain": "https://dev-assets.mysite.cloud",
  "loggingLevel": "verbose",
  "cache": {
    "type": "memory",
    "duration": 3600
  }
}
```

**Output for Production:**
```json
{
  "databaseEndpoint": "https://db.mysite.cloud",
  "assetsDomain": "https://assets.mysite.cloud",
  "loggingLevel": "error",
  "cache": {
    "type": "redis",
    "duration": 86400
  }
}
```