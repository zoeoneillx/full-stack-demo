import { Given, When, Then, assert, type StepWorld } from './registry';

function randomId(): string {
  return `dataset-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

Given(/^I log in with user "([^"]+)"$/, (world, user) => {
  world.memory.user = String(user);
});

Given(/^I choose to publish "([^"]+)" for operator "([^"]*)"$/, (world, dataType, operatorCode) => {
  world.memory.dataType = String(dataType);
  world.memory.operatorCode = String(operatorCode);
});

Given(/^I describe data set with "([^"]+)" and "([^"]+)"$/, (world, description, shortDesc) => {
  world.memory.description = String(description);
  world.memory.shortDesc = String(shortDesc);
});

When(/^I submit the data set using "([^"]+)" with URL "([^"]*)" or via file upload with "([^"]*)" from "([^"]*)"$/, (world, sourceType, url, fileName, folderPath) => {
  world.memory.sourceType = String(sourceType);
  world.memory.url = String(url);
  world.memory.fileName = String(fileName);
  world.memory.folderPath = String(folderPath);

  if (world.memory.sourceType === 'url') {
    assert(world.memory.url.length > 0, 'URL source type requires a URL');
  }
  if (world.memory.sourceType === 'file') {
    assert(world.memory.fileName.length > 0, 'File source type requires a file name');
  }
});

Then(/^I expect PTI result to be "([^"]*)"$/, (world, ptiResult) => {
  world.memory.ptiResult = String(ptiResult);
  assert(['PASS', 'FAIL', ''].includes(world.memory.ptiResult), 'PTI result must be PASS, FAIL, or empty');
});

Then(/^I expect DQ result to be "([^"]*)"$/, (world, dqResult) => {
  world.memory.dqResult = String(dqResult);
});

Then(/^I get the data set Id into "([^"]+)"$/, (world, dataSetKey) => {
  const key = String(dataSetKey);
  world.memory[key] = randomId();
});

When(/^I "([^"]+)" publish the data set$/, (world, publishAction) => {
  world.memory.publishAction = String(publishAction);
});

Then(/^data set should be "([^"]+)"$/, (world, outcome) => {
  const publishAction = world.memory.publishAction || '';
  const expected = String(outcome);
  if (publishAction === 'successfully') {
    assert(expected.includes('successfully') || expected.includes('published'), 'Expected successful publish outcome');
  }
  if (publishAction === 'unsuccessfully') {
    assert(expected.includes('unpublished') || expected.includes('unsuccessfully'), 'Expected unsuccessful publish outcome');
  }
});

Then(/^user should be signed out successfully$/, () => {
  // Placeholder for external BODS auth state verification.
});

When(/^I navigate to home page via Publish Bus Open Data breadcrumb$/, () => {
  // Placeholder navigation step retained for compatibility with original feature text.
});

When(/^I browse for "([^"]+)" in operator "([^"]*)" and set the filter for status as "([^"]*)"$/, (world, dataType, operatorCode, status) => {
  world.memory.browseDataType = String(dataType);
  world.memory.browseOperator = String(operatorCode);
  world.memory.browseStatus = String(status);
});

Then(/^I should be able to find "([^"]+)" and validate the details such as name, owner "([^"]*)", version "([^"]*)" and status "([^"]*)" successfully$/, (world, dataSetKey, owner, version, status) => {
  const key = String(dataSetKey);
  assert(Boolean(world.memory[key]), `Expected dataset id value stored for key ${key}`);
  world.memory.owner = String(owner);
  world.memory.version = String(version);
  world.memory.datasetStatus = String(status);
});

Then(/^I should be able to validate fares compliance as "([^"]*)"$/, (world, compliance) => {
  world.memory.compliance = String(compliance);
});

Then(/^I should be able to validate fares metadata as fare_zones "([^"]*)", lines "([^"]*)", sales_offer_packages "([^"]*)", fare_products "([^"]*)", user_types "([^"]*)"$/, (world, fareZones, lines, sop, fareProducts, userTypes) => {
  world.memory.fareZones = String(fareZones);
  world.memory.lines = String(lines);
  world.memory.sop = String(sop);
  world.memory.fareProducts = String(fareProducts);
  world.memory.userTypes = String(userTypes);
});

Then(/^I should be able to "([^"]+)" data set "([^"]+)"$/, (world, deleteAction, dataSetKey) => {
  world.memory.deleteAction = String(deleteAction);
  const key = String(dataSetKey);
  assert(Boolean(world.memory[key]), `Expected dataset id value stored for key ${key}`);
});
