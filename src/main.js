const fs = require('fs');
const core = require('@actions/core');

function interpolateTemplateString(str, config) {
  return str.replace(/\$\{(\w+)\}/g, (_, key) => config[key] !== undefined ? config[key] : `$\{${key}\}`);
}

function populateTemplate(configFile, templateFile, outputFile) {
  const config = JSON.parse(fs.readFileSync(configFile, 'utf8'));
  const templateStr = fs.readFileSync(templateFile, 'utf8');

  // Convert template to valid JSON by replacing placeholders with actual values
  const populatedStr = templateStr.replace(/`([^`]+)`/g, (_, innerStr) => {
    const interpolated = interpolateTemplateString(innerStr, config);
    return JSON.stringify(interpolated);
}).replace(/(?<!")\$(\w+)(?!")/g, (_, key) => {
    const replacement = config[key];
    if (replacement === undefined) {
        return "$" + key;  // keep the placeholder if key not found in config
    }
    return JSON.stringify(replacement);
});



  // Parse the result to a JSON object
  const outputJson = JSON.parse(populatedStr);

  fs.writeFileSync(outputFile, JSON.stringify(outputJson, null, 2));
  return outputJson;
}


// The code below runs when the action is executed, but doesn't run during testing
if (require.main === module) {
  try {
    const configFile = core.getInput('config-file');
    const templateFile = core.getInput('template-file');
    const outputFile = core.getInput('output-file');
    populateTemplate(configFile, templateFile, outputFile);
  } catch (error) {
    core.setFailed(error.message);
  }
}

module.exports = populateTemplate; // export for testing
