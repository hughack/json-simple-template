const fs = require('fs');
const core = require('@actions/core');

try {
  const configFile = core.getInput('config-file');
  const templateFile = core.getInput('template-file');
  const outputFile = core.getInput('output-file');

  const config = JSON.parse(fs.readFileSync(configFile, 'utf8'));
  const templateStr = fs.readFileSync(templateFile, 'utf8');

  // Convert template to valid JSON by replacing placeholders with actual values
  const populatedStr = templateStr.replace(/\$(\w+)/g, (_, key) => {
    const replacement = config[key];
    return typeof replacement === 'string' ? `"${replacement}"` : replacement;
  });

  // Parse the result to a JSON object
  const outputJson = JSON.parse(populatedStr);

  fs.writeFileSync(outputFile, JSON.stringify(outputJson, null, 2));
} catch (error) {
  core.setFailed(error.message);
}
