Feature: Publish and browse fares data on BODS
           I want to publish and browse fares data
           So that I can add new data and make changes

        @smoke @DBODS-T131 @test_bods_publish_bus_open_data_fares @e2e_publish_regression3
        Scenario Outline: Publish and browse fares data
            Given I log in with user "<user>"
              And I choose to publish "<data_type>" for operator "<operator_code>"
              And I describe data set with "<description>" and "<short_desc>"
             When I submit the data set using "<source_type>" with URL "<URL>" or via file upload with "<file_name>" from "<folder_path>"
             Then I expect PTI result to be "<pti_result>"
              And I expect DQ result to be "<dq_result>"
              And I get the data set Id into "<data_setid>"
             When I "<publish_action>" publish the data set
             Then data set should be "<publish_outcome>"
              And user should be signed out successfully
             When I navigate to home page via Publish Bus Open Data breadcrumb
              And I log in with user "<user>"
              And I browse for "<data_type>" in operator "<operator_code>" and set the filter for status as "<status>"
             Then I should be able to find "<data_setid>" and validate the details such as name, owner "<owner>", version "<version>" and status "<dataset_status>" successfully
              And I should be able to validate fares compliance as "<compliance>"
              And I should be able to validate fares metadata as fare_zones "<fare_zones>", lines "<lines>", sales_offer_packages "<sop>", fare_products "<fare_products>", user_types "<user_types>"
              And I should be able to "<delete_action>" data set "<data_setid>"
              And user should be signed out successfully
        Examples:
                  | user            | operator_code | data_type | pti_result | dq_result | URL                                                                                                                | file_name                                                                           | folder_path | source_type | description          | short_desc            | data_setid | owner         | status | delete_action         | publish_action | publish_outcome        | version | dataset_status | compliance | fare_zones | lines | sop | fare_products | user_types |
                  | autoadmin_1     |               | Fares     | PASS       |           | https://bodds-xsd-schema-public2.s3.eu-west-2.amazonaws.com/fares_valid_xml.xml                                    |                                                                                     |             | url         | Playwright test desc | Playwright short desc | data_setid | Arriva UK Bus | Active | deactivate and delete | successfully   | successfully published | 1.1     | Published      | Compliant  | 6          | 1     | 1   | 1             | 1          |
                  | autopublisher_7 |               | Fares     | FAIL       |           |                                                                                                                    | ESCL07c64d1b_1598261456974.xml                                                      | fares       | file        | Playwright test desc | Playwright short desc | data_setid |               | Draft  | delete                | unsuccessfully | unpublished            |         |                |            |            |       |     |               |            |
                  | autoagent_1     | Stagecoach    | Fares     | PASS       |           | https://bodds-xsd-schema-public2.s3.eu-west-2.amazonaws.com/fares_valid.zip                                        |                                                                                     |             | url         | Playwright test desc | Playwright short desc | data_setid | Stagecoach    | Active | deactivate and delete | successfully   | successfully published | 1.1     | Published      | Compliant  | 18         | 0     | 16  | 16            | 2          |
                  | autoagent_1     | Stagecoach    | Fares     | FAIL       |           |                                                                                                                    | ESCL07c64d1b_1598261456974.xml                                                      | fares       | file        | Playwright test desc | Playwright short desc | data_setid |               | Draft  | delete                | unsuccessfully | unpublished            |         |                |            |            |       |     |               |            |
                  | autopublisher_7 |               | Fares     | PASS       |           |                                                                                                                    | FX-PI-01_UK_LNUD_LINE-FARE_1_O_Adult-Standard-single_2023-01-12_2024-01-01_1a1e.xml | fares       | file        | Playwright test desc | Playwright short desc | data_setid | KPMG          | Active | deactivate and delete | successfully   | successfully published | 1.1     | Published      | Compliant  | 2          | 1     | 1   | 1             | 1          |
                  | autopublisher_7 |               | Fares     | FAIL       |           |                                                                                                                    | LNUD_2023_01_12_7.zip                                                               | fares       | file        | Playwright test desc | Playwright short desc | data_setid |               | Draft  | delete                | unsuccessfully | unpublished            |         |                |            |            |       |     |               |            |
                  | autopublisher_7 |               | Fares     | PASS       |           | https://bodds-xsd-schema-public2.s3.eu-west-2.amazonaws.com/testdata/Valid%20Fares%20Data/Valid%20Fares%20Data.zip |                                                                                     |             | url         | Playwright test desc | Playwright short desc | data_setid | KPMG          | Active | deactivate and delete | successfully   | successfully published | 1.1     | Published      | Compliant  | 147        | 250   | 40  | 23            | 4          |

# DQ column has been left empty intentionally in this file, The Data Quality (DQ) field does not exist on the Fares data upload (successfully or no) so it has been omitted for that reason