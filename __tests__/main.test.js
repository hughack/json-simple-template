const fs = require('fs');
const populateTemplate = require('../src/main');

jest.mock('fs', () => ({
  readFileSync: jest.fn(),
  writeFileSync: jest.fn(),
  promises: {}  // add other methods you might need from promises, or mock implementations
}));

describe('JSON Template Populator', () => {
  it('should replace simple placeholders with config values', () => {
    const mockTemplate = `
    {
      "name": $name,
      "height": $height
    }`;
    const mockConfig = `{
      "name": "John",
      "height": 180
    }`;
    const expectedOutput = `{
      "name": "John",
      "height": 180
    }`;

    fs.readFileSync.mockImplementationOnce(() => mockConfig)
                   .mockImplementationOnce(() => mockTemplate);
    fs.writeFileSync.mockImplementation(() => {});

    const configFile = 'path/to/mockConfig.json';
    const templateFile = 'path/to/mockTemplate.txt';
    const outputFile = 'path/to/mockOutput.json';
    
    const result = populateTemplate(configFile, templateFile, outputFile);

    expect(fs.writeFileSync).toHaveBeenCalledWith(outputFile, JSON.stringify(JSON.parse(expectedOutput), null, 2));
    expect(result).toEqual(JSON.parse(expectedOutput));
  });

  it('should replace nested placeholders with config values', () => {
    const mockTemplate = `
    {
      "testNest": $nestedObject
    }`;
    const mockConfig = `{
      "nestedObject": {
        "aString": "John",
        "aNumber": 180,
        "aList": [1,2,3]
      }
    }`;
    const expectedOutput = `{
      "testNest": {
        "aString": "John",
        "aNumber": 180,
        "aList": [1,2,3]
      }
    }`;

    fs.readFileSync.mockImplementationOnce(() => mockConfig)
                   .mockImplementationOnce(() => mockTemplate);
    fs.writeFileSync.mockImplementation(() => {});

    const configFile = 'path/to/mockConfig.json';
    const templateFile = 'path/to/mockTemplate.txt';
    const outputFile = 'path/to/mockOutput.json';
    
    const result = populateTemplate(configFile, templateFile, outputFile);

    expect(fs.writeFileSync).toHaveBeenCalledWith(outputFile, JSON.stringify(JSON.parse(expectedOutput), null, 2));
    expect(result).toEqual(JSON.parse(expectedOutput));
  });

  it('should not replace placeholders that are part of a string', () => {
    const mockTemplate = `
    {
      "name": "$name",
      "height": $height
    }`;
    const mockConfig = `{
      "name": "John",
      "height": 180
    }`;
    const expectedOutput = `{
      "name": "$name",
      "height": 180
    }`;

    fs.readFileSync.mockImplementationOnce(() => mockConfig)
                   .mockImplementationOnce(() => mockTemplate);
    fs.writeFileSync.mockImplementation(() => {});

    const configFile = 'path/to/mockConfig.json';
    const templateFile = 'path/to/mockTemplate.txt';
    const outputFile = 'path/to/mockOutput.json';
    
    const result = populateTemplate(configFile, templateFile, outputFile);

    expect(fs.writeFileSync).toHaveBeenCalledWith(outputFile, JSON.stringify(JSON.parse(expectedOutput), null, 2));
    expect(result).toEqual(JSON.parse(expectedOutput));
  });
});
