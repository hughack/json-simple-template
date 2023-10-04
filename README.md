# JSON Config Injector GitHub Action

This action dynamically populates a JSON template with variables from a config JSON file.

## Inputs

- `config-file`: Path to the config JSON file.
- `template-file`: Path to the JSON template file.
- `output-file`: Path to the output JSON file.

## Example Usage

```yml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Use JSON Config Injector
      uses: hughack/json-simple-template@main
      with:
        config-file: 'path/to/config.json'
        template-file: 'path/to/template.json'
        output-file: 'path/to/output.json'
```

## Formatting the Template and Config Files

To utilize this action effectively, ensure that both the template and config files are formatted correctly.

### Template File

Your template file should resemble a standard JSON but with placeholders for the values you want to inject from the config file.

**Format:**
- **Placeholders** are denoted using a dollar sign `$` followed by the key name (e.g., `$name`, `$height`).

**Example:**
\```
{
  "name": $name,
  "height": $height,
  "info": {
    "age": $age
  }
}
\```

### Config File

The config file is a standard JSON file containing the actual values for the placeholders defined in the template file.

**Example:**
\```
{
  "name": "John Doe",
  "height": 180,
  "age": 30
}
\```

When the action runs with the above files, it will produce an output like:

\```
{
  "name": "John Doe",
  "height": 180,
  "info": {
    "age": 30
  }
}
\```
